import { useMutation, useQuery } from "@apollo/client";
import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MiniLoader from "../../components/Loader/MiniLoader";
import toast from "react-hot-toast";
import { IDeleteModal } from "../../common/interfaces/IDeleteModal";
import { ICategory } from "./ICategory";
import { RouteNames } from "../../router/routing";
import { GET_CATEGORY_LIST } from "../../graphql/queries/Categories/getCategoriesQuery";
import Paginate from "../../components/Paginate/Paginate";
import Button from "../../components/Button/Button";
import getByLocale from "../../common/helpers/getByLocale";
import { DELETE_CATEGORY } from "../../graphql/mutations/Category/deleteCategoryMutation";
import DeleteModal from "../../components/Modal/DeleteModal";

const Categories: React.FC = () => {
  const { t } = useTranslation(["common", "category"]);
  const [page, setPage] = useState<number>(1);
  const [categoryDelete, setCategoryDelete] = useState<IDeleteModal>(
    {} as IDeleteModal
  );

  const toggleDeleteModal = (id?: number) =>
    setCategoryDelete({ delete: !categoryDelete.delete, id });

  const { loading, data } = useQuery(GET_CATEGORY_LIST, {
    variables: { page },
    onError: () => toast.error(t("error_not_loaded"), { duration: 2000 }),
  });

  const [mutate] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => {
      toast.success(t("common:success_deleted"), { duration: 2000 });
      toggleDeleteModal();
    },
    onError: () =>
      toast.error(t("common:error_not_deleted"), { duration: 2000 }),
    refetchQueries: [
      {
        query: GET_CATEGORY_LIST,
        variables: { page: 1 },
      },
    ],
  });

  const handleDelete = (
    e: React.FormEvent<HTMLFormElement>,
    id: number = categoryDelete.id as number
  ) => {
    e.preventDefault();
    mutate({ variables: { id } });
  };
  return (
    <AppLayout>
      <>
        <DeleteModal
          isOpen={categoryDelete.delete}
          handleDelete={handleDelete}
          toggle={toggleDeleteModal}
        />

        <main className="section">
          <header className="flex justify-between items-center mb-5">
            <aside className="flex">
              <div className="flex flex-col">
                <h1 className="text-xl font-montserrat-bold text-indigo-800">
                  {t("category:title")}
                </h1>
                <small className="text-indigo-500 flex gap-1">
                  {t("common:total")}:
                  <strong>{data?.categories?.paginatorInfo?.total}</strong>
                </small>
              </div>
            </aside>

            <div className="ml-5">
              <Button.Add link="/category/add" />
            </div>
          </header>

          {loading && <MiniLoader />}

          {data?.categories?.data && (
            <section className="overflow-x-auto hide-scroll">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-slate-100 text-left text-gray-800">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg rounded-bl-lg">
                      {t("common:id")}
                    </th>
                    <th className="px-4 py-3">{t("common:name")}</th>
                    <th className="px-4 py-3">{t("common:image")}</th>
                    <th className="px-4 py-3">{t("common:icon")}</th>
                    <th className="px-4 py-3 text-center">
                      {t("category:visited_count")}
                    </th>
                    <th className="px-4 py-3 rounded-tr-lg rounded-br-lg">
                      {t("common:options")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.categories.data.map((category: ICategory) => {
                    return (
                      <tr
                        key={category.id}
                        className="border-b border-stone-100 text-indigo-900/80"
                      >
                        <td className="border-r border-stone-100 px-4 py-3 text-xs">
                          {category.id}
                        </td>

                        <td className="border-r border-stone-100 px-4 py-3">
                          <h1 className="font-bold">
                            {getByLocale(JSON.parse(category?.name))}
                          </h1>
                        </td>

                        <td className="px-4 py-3">
                          <img
                            src={category.image_url}
                            alt="img"
                            className="w-12"
                          />
                        </td>

                        <td className="px-4 py-3">
                          <img
                            src={category.icon_url}
                            alt="img"
                            className="w-12"
                          />
                        </td>

                        <td className="px-4 py-3 text-center">
                          {category.visited_count}
                        </td>

                        <td className="px-2 py-3">
                          <div className="flex">
                            <Button.Edit
                              link={`${RouteNames.category}/${category.id}/edit`}
                            />

                            <Button.Delete
                              onClick={() => toggleDeleteModal(category.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          )}
        </main>

        {data?.categories?.paginatorInfo?.lastPage > 1 && (
          <Paginate
            currentPage={page.toString()}
            lastPage={data?.categories?.paginatorInfo?.lastPage}
            setPage={setPage}
          />
        )}
      </>
    </AppLayout>
  );
};

export default Categories;
