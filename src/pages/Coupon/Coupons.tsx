import { useQuery } from "@apollo/client";
import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import MiniLoader from "../../components/Loader/MiniLoader";
import { NavLink } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import Modal from "../../components/Modal/Modal";
import { IDeleteModal } from "../../common/interfaces/IDeleteModal";
import { RouteNames } from "../../router/routing";
import { INavRoute } from "../../router/routing";
import PageHeader from "../../components/pageHeader";
import { ICouponList } from "../../common/interfaces/Coupon/ICouponList";
import { GET_COUPONS } from "../../graphql/queries/Coupon/getCouponsQuery";
import DeleteCoupon from "./DeleteCoupon";
import { jsonParseToLangs } from "../../common/helpers/jsonParseToLangs";
import Button from "../../components/Button/Button";

interface IProps {
  nav?: INavRoute;
}

const Coupons: React.FC<IProps> = ({ nav }: IProps) => {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [couponDelete, setCouponDelete] = useState<IDeleteModal>({
    id: null,
    delete: false,
  });

  const { loading, data } = useQuery(GET_COUPONS, {
    variables: { page },
    onError: () => toast.error(t("error_not_loaded"), { duration: 2000 }),
  });

  const toggleDeleteModal = (id: number | null = null) => {
    setCouponDelete({ delete: !couponDelete.delete, id });
  };

  return (
    <AppLayout>
      <>
        <Modal isOpen={couponDelete.delete} close={toggleDeleteModal}>
          <DeleteCoupon id={couponDelete.id} close={toggleDeleteModal} />
        </Modal>

        <main className="bg-white px-5 py-3 rounded-lg">
          <PageHeader
            addPath={RouteNames.couponCreate}
            nav={nav}
            total={data?.coupons?.paginatorInfo?.total}
          />

          {loading && <MiniLoader />}

          {data && data.coupons.data && (
            <section className="overflow-x-auto hide-scroll">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-slate-100 text-left text-gray-800">
                  <tr>
                    <th className="px-4 py-3 w-20 rounded-tl-lg rounded-bl-lg">
                      {t("id")}
                    </th>
                    <th className="px-4 py-3 w-96">{"Title"}</th>
                    <th className="px-4 py-3 w-52">{"Promo price"}</th>
                    <th className="px-4 py-3 w-52">{"Started at"}</th>
                    <th className="px-4 py-3 w-52">{"Ended at"}</th>
                    <th className="px-4 py-3 rounded-tr-lg rounded-br-lg w-36">
                      {t("options")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.coupons.data.map(
                    (coupon: ICouponList, index: number) => {
                      return (
                        <tr
                          key={index}
                          className="border-b border-stone-100 text-indigo-900/80"
                        >
                          <td className="border-r border-stone-100 px-4 py-3 text-xs">
                            {coupon.id}
                          </td>
                          <td className="border-r border-stone-100 w-96 px-4 py-3">
                            <h1 className="font-bold">
                              {jsonParseToLangs(coupon.title).tm}
                            </h1>
                          </td>

                          <td className="border-r border-stone-100 px-4 py-3">
                            <p>{coupon.promo_price}</p>
                          </td>

                          <td className="px-4 py-3">
                            <p>{coupon.started_at}</p>
                          </td>
                          <td className="px-4 py-3">
                            <p>{coupon.ended_at}</p>
                          </td>

                          <td className="px-2 py-3">
                            <div className="flex">
                              <NavLink
                                to={`${RouteNames.coupon}/${coupon.id}`}
                                className="border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white duration-300 w-8 h-8 mx-1 flex items-center justify-center rounded-full"
                              >
                                <IoEyeOutline size={18} />
                              </NavLink>

                              <Button.Delete
                                onClick={() => toggleDeleteModal(coupon.id)}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </section>
          )}
        </main>

        <ReactPaginate
          previousClassName={"hidden"}
          nextClassName={"hidden"}
          breakLabel={"..."}
          breakClassName={
            "bg-white border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm"
          }
          pageCount={data && data.coupons.paginatorInfo.lastPage}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={(data) => setPage(data.selected + 1)}
          pageClassName={
            "bg-white page-link rounded-lg border-gray-300 text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 border text-sm"
          }
          containerClassName={
            "relative z-0 inline-flex justify-center rounded-md mb-16 w-full"
          }
          activeClassName={"bg-gray-200"}
        />
      </>
    </AppLayout>
  );
};

export default Coupons;
