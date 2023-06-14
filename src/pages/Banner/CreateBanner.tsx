import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IBannerCreate } from "../../common/interfaces/Banner/IBannerCreate";
import { RouteNames } from "../../router/routing";
import { GET_BANNERS } from "../../graphql/queries/Banner/getBannersQuery";
import { CREATE_BANNER } from "../../graphql/mutations/Banner/createBannerMutation";
import TextField from "../../components/common/Form/TextField";
import Select from "../../components/common/Form/Select";
import ImageUpload from "../../components/common/Form/imageUpload";

const CreateBanner: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inputImageData, setImageInputData] = useState({
    select_image: "Выберите",
    image: "",
  });
  const [newCropedImage, setNewCropedImage] = useState();

  const [banner, setBanner] = useState<IBannerCreate>({
    category_id: 1,
    image: "",
    position: "",
    link: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBanner({
      ...banner,
      [e.target.name]: e.target.value,
    });
  };

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate(RouteNames.banner), 2000);
  };

  const [createBanner] = useMutation(CREATE_BANNER, {
    onCompleted,
    onError: () => toast.error(t("error_not_saved"), { duration: 2000 }),
    refetchQueries: [
      {
        query: GET_BANNERS,
        variables: { page: 1 },
      },
    ],
  });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createBanner({
      variables: {
        image: newCropedImage,
        link: banner.link,
        position: banner.position,
        category_id: banner.category_id,
      },
    });
  };

  return (
    <AppLayout>
      <section className="xl:p-5 p-1">
        <form
          onSubmit={(e) => onSubmit(e)}
          className="bg-white xl:px-8 px-5 xl:py-6 py-4 xl:my-5 my-3 rounded-lg"
        >
          <h1 className="text-lg font-montserrat-bold">New banner</h1>

          <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
            <ImageUpload
              inputData={inputImageData}
              setInputData={setImageInputData}
              setCropedImage={setNewCropedImage}
              label={"Картинка"}
            />
          </aside>
          <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
            <TextField
              name="link"
              label="URL"
              placeholder="Sylkany giriziň"
              handleChange={handleChange}
            />
            <Select
              name="position"
              label="Позиция"
              placeholder="Выберите позицию"
              handleChange={handleChange}
              options={[
                { title: "header", value: "header" },
                { title: "footer", value: "footer" },
              ]}
            />
          </aside>
          <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
            <Select
              name="category_id"
              label="Категория"
              placeholder="Выберите категорию"
              handleChange={handleChange}
              options={[
                { title: "1", value: 1 },
                { title: "2", value: 2 },
              ]}
            />
          </aside>
          <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-montserrat-bold px-6 py-2.5 border border-indigo-600 duration-300 rounded-lg">
            {t("save")}
          </button>
          <NavLink
            to={RouteNames.banner}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 font-montserrat-bold px-6 py-3 duration-300 rounded-lg ml-10"
          >
            {t("cancel")}
          </NavLink>
        </form>
      </section>
    </AppLayout>
  );
};

export default CreateBanner;
