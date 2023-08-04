import { useMutation, useQuery } from "@apollo/client";
import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MiniLoader from "../../components/Loader/MiniLoader";
import toast from "react-hot-toast";
import { IDeleteModal } from "../../common/interfaces/IDeleteModal";
import Button from "../../components/Button/Button";
import Paginate from "../../components/Paginate/Paginate";
import Title from "../../components/Title/Title";
import DeleteModal from "../../components/Modal/DeleteModal";
import getByLocale from "../../common/helpers/getByLocale";
import { RouteNames } from "../../router/routing";
import { GET_PAGES } from "../../graphql/queries/Page/getPagesQuery";
import { DELETE_PAGE } from "../../graphql/mutations/Page/deletePageMutation";
import { IPage } from "./IPage";

const Pages: React.FC = () => {
  const { t } = useTranslation(["common", "page"]);
  const [page, setPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<IDeleteModal>(
    {} as IDeleteModal
  );

  const { loading, data } = useQuery(GET_PAGES, {
    variables: { page },
    onError: () =>
      toast.error(t("common:error_not_loaded"), { duration: 2000 }),
  });

  const onCompleted = () => {
    toast.success(t("common:success_deleted"), { duration: 1500 }) &&
      setTimeout(() => toggleDeleteModal, 2000);
  };

  const onError = () =>
    toast.error(t("common:error_not_deleted"), { duration: 2000 });

  const toggleDeleteModal = (id?: number) =>
    setDeleteModal({ delete: !deleteModal.delete, id });

  const [mutate] = useMutation(DELETE_PAGE, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_PAGES,
        variables: { page },
      },
    ],
  });

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteModal?.id && mutate({ variables: { id: deleteModal?.id } });
    toggleDeleteModal();
  };

  return (
    <AppLayout>
      <>
        <DeleteModal
          isOpen={deleteModal.delete}
          handleDelete={handleDelete}
          toggle={toggleDeleteModal}
        />

        <main className="section">
          <header className="flex justify-between items-center mb-5">
            <Title
              title={t("page:title")}
              subtitle={`${t("common:total")}: ${
                data?.pages?.paginatorInfo?.total ?? 0
              }`}
            />
            <Button.Add link="/pages/add" />
          </header>

          {loading && <MiniLoader />}

          {data?.pages?.data && (
            <section className="overflow-x-auto hide-scroll">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-slate-100 text-left text-gray-800">
                  <tr>
                    <th className="px-4 py-3 w-20 rounded-tl-lg rounded-bl-lg">
                      {t("common:id")}
                    </th>
                    <th className="px-4 py-3 w-96">{t("common:title")}</th>
                    <th className="px-4 py-3 w-52">
                      {t("common:description")}
                    </th>
                    <th className="px-4 py-3 rounded-tr-lg rounded-br-lg w-36">
                      {t("common:options")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.pages?.data?.map((page: IPage) => {
                    return (
                      <tr
                        key={page.id}
                        className="border-b border-stone-100 text-indigo-900/80"
                      >
                        <td className="border-r border-stone-100 px-4 py-3 text-xs">
                          {page.id}
                        </td>
                        <td className="border-r border-stone-100 w-96 px-4 py-3">
                          <h1 className="font-bold">
                            {getByLocale(JSON.parse(page.title))}
                          </h1>
                        </td>

                        <td className="border-r border-stone-100 px-4 py-3">
                          <p>{getByLocale(JSON.parse(page.text))}</p>
                        </td>

                        <td className="px-2 py-3">
                          <div className="flex">
                            <Button.Edit
                              link={`${RouteNames.pages}/${page.id}/edit`}
                            />

                            <Button.Delete
                              onClick={() => toggleDeleteModal(page.id)}
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

        {data?.news?.paginatorInfo?.lastPage > 1 && (
          <Paginate
            currentPage={page.toString()}
            lastPage={data?.pages?.paginatorInfo?.lastPage}
            setPage={setPage}
          />
        )}
      </>
    </AppLayout>
  );
};

export default Pages;
