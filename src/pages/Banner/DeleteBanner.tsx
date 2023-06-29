import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { IoTrashOutline } from "react-icons/io5";
import { IDeleteModal } from "../../common/interfaces/IDeleteModal";
import toast from "react-hot-toast";
import { IModal } from "../../common/interfaces/IModal";
import { DELETE_BANNER } from "../../graphql/mutations/Banner/deleteBannerMutation";
import { GET_BANNERS } from "../../graphql/queries/Banner/getBannersQuery";

const DeleteBanner: React.FC<IDeleteModal & IModal> = ({ id, close }) => {
  const { t } = useTranslation(["common", "banner"]);

  const onCompleted = () => {
    toast.success(t("success_deleted"), { duration: 500 }) &&
      setTimeout(() => close(), 500);
  };

  const onError = () => toast.error(t("error_not_deleted"), { duration: 500 });

  const [mutate] = useMutation(DELETE_BANNER, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_BANNERS,
        variables: { page: 1 },
      },
    ],
  });

  return (
    <>
      <h1 className="text-xl text-center font-montserrat-bold py-3">
        {t("banner:confirm_delete")}
      </h1>

      <div className="flex items-center justify-center p-2">
        <button
          onClick={() => mutate({ variables: { id } })}
          className="bg-red-400 hover:bg-red-600 duration-300 text-white px-5 py-2.5 flex items-center rounded-lg mx-3"
        >
          <IoTrashOutline size={20} />
          <p className="mx-2"> {t("common:yes")} </p>
        </button>

        <button
          onClick={close}
          className="bg-slate-100 text-gray-600 hover:bg-slate-200 hover:text-gray-800 duration-300 px-5 py-2.5 flex items-center rounded-lg mx-3"
        >
          <p className="mx-2"> {t("common:no")} </p>
        </button>
      </div>
    </>
  );
};

export default DeleteBanner;
