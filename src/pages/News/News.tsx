import { useQuery } from "@apollo/client";
import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MiniLoader from "../../components/Loader/MiniLoader";
import toast from "react-hot-toast";
import Modal from "../../components/Modal/Modal";
import { IDeleteModal } from "../../common/interfaces/IDeleteModal";
import { GET_NEWS } from "../../graphql/queries/News/getNewsQuery";
import DeleteNews from "./DeleteNews";
import Button from "../../components/Button/Button";
import Paginate from "../../components/Paginate/Paginate";
import { INews } from "./INews";

const News: React.FC = () => {
  const { t } = useTranslation(["common", "news"]);
  const [page, setPage] = useState(1);
  const [newsDelete, setNewsDelete] = useState<IDeleteModal>({
    id: null,
    delete: false,
  });

  const { loading, data } = useQuery(GET_NEWS, {
    variables: { page },
    onError: () =>
      toast.error(t("common:error_not_loaded"), { duration: 2000 }),
  });

  const toggleDeleteModal = (id: number | null = null) =>
    setNewsDelete({ delete: !newsDelete.delete, id });

  return (
    <AppLayout>
      <>
        <Modal isOpen={newsDelete.delete} close={toggleDeleteModal}>
          <DeleteNews id={newsDelete.id} close={toggleDeleteModal} />
        </Modal>

        <main className="section">
          <header className="flex justify-between items-center mb-5">
            <aside className="flex">
              <div className="flex flex-col">
                <h1 className="text-xl font-montserrat-bold text-indigo-800">
                  {t("news:title")}
                </h1>
                <small className="text-indigo-500 flex gap-1">
                  {t("common:total")}:
                  <strong>{data?.news?.paginatorInfo?.total}</strong>
                </small>
              </div>
            </aside>

            <div className="ml-5">
              <Button.Add link="/news/add" />
            </div>
          </header>

          {loading && <MiniLoader />}

          {data && data.news.data && (
            <section className="overflow-x-auto">
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
                  {data.news.data.map((news: INews) => {
                    return (
                      <tr
                        key={news.id}
                        className="border-b border-stone-100 text-indigo-900/80"
                      >
                        <td className="border-r border-stone-100 px-4 py-3 text-xs">
                          {news.id}
                        </td>
                        <td className="border-r border-stone-100 w-96 px-4 py-3">
                          <h1 className="font-bold">
                            {JSON.stringify(news.title)}
                          </h1>
                        </td>

                        <td className="border-r border-stone-100 px-4 py-3">
                          <p>{JSON.stringify(news.description)}</p>
                        </td>

                        <td className="px-4 py-3">
                          <img src={news.image} alt="img" />
                        </td>

                        <td className="px-2 py-3">
                          <div className="flex">
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
