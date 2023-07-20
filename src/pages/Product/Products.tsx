import { useMutation, useQuery } from "@apollo/client";
import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MiniLoader from "../../components/Loader/MiniLoader";
import toast from "react-hot-toast";
import { IDeleteModal } from "../../common/interfaces/IDeleteModal";
import { RouteNames } from "../../router/routing";
import Button from "../../components/Button/Button";
import { IProduct } from "./IProduct";
import Paginate from "../../components/Paginate/Paginate";
import { GET_PRODUCTS } from "../../graphql/queries/Product/getProductsQuery";
import getByLocale from "../../common/helpers/getByLocale";
import DeleteModal from "../../components/Modal/DeleteModal";
import { DELETE_PRODUCT } from "../../graphql/mutations/Product/deleteProductMutation";
import Title from "../../components/Title/Title";

const Products: React.FC = () => {
  const { t } = useTranslation(["common", "product"]);
  const [page, setPage] = useState<number>(1);
  const [deleteProduct, setDeleteProduct] = useState<IDeleteModal>(
    {} as IDeleteModal
  );

  const toggleDeleteModal = (id: number) =>
    setDeleteProduct({ delete: !deleteProduct.delete, id });

  const onError = () =>
    toast.error(t("common:error_not_loaded"), { duration: 2000 });

  const { loading, data } = useQuery(GET_PRODUCTS, {
    variables: { page },
    onError,
  });

  const onCompleted = () => {
    toast.success(t("common:success_deleted"), { duration: 1500 }) &&
      setTimeout(() => toggleDeleteModal, 2000);
  };

  const [mutate] = useMutation(DELETE_PRODUCT, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_PRODUCTS,
        variables: { page: 1 },
      },
    ],
  });

  const handleDelete = (
    e: React.FormEvent<HTMLFormElement>,
    id: number = deleteProduct.id as number
  ) => {
    e.preventDefault();
    mutate({ variables: { id } });
  };

  return (
    <AppLayout>
      <>
        <DeleteModal
          isOpen={deleteProduct.delete}
          handleDelete={handleDelete}
          toggle={toggleDeleteModal}
        />

        <main className="section">
          <header className="flex justify-between items-center mb-5">
            <Title
              title={t("product:title")}
              subtitle={`${t("common:total")}: ${
                data?.products?.paginatorInfo?.total
              }`}
            />
            <Button.Add link="/product/add" />
          </header>

          {loading && <MiniLoader />}

          {data?.products?.data && (
            <section className="overflow-x-auto">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-slate-100 text-left text-gray-800">
                  <tr>
                    <th className="px-3 py-2 w-32 rounded-tl-lg rounded-bl-lg">
                      {t("common:image")}
                    </th>
                    <th className="px-3 py-2">{t("common:title")}</th>
                    <th className="px-3 py-2">{t("product:code")}</th>
                    <th className="px-3 py-2">{t("product:price")}</th>
                    <th className="px-3 py-2">{t("product:discount_price")}</th>
                    <th className="px-3 py-2 rounded-tr-lg rounded-br-lg">
                      {t("common:options")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products?.data?.map((product: IProduct) => {
                    return (
                      <tr
                        key={product.id}
                        className="border-b border-stone-100 text-indigo-900/80"
                      >
                        <td className="px-4 py-3">
                          <img
                            src={product.image}
                            alt="img"
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </td>

                        <td className="px-4 py-3">
                          <p className="text-slate-400">#{product.id}</p>
                          <p className="font-montserrat-bold">
                            {getByLocale(JSON.parse(product?.title))}
                          </p>
                        </td>

                        <td className="px-4 py-3">{product.code}</td>

                        <td className="px-4 py-3">
                          <p className="text-green-600 border border-green-500 px-2 py-1 w-max rounded-lg">
                            {product.price} TMT
                          </p>
                        </td>

                        <td className="px-4 py-3">
                          <p className="text-green-600 border border-green-500 px-2 py-1 w-max rounded-lg">
                            {product.discount_price} TMT
                          </p>
                        </td>

                        <td className="px-2 py-3">
                          <div className="flex">
                            <Button.Edit
                              link={`${RouteNames.products}/${product.id}/edit`}
                            />

                            <Button.Delete
                              onClick={() => toggleDeleteModal(product.id)}
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

        {data?.products?.paginatorInfo?.lastPage > 1 && (
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

export default Products;
