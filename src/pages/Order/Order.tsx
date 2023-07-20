import { useTranslation } from "react-i18next";
import AppLayout from "../../layouts/AppLayout";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { useState } from "react";
import Title from "../../components/Title/Title";
import MiniLoader from "../../components/Loader/MiniLoader";
import { IOrderProduct } from "./IOrder";
import Paginate from "../../components/Paginate/Paginate";
import { useParams } from "react-router-dom";
import { GET_ORDER } from "../../graphql/queries/Order/getOrderQuery";
import getByLocale from "../../common/helpers/getByLocale";
import Select from "../../components/Form/Select";
import { ORDER_CHANGE_STATUS } from "../../graphql/mutations/Cart/changeStatusMutation";

const Order: React.FC = () => {
  const { t } = useTranslation(["common", "order", "product"]);
  const { id } = useParams();
  const [page, setPage] = useState<number>(1);

  const onLoadError = () =>
    toast.error(t("common:error_not_loaded"), { duration: 2000 });

  const { loading, data } = useQuery(GET_ORDER, {
    variables: { id },
    onError: onLoadError,
  });

  const statusList = [
    {
      label: t("order:select_status"),
      value: "",
    },
    {
      label: t("order:waiting"),
      value: "WAITING",
    },
    {
      label: t("order:in_progress"),
      value: "IN_PROGRESS",
    },
    {
      label: t("order:in_delivery"),
      value: "IN_DELIVERY",
    },
    {
      label: t("order:delivered"),
      value: "DELIVERED",
    },
    {
      label: t("order:canceled"),
      value: "CANCELED",
    },
  ];

  const onCompleted = () => {
    toast.success(t("common:success_saved"), { duration: 1000 });
  };

  const onError = () =>
    toast.error(t("common:error_not_saved"), { duration: 1000 });

  const [mutate, { error, loading: saving }] = useMutation(
    ORDER_CHANGE_STATUS,
    {
      onCompleted,
      onError,
      refetchQueries: [
        {
          query: GET_ORDER,
          variables: { id },
        },
      ],
    }
  );

  const handleStatus = (e: React.ChangeEvent<any>) => {
    mutate({
      variables: { id, status: e.target.value },
    });
  };

  return (
    <AppLayout>
      <>
        <main className="section">
          <header className="flex justify-between items-start mb-5">
            <Title
              title={`${t("order:order")}: #${data?.order?.id}`}
              subtitle={`${t("order:status")}: ${t(
                `order:${data?.order?.status.toLowerCase()}`
              )}`}
            />

            <div className="w-max">
              <Select
                name="discount_type"
                handleChange={handleStatus}
                options={statusList}
              />
            </div>
          </header>

          <section className="bg-slate-100 rounded-lg p-3 mb-5">
            {t("order:user_phone")}: {data?.order?.user?.phone}
          </section>

          {loading && <MiniLoader />}

          {data?.order?.products && (
            <section className="overflow-x-auto">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-slate-100 text-left text-gray-800">
                  <tr>
                    <th className="px-3 py-2 w-32 rounded-tl-lg rounded-bl-lg">
                      {t("common:image")}
                    </th>
                    <th className="px-3 py-2">{t("common:title")}</th>
                    <th className="px-3 py-2">{t("product:code")}</th>
                    <th className="px-3 py-2">{t("product:quantity")}</th>
                    <th className="px-3 py-2">{t("product:price")}</th>
                    <th className="px-3 py-2">{t("product:discount_price")}</th>
                    <th className="px-3 py-2 rounded-tr-lg rounded-br-lg">
                      {t("common:total")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.order?.products?.map((orderProduct: IOrderProduct) => {
                    return (
                      <tr
                        key={orderProduct.product.id}
                        className="border-b border-stone-100 text-indigo-900/80"
                      >
                        <td className="flex items-center justify-center py-3">
                          <img
                            src={orderProduct.product.image}
                            alt="img"
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </td>

                        <td className="px-4 py-3">
                          <p className="text-slate-400">
                            #{orderProduct.product.id}
                          </p>
                          <p className="font-montserrat-bold">
                            {getByLocale(
                              JSON.parse(orderProduct.product?.title)
                            )}
                          </p>
                        </td>

                        <td className="px-4 py-3">
                          {orderProduct.product.code}
                        </td>

                        <td className="px-4 py-3">{orderProduct.quantity}</td>

                        <td className="px-4 py-3">
                          <p className="text-green-800 border border-green-700 px-2 py-1 w-max rounded-lg">
                            {orderProduct.price} TMT
                          </p>
                        </td>

                        <td className="px-4 py-3">
                          <p className="text-green-600 border border-green-500 px-2 py-1 w-max rounded-lg">
                            {orderProduct.discount_price} TMT
                          </p>
                        </td>

                        <td className="px-4 py-3">
                          <p className="text-green-800 border border-green-700 px-2 py-1 w-max rounded-lg mb-2">
                            {orderProduct.quantity * orderProduct.price} TMT
                          </p>
                          <p className="text-green-600 border border-green-500 px-2 py-1 w-max rounded-lg flex gap-1">
                            {orderProduct.quantity *
                              orderProduct.discount_price}
                            <p>TMT</p>
                          </p>
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

export default Order;
