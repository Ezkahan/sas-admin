import { useMutation, useQuery } from "@apollo/client";
import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MiniLoader from "../../components/Loader/MiniLoader";
import toast from "react-hot-toast";
import { IDeleteModal } from "../../common/interfaces/IDeleteModal";
import { RouteNames } from "../../router/routing";
import { GET_BRANDS } from "../../graphql/queries/Brand/getBrandsQuery";
import Button from "../../components/Button/Button";
import Paginate from "../../components/Paginate/Paginate";
import { IBrand } from "./IBrand";
import DeleteModal from "../../components/Modal/DeleteModal";
import { DELETE_BRAND } from "../../graphql/mutations/Brand/deleteBrandMutation";
import Title from "../../components/Title/Title";

const Brands: React.FC = () => {
  const { t } = useTranslation(["common", "brand"]);
  const [page, setPage] = useState(1);
  const [brandDelete, setBrandDelete] = useState<IDeleteModal>(
    {} as IDeleteModal
  );

  const toggleDeleteModal = (id?: number) =>
    setBrandDelete({ delete: !brandDelete.delete, id });

  const { loading, data } = useQuery(GET_BRANDS, {
    variables: { page },
    onError: () => toast.error(t("error_not_loaded"), { duration: 2000 }),
  });

  const [mutate] = useMutation(DELETE_BRAND, {
    onCompleted: () => {
      toast.success(t("common:success_deleted"), { duration: 2000 });
      toggleDeleteModal();
    },
    onError: () =>
      toast.error(t("common:error_not_deleted"), { duration: 2000 }),
    refetchQueries: [
      {
        query: GET_BRANDS,
        variables: { page: 1 },
      },
    ],
  });

  const handleDelete = (
    e: React.FormEvent<HTMLFormElement>,
    id: number = brandDelete.id as number
  ) => {
    e.preventDefault();
    mutate({ variables: { id } });
  };

  return (
    <AppLayout>
      <>
        <DeleteModal
          isOpen={brandDelete.delete}
          handleDelete={handleDelete}
          toggle={toggleDeleteModal}
        />

        <main className="section">
          <header className="flex justify-between items-center mb-5">
            <Title
              title={t("brand:title")}
              subtitle={`${t("common:total")}: ${
                data?.brands?.paginatorInfo?.total
              }`}
            />
            <Button.Add link="/brand/add" />
          </header>

          {loading && <MiniLoader />}

          {data?.brands?.data && (
            <section className="overflow-x-auto hide-scroll">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-slate-100 text-left text-gray-800">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg rounded-bl-lg">
                      {t("common:id")}
                    </th>
                    <th className="px-4 py-3">{t("common:name")}</th>
                    <th className="px-4 py-3">{t("common:category")}</th>
                    <th className="px-4 py-3">{t("common:logo")}</th>
                    <th className="px-4 py-3 rounded-tr-lg rounded-br-lg">
                      {t("common:options")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.brands?.data.map((brand: IBrand) => {
                    return (
                      <tr
                        key={brand.id}
                        className="border-b border-stone-100 text-indigo-900/80"
                      >
                        <td className="border-r border-stone-100 px-4 py-3 text-xs">
                          {brand.id}
                        </td>
                        <td className="border-r border-stone-100 w-96 px-4 py-3">
                          <h1 className="font-bold">{brand.name}</h1>
                        </td>

                        <td className="border-r border-stone-100 px-4 py-3">
                          <p>{brand.category_id}</p>
                        </td>

                        <td className="p-2">
                          <img
                            className="w-10"
                            src={brand?.logo_url}
                            alt="img"
                          />
                        </td>

                        <td className="px-2 py-3">
                          <div className="flex">
                            <Button.Edit
                              link={`${RouteNames.brand}/${brand.id}/edit`}
                            />

                            <Button.Delete
                              onClick={() => toggleDeleteModal(brand.id)}
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

        {data?.brands?.paginatorInfo?.lastPage > 1 && (
          <Paginate
            currentPage={page.toString()}
            lastPage={data?.brands?.paginatorInfo?.lastPage}
            setPage={setPage}
          />
        )}
      </>
    </AppLayout>
  );
};

export default Brands;
