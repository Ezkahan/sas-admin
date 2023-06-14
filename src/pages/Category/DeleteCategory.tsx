import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { IoTrashOutline } from "react-icons/io5";
import { IDeleteModal } from "../../common/interfaces/IDeleteModal";
import toast from "react-hot-toast";
import { IModal } from "../../common/interfaces/IModal";
import { DELETE_CATEGORY } from "../../graphql/mutations/Category/deleteCategoryMutation";
import { GET_CATEGORY_LIST } from "../../graphql/queries/Categories/getCategoriesQuery";

const DeleteCategory: React.FC<IDeleteModal & IModal> = ({ id, close }) => {
  const { t } = useTranslation();

  const onCompleted = () => {
    toast.success(t("success_deleted"), { duration: 1500 }) &&
      setTimeout(() => close(), 1000);
  };

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted,
    onError: () => toast.error(t("error_not_deleted"), { duration: 2000 }),
    refetchQueries: [
      {
        query: GET_CATEGORY_LIST,
        variables: { page: 1 },
      },
    ],
  });

  return (
    <main>
      <header className="text-center p-2 mb-4">
        <h1 className="text-xl font-montserrat-bold">
          {" "}
          {t("confirm_delete")}{" "}
        </h1>

        <small> ID: {id} </small>
      </header>
      <footer className="flex items-center justify-center p-2">
        <button
          onClick={() => deleteCategory({ variables: { id: id } })}
          className="bg-red-400 hover:bg-red-600 duration-300 text-white px-5 py-2.5 flex items-center rounded-lg mx-3"
        >
          <IoTrashOutline size={20} />
          <p className="mx-2"> {t("yes")} </p>
        </button>

        <button
          onClick={() => close()}
          className="bg-slate-100 text-gray-600 hover:bg-slate-200 hover:text-gray-800 duration-300 px-5 py-2.5 flex items-center rounded-lg mx-3"
        >
          <p className="mx-2"> {t("no")} </p>
        </button>
      </footer>
    </main>
  );
};

export default DeleteCategory;
