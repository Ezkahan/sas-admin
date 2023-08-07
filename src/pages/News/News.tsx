import { useMutation, useQuery } from "@apollo/client";
import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MiniLoader from "../../components/Loader/MiniLoader";
import toast from "react-hot-toast";
import { IDeleteModal } from "../../common/interfaces/IDeleteModal";
import { GET_NEWS } from "../../graphql/queries/News/getNewsQuery";
import Button from "../../components/Button/Button";
import Paginate from "../../components/Paginate/Paginate";
import { INews } from "./INews";
import Title from "../../components/Title/Title";
import getByLocale from "../../common/helpers/getByLocale";
import { RouteNames } from "../../router/routing";
import DeleteModal from "../../components/Modal/DeleteModal";
import { DELETE_NEWS } from "../../graphql/mutations/News/deleteNewsMutation";

const News: React.FC = () => {
  const { t } = useTranslation(["common", "news"]);
  const [page, setPage] = useState(1);
  const [newsDelete, setNewsDelete] = useState<IDeleteModal>(
    {} as IDeleteModal
  );

  const { loading, data } = useQuery(GET_NEWS, {
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

  const [mutate] = useMutation(DELETE_NEWS, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_NEWS,
        variables: { page: 1 },
      },
    ],
  });

  const toggleDeleteModal = (id?: number) =>
    setNewsDelete({ delete: !newsDelete.delete, id });

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newsDelete?.id && mutate({ variables: { id: newsDelete?.id } });
    toggleDeleteModal();
  };

  return (
    <AppLayout>
      <>
        <DeleteModal
          isOpen={newsDelete.delete}
          handleDelete={handleDelete}
          toggle={toggleDeleteModal}
        />

        <main className="section">
          <header className="flex justify-between items-center mb-5">
            <Title
              title={t("news:title")}
              subtitle={`${t("common:total")}: ${
                data?.news?.paginatorInfo?.total ?? 0
              }`}
            />
            <Button.Add link="/news/add" />
          </header>

          {loading && <MiniLoader />}

          {data?.news?.data && (
            <section className="overflow-x-auto hide-scroll">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-slate-100 text-left text-gray-800">
                  <tr>
                    <th className="px-4 py-3 w-20 rounded-tl-lg rounded-bl-lg">
                      {t("common:id")}
                    </th>
                    <th className="px-4 py-3 w-28">{t("common:image")}</th>
                    <th className="px-4 py-3">{t("common:title")}</th>
                    <th className="px-4 py-3 w-52">
                      {t("common:description")}
                    </th>
                    <th className="px-4 py-3 rounded-tr-lg rounded-br-lg w-36">
                      {t("common:options")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.news.data.map((news: INews) => {
                    return (
                      <tr
                        key={news.id}
                        className="border-b border-stone-100 text-indigo-900/80"
                      >
                        <td className="border-r border-stone-100 px-4 py-3 text-xs">
                          {news.id}
                        </td>

                        <td className="px-4 py-3">
                          <img
                            src={news.image_url}
                            alt="img"
                            className="w-20 rounded-lg"
                          />
                        </td>

                        <td className="border-r border-stone-100 px-4 py-3">
                          <h1 className="font-bold">
                            {getByLocale(JSON.parse(news?.title))}
                          </h1>
                        </td>

                        <td className="border-r border-stone-100 px-4 py-3">
                          <p className="truncate">{getByLocale(JSON.parse(news?.description))}</p>
                        </td>

                        <td className="px-2 py-3">
                          <div className="flex">
                            <Button.Edit
                              link={`${RouteNames.news}/${news.id}/edit`}
                            />

                            <Button.Delete
                              onClick={() => toggleDeleteModal(news.id)}
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
            lastPage={data?.news?.paginatorInfo?.lastPage}
            setPage={setPage}
          />
        )}
      </>
    </AppLayout>
  );
};

export default News;
