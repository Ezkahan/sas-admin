import { useQuery } from "@apollo/client";
import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MiniLoader from "../../components/Loader/MiniLoader";
import toast from "react-hot-toast";
import Modal from "../../components/Modal/Modal";
import { IDeleteModal } from "../../common/interfaces/IDeleteModal";
import DeleteBanner from "./DeleteBanner";
import { GET_BANNERS } from "../../graphql/queries/Banner/getBannersQuery";
import Button from "../../components/Button/Button";
import Paginate from "../../components/Paginate/Paginate";
import { IBannerList } from "./IBanner";

const Banners: React.FC = () => {
  const { t } = useTranslation(["common", "banner"]);
  const [page, setPage] = useState<number>(1);
  const [bannerDelete, setBannerDelete] = useState<IDeleteModal>({
    id: null,
    delete: false,
  });

  const { loading, data } = useQuery(GET_BANNERS, {
    variables: { page },
    onError: () => toast.error(t("error_not_loaded"), { duration: 2000 }),
  });

  const toggleDeleteModal = (id: number | null = null) => {
    setBannerDelete({ delete: !bannerDelete.delete, id });
  };

  return (
    <AppLayout>
      <>
        <Modal isOpen={bannerDelete.delete} close={toggleDeleteModal}>
          <DeleteBanner id={bannerDelete.id} close={toggleDeleteModal} />
        </Modal>

        <main className="section">
          <header className="flex justify-between items-center mb-5">
            <aside className="flex">
              <div className="flex flex-col">
                <h1 className="text-xl font-montserrat-bold text-indigo-800">
                  {t("banner:title")}
                </h1>
                <small className="text-indigo-500 flex gap-1">
                  {t("common:total")}:
                  <strong>{data?.banners?.paginatorInfo?.total}</strong>
                </small>
              </div>
            </aside>

            <div className="ml-5">
              <Button.Add link="/banner/add" />
            </div>
          </header>

          {loading && <MiniLoader />}

          {data?.banners?.data && (
            <section className="overflow-x-auto hide-scroll">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-slate-100 text-left text-gray-800">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg rounded-bl-lg">
                      {t("common:id")}
                    </th>
                    <th className="px-4 py-3">{t("banner:link")}</th>
                    <th className="px-4 py-3">{t("banner:position")}</th>
                    <th className="px-4 py-3">{t("banner:image")}</th>
                    <th className="px-4 py-3 rounded-tr-lg rounded-br-lg">
                      {t("common:options")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.banners.data.map((banner: IBannerList) => {
                    return (
                      <tr
                        key={banner.id}
                        className="border-b border-stone-100 text-indigo-900/80"
                      >
                        <td className="border-r border-stone-100 px-4 py-3 text-xs">
                          {banner.id}
                        </td>
                        <td className="border-r border-stone-100 w-96 px-4 py-3">
                          <h1 className="font-bold">{banner.link}</h1>
                        </td>

                        <td className="border-r border-stone-100 px-4 py-3">
                          <p>{banner.position}</p>
                        </td>

                        <td className="px-4 py-3">
                          <img src={banner.image} alt="img" className="w-20" />
                        </td>

                        <td className="px-2 py-3">
                          <Button.Delete
                            onClick={() => toggleDeleteModal(banner.id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          )}
        </main>

        {data?.banners?.paginatorInfo?.lastPage > 1 && (
          <Paginate
            currentPage={page.toString()}
            lastPage={data?.banners?.paginatorInfo?.lastPage}
            setPage={setPage}
          />
        )}
      </>
    </AppLayout>
  );
};

export default Banners;
