import { useTranslation } from "react-i18next";
import AppLayout from "../../layouts/AppLayout";
import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { useState } from "react";
import Title from "../../components/Title/Title";
import MiniLoader from "../../components/Loader/MiniLoader";
import { IOrder } from "./IOrder";
import Paginate from "../../components/Paginate/Paginate";
import { GET_ORDERS } from "../../graphql/queries/Order/getOrdersQuery";
import { NavLink } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";

const Orders: React.FC = () => {
  const { t } = useTranslation(["common", "order"]);
  const [page, setPage] = useState<number>(1);

  const onError = () =>
    toast.error(t("common:error_not_loaded"), { duration: 2000 });

  const { loading, data } = useQuery(GET_ORDERS, {
    variables: { page },
    onError,
  });

  return (
    <AppLayout>
      <>
        <main className="section">
          <header className="flex justify-between items-center mb-5">
            <Title
              title={t("order:title")}
              subtitle={`${t("common:total")}: ${
                data?.orders?.paginatorInfo?.total ?? 0
              }`}
            />
          </header>

          {loading && <MiniLoader />}

          {data?.orders?.data && (
            <section className="overflow-x-auto">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-slate-100 text-left text-gray-800">
                  <tr>
                    <th className="px-3 py-2 w-16 rounded-tl-lg rounded-bl-lg">
                      {t("common:id")}
                    </th>
                    <th className="px-3 py-2">{t("order:user_phone")}</th>
                    <th className="px-3 py-2">{t("order:pay_type")}</th>
                    <th className="px-3 py-2">{t("order:delivery_type")}</th>
                    <th className="px-3 py-2">{t("order:status")}</th>
                    <th className="px-3 py-2">{t("order:products_count")}</th>
                    <th className="px-3 py-2 rounded-tr-lg rounded-br-lg">
                      {t("common:options")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.orders?.data?.map((order: IOrder) => {
                    return (
                      <tr
                        key={order.id}
                        className="border-b border-stone-100 text-indigo-900/80"
                      >
                        <td className="px-4 py-3">{order.id}</td>

                        <td className="px-4 py-3">{order.user.phone}</td>

                        <td className="px-4 py-3">
                          {order.pay_type ?? t("common:unknown")}
                        </td>

                        <td className="px-4 py-3">
                          {order.delivery_type ?? t("common:unknown")}
                        </td>

                        <td className="px-4 py-3">
                          {order.status ?? (
                            <p className="text-slate-500 animate-pulse">
                              {t("order:user_progress")}
                            </p>
                          )}
                        </td>

                        <td className="px-4 py-3">{order.products_count}</td>

                        <td className="px-2 py-3">
                          <NavLink to={`/orders/${order.id}`}>
                            <IoEyeOutline size={22} className="text-blue-500" />
                          </NavLink>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          )}
        </main>

        {data?.orders?.paginatorInfo?.lastPage > 1 && (
          <Paginate
            currentPage={page.toString()}
            lastPage={data?.products?.paginatorInfo?.lastPage}
            setPage={setPage}
          />
        )}
      </>
    </AppLayout>
  );
};

export default Orders;
