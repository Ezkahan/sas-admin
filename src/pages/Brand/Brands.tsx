import { useQuery } from "@apollo/client";
import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MiniLoader from "../../components/Loader/MiniLoader";
import { NavLink } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import Modal from "../../components/Modal/Modal";
import { IDeleteModal } from "../../common/interfaces/IDeleteModal";
import { IBrandList } from "../../common/interfaces/Brand/IBrandList";
import { RouteNames } from "../../router/routing";
import { GET_BRANDS } from "../../graphql/queries/Brand/getBrandsQuery";
import DeleteBrand from "./DeleteBrand";
import { INavRoute } from "../../router/routing";
import PageHeader from "../../components/pageHeader";
import Button from "../../components/Button/Button";
import Paginate from "../../components/Paginate/Paginate";

interface IProps {
  nav?: INavRoute;
}

const Brands: React.FC<IProps> = ({ nav }: IProps) => {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [brandDelete, setBrandDelete] = useState<IDeleteModal>({
    id: null,
    delete: false,
  });

  const { loading, data } = useQuery(GET_BRANDS, {
    variables: { page },
    onError: () => toast.error(t("error_not_loaded"), { duration: 2000 }),
  });

  const toggleDeleteModal = (id: number | null = null) => {
    setBrandDelete({ delete: !brandDelete.delete, id });
  };

  return (
    <AppLayout>
      <>
        <Modal isOpen={brandDelete.delete} close={toggleDeleteModal}>
          <DeleteBrand id={brandDelete.id} close={toggleDeleteModal} />
        </Modal>

        <main className="bg-white px-5 py-3 rounded-lg">
          <PageHeader
            addPath={RouteNames.brandCreate}
            nav={nav}
            total={data?.brands?.paginatorInfo?.total}
          />

          {loading && <MiniLoader />}

          {data && data.brands.data && (
            <section className="overflow-x-auto hide-scroll">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-slate-100 text-left text-gray-800">
                  <tr>
                    <th className="px-4 py-3 w-20 rounded-tl-lg rounded-bl-lg">
                      {t("id")}
                    </th>
                    <th className="px-4 py-3 w-96">Name</th>
                    <th className="px-4 py-3 w-52">Category id</th>
                    <th className="px-4 py-3 w-52">Logo</th>
                    <th className="px-4 py-3 rounded-tr-lg rounded-br-lg w-36">
                      {t("options")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.brands.data.map((brand: IBrandList, index: number) => {
                    return (
                      <tr
                        key={index}
                        className="border-b border-stone-100 text-indigo-900/80"
                      >
                        <td className="border-r border-stone-100 px-4 py-3 text-xs">
                          {brand.id}
                        </td>
                        <td className="border-r border-stone-100 w-96 px-4 py-3">
                          <h1 className="font-bold">{brand.name}</h1>
                        </td>

                        <td className="border-r border-stone-100 px-4 py-3">
                          <p>{brand.category_id}</p>
                        </td>

                        <td className="p-2">
                          <img
                            className="w-10"
                            src={brand?.logotype}
                            alt="img"
                          />
                        </td>

                        <td className="px-2 py-3">
                          <div className="flex">
                            <NavLink
                              to={`${RouteNames.banner}/${brand.id}`}
                              className="border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white duration-300 w-8 h-8 mx-1 flex items-center justify-center rounded-full"
                            >
                              <IoEyeOutline size={18} />
                            </NavLink>

                            <Button.Edit
                              link={`${RouteNames.banner}/${brand.id}/edit`}
                            />

                            <Button.Delete
                              onClick={() => toggleDeleteModal(brand.id)}
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

export default Brands;
