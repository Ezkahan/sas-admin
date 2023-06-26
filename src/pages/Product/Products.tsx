import { useQuery } from "@apollo/client";
import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MiniLoader from "../../components/Loader/MiniLoader";
import toast from "react-hot-toast";
import Modal from "../../components/Modal/Modal";
import { IDeleteModal } from "../../common/interfaces/IDeleteModal";
import { RouteNames } from "../../router/routing";
import DeleteNews from "./DeleteProduct";
import Button from "../../components/Button/Button";
import { IProduct } from "./IProduct";
import Paginate from "../../components/Paginate/Paginate";
import { GET_PRODUCTS } from "../../graphql/queries/Product/getProductsQuery";

const Products: React.FC = () => {
  const { t } = useTranslation(["common", "product"]);
  const [page, setPage] = useState<number>(1);

  const [deleteProduct, setDeleteProduct] = useState<IDeleteModal>({
    id: null,
    delete: false,
  });

  const toggleDeleteModal = (id: number) => {
    setDeleteProduct({ delete: !deleteProduct.delete, id });
  };

  const onError = () => toast.error(t("error_not_loaded"), { duration: 2000 });

  const { loading, data } = useQuery(GET_PRODUCTS, {
    variables: { page },
    onError,
  });

  return (
    <AppLayout>
      <>
        <Modal isOpen={deleteProduct.delete} close={toggleDeleteModal}>
          <DeleteNews id={deleteProduct.id} close={toggleDeleteModal} />
        </Modal>
        <main className="section">
          <header className="flex justify-between items-center mb-5">
            <aside className="flex">
              <div className="flex flex-col">
                <h1 className="text-xl font-montserrat-bold text-indigo-800">
                  {t("product:title")}
                </h1>
                <small className="text-indigo-500 flex gap-1">
                  {t("common:total")}:
                  <strong>{data?.products?.paginatorInfo?.total}</strong>
                </small>
              </div>
            </aside>

            <div className="ml-5">
              <Button.Add link="/product/add" />
            </div>
          </header>

          {loading && <MiniLoader />}

          {data?.products?.data && (
            <section className="overflow-x-auto">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-slate-100 text-left text-gray-800">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg rounded-bl-lg">
                      {t("common:id")}
                    </th>
                    <th className="px-4 py-3">{t("common:title")}</th>
                    <th className="px-4 py-3">{t("common:description")}</th>
                    <th className="px-4 py-3 rounded-tr-lg rounded-br-lg">
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
                        <td className="border-r border-stone-100 px-4 py-3 text-xs">
                          {product.id}
                        </td>
                        <td className="border-r border-stone-100 w-96 px-4 py-3">
                          <h1 className="font-bold">
                            {JSON.stringify(product.title)}
                          </h1>
                        </td>

                        <td className="border-r border-stone-100 px-4 py-3">
                          <p>{JSON.stringify(product.description)}</p>
                        </td>

                        <td className="px-4 py-3">
                          <img src={product.image} alt="img" />
                        </td>

                        <td className="px-2 py-3">
                          <div className="flex">
                            <Button.Edit
                              link={`${RouteNames.editProduct}/${product.id}/edit`}
                            ></Button.Edit>

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
