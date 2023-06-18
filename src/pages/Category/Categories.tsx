import { useQuery } from "@apollo/client";
import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import MiniLoader from "../../components/Loader/MiniLoader";
import { NavLink } from "react-router-dom";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import Modal from "../../components/Modal/Modal";
import { IDeleteModal } from "../../common/interfaces/IDeleteModal";
import { ICategoryList } from "../../common/interfaces/Category/ICategoryList";
import { RouteNames } from "../../router/routing";
import { INavRoute } from "../../router/routing";
import PageHeader from "../../components/pageHeader";
import DeleteCategory from "./DeleteCategory";
import { jsonParseToLangs } from "../../common/helpers/jsonParseToLangs";
import NO_IMAGE from "../../assets/icons/no_image.png";
import { GET_CATEGORY_LIST } from "../../graphql/queries/Categories/getCategoriesQuery";

interface IProps {
  nav?: INavRoute;
}

const Categories: React.FC<IProps> = ({ nav }: IProps) => {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [categoryDelete, setCategoryDelete] = useState<IDeleteModal>({
    id: null,
    delete: false,
  });

  const { loading, data } = useQuery(GET_CATEGORY_LIST, {
    variables: { page },
    onError: () => toast.error(t("error_not_loaded"), { duration: 2000 }),
  });

  const toggleDeleteModal = (id: number | null = null) => {
    setCategoryDelete({ delete: !categoryDelete.delete, id });
  };

  return (
    <AppLayout>
      <section className="xl:p-5 p-1">
        <Modal isOpen={categoryDelete.delete} close={toggleDeleteModal}>
          <DeleteCategory id={categoryDelete.id} close={toggleDeleteModal} />
        </Modal>

        <main className="bg-white xl:px-8 px-6 xl:py-6 py-4 mb-5 rounded-lg">
          <PageHeader
            addPath={RouteNames.categoryCreate}
            nav={nav}
            total={data?.categories?.paginatorInfo?.total}
          />

          {loading && <MiniLoader />}

          {data && data.categories.data && (
            <section className="overflow-x-auto">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-slate-100 text-left text-gray-800">
                  <tr>
                    <th className="px-4 py-3 w-20 rounded-tl-lg rounded-bl-lg">
                      {t("id")}
                    </th>
                    <th className="px-4 py-3 w-96">{"name"}</th>
                    <th className="px-4 py-3 w-52">{"Image"}</th>
                    <th className="px-4 py-3 w-52 text-center">
                      {"Visited count"}
                    </th>
                    <th className="px-4 py-3 rounded-tr-lg rounded-br-lg w-36">
                      {t("options")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.categories.data.map(
                    (category: ICategoryList, index: number) => {
                      return (
                        <tr
                          key={index}
                          className="border-b border-stone-100 text-indigo-900/80"
                        >
                          <td className="border-r border-stone-100 px-4 py-3 text-xs">
                            {category.id}
                          </td>
                          <td className="border-r border-stone-100 w-96 px-4 py-3">
                            <h1 className="font-bold">
                              {jsonParseToLangs(category.name).tm}
                            </h1>
                          </td>

                          <td className="px-4 py-3">
                            <object data={NO_IMAGE} type="image/png">
                              <img src={category.image} alt="img" />
                            </object>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {category.visited_count}
                          </td>

                          <td className="px-2 py-3">
                            <div className="flex">
                              {/* <NavLink
                                to={`${RouteNames.category}/${category.id}`}
                                className="border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white duration-300 w-8 h-8 mx-1 flex items-center justify-center rounded-full"
                              >
                                <IoEyeOutline size={18} />
                              </NavLink> */}

                              <NavLink
                                to={`${RouteNames.category}/${category.id}/edit`}
                                className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white duration-300 w-8 h-8 mx-1 flex items-center justify-center rounded-full"
                              >
                                <IoPencilOutline size={18} />
                              </NavLink>

                              <button
                                onClick={() => toggleDeleteModal(category.id)}
                                className=""
                              >
                                <IoTrashOutline size={18} />
                              </button>
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
          pageCount={data && data.categories.paginatorInfo.lastPage}
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
      </section>
    </AppLayout>
  );
};

export default Categories;
