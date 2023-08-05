import { useMutation, useQuery } from "@apollo/client";
import AppLayout, { userRole } from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MiniLoader from "../../components/Loader/MiniLoader";
import toast from "react-hot-toast";
import { IDeleteModal } from "../../common/interfaces/IDeleteModal";
import { RouteNames } from "../../router/routing";
import { ICoupon } from "./ICoupon";
import { GET_COUPONS } from "../../graphql/queries/Coupon/getCouponsQuery";
import Button from "../../components/Button/Button";
import Paginate from "../../components/Paginate/Paginate";
import Title from "../../components/Title/Title";
import getByLocale from "../../common/helpers/getByLocale";
import DeleteModal from "../../components/Modal/DeleteModal";
import { DELETE_COUPON } from "../../graphql/mutations/Coupon/deleteCouponMutation";
import { IoCheckmarkOutline } from "react-icons/io5";
import HasPermission from "../../components/HasPermission/HasPermission";
import { useAtom } from "jotai";
import { IConfirmModal } from "../../common/interfaces/IConfirmModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { CONFIRM_COUPON } from "../../graphql/mutations/Coupon/confirmCouponMutation";

const Coupons: React.FC = () => {
  const { t } = useTranslation(["common", "coupon"]);
  const [role] = useAtom(userRole);
  const [page, setPage] = useState(1);
  const [couponDelete, setCouponDelete] = useState<IDeleteModal>(
    {} as IDeleteModal
  );
  const [confirmModal, setConfirmModal] = useState<IConfirmModal>(
    {} as IConfirmModal
  );

  const { loading, data } = useQuery(GET_COUPONS, {
    variables: { page },
    onError: () => toast.error(t("error_not_loaded"), { duration: 2000 }),
  });

  const [mutate] = useMutation(DELETE_COUPON, {
    onCompleted: () => {
      toast.success(t("common:success_deleted"), { duration: 2000 });
      toggleDeleteModal();
    },
    onError: () =>
      toast.error(t("common:error_not_deleted"), { duration: 2000 }),
    refetchQueries: [
      {
        query: GET_COUPONS,
        variables: { page: 1 },
      },
    ],
  });

  const [mutateConfirm] = useMutation(CONFIRM_COUPON, {
    onCompleted: () => {
      toast.success(t("coupon:success_confirmed"), { duration: 2000 });
      toggleDeleteModal();
    },
    onError: () =>
      toast.error(t("coupon:error_not_confirmed"), { duration: 2000 }),
    refetchQueries: [
      {
        query: GET_COUPONS,
        variables: { page: 1 },
      },
    ],
  });

  const toggleDeleteModal = (id?: number) => {
    id
      ? setCouponDelete({ delete: !couponDelete.delete, id })
      : setCouponDelete({ delete: false });
  };

  const toggleConfirmModal = (id?: number) => {
    setConfirmModal({ confirm: !confirmModal.confirm, id });
  };

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    couponDelete?.id && mutate({ variables: { id: couponDelete?.id } });
    toggleDeleteModal();
  };

  const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    confirmModal?.id && mutateConfirm({ variables: { id: confirmModal?.id } });
    toggleConfirmModal();
  };

  return (
    <AppLayout>
      <>
        <DeleteModal
          isOpen={couponDelete.delete}
          handleDelete={handleDelete}
          toggle={toggleDeleteModal}
        />

        <ConfirmModal
          isOpen={confirmModal.confirm}
          handleConfirm={handleConfirm}
          toggle={toggleConfirmModal}
        />

        <main className="section">
          <header className="flex justify-between items-center mb-5">
            <Title
              title={t("coupon:title")}
              subtitle={`${t("common:total")}: ${
                data?.coupons?.paginatorInfo?.total
              }`}
            />
            <Button.Add link="/coupon/add" />
          </header>

          {loading && <MiniLoader />}

          <section className="overflow-x-auto hide-scroll">
            {/* <p>{JSON.stringify(couponDelete)}</p> */}

            <table className="w-full table-fixed text-sm">
              <thead className="bg-slate-100 text-left text-gray-800">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg rounded-bl-lg">
                    {t("common:id")}
                  </th>
                  <th className="px-4 py-3">{t("coupon:title")}</th>
                  <th className="px-4 py-3">{t("coupon:discount")}</th>
                  <th className="px-4 py-3">{t("coupon:discount_type")}</th>
                  <th className="px-4 py-3">{t("coupon:confirmed")}</th>
                  <th className="px-4 py-3">{t("coupon:type")}</th>
                  <th className="px-4 py-3">{t("coupon:expires_at")}</th>
                  <th className="px-4 py-3 rounded-tr-lg rounded-br-lg">
                    {t("common:options")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.coupons?.data?.map((coupon: ICoupon) => {
                  return (
                    <tr
                      key={coupon.id}
                      className="border-b border-stone-100 text-indigo-900/80"
                    >
                      <td className="border-r border-stone-100 px-4 py-3 text-xs">
                        {coupon.id}
                      </td>

                      <td className="border-r border-stone-100 w-96 px-4 py-3">
                        <h1 className="font-bold">
                          {getByLocale(JSON.parse(coupon.title))}
                        </h1>
                      </td>

                      <td className="border-r border-stone-100 px-4 py-3">
                        <p>{coupon.discount}</p>
                      </td>

                      <td className="px-4 py-3">
                        <p>{coupon.discount_type}</p>
                      </td>

                      <td className="px-4 py-3">
                        <div>
                          {coupon.confirmed ? (
                            <p className="text-green-500">
                              {t("coupon:confirmed")}
                            </p>
                          ) : (
                            <p className="text-red-500">
                              {t("coupon:not_confirmed")}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <p>{coupon.type}</p>
                      </td>

                      <td className="px-4 py-3">
                        <p>{coupon.expires_at}</p>
                      </td>

                      <td className="px-2 py-3">
                        <div className="flex">
                          <HasPermission role={role} accessRole="BOSS">
                            <button
                              type="button"
                              onClick={() => toggleConfirmModal(coupon.id)}
                              className="btn__confirm"
                            >
                              <IoCheckmarkOutline size={24} />
                            </button>
                          </HasPermission>

                          <Button.Edit
                            link={`${RouteNames.coupon}/${coupon.id}/edit`}
                          />

                          <Button.Delete
                            onClick={() => toggleDeleteModal(coupon.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </main>

        {data?.coupons?.paginatorInfo?.lastPage > 1 && (
          <Paginate
            currentPage={page.toString()}
            lastPage={data?.coupons?.paginatorInfo?.lastPage}
            setPage={setPage}
          />
        )}
      </>
    </AppLayout>
  );
};

export default Coupons;
