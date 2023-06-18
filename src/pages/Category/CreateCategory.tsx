import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import TextField from "../../components/common/Form/TextField";
import ImageUpload from "../../components/common/Form/imageUpload";
import { ICategoryCreate } from "../../common/interfaces/Category/ICategoryCreate";
import { CREATE_CATEGORY } from "../../graphql/mutations/Category/createCategoryMutation";
import { GET_CATEGORY_LIST } from "../../graphql/queries/Categories/getCategoriesQuery";

const CreateCategory: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inputImageData, setImageInputData] = useState({
    select_image: "Выберите",
    image: "",
  });
  const [newCropedImage, setNewCropedImage] = useState();

  const [category, setCategory] = useState<ICategoryCreate>({
    name_tm: "",
    name_ru: "",
    description_tm: "",
    description_ru: "",
    icon: "",
    image: "",
    parent_id: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate(RouteNames.category), 2000);
  };

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    onCompleted,
    onError: () => toast.error(t("error_not_saved"), { duration: 2000 }),
    refetchQueries: [
      {
        query: GET_CATEGORY_LIST,
        variables: { page: 1 },
      },
    ],
  });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(category);
    createCategory({
      variables: {
        image: newCropedImage,
        name: JSON.stringify({
          tm: category.name_tm,
          ru: category.name_ru || category.name_tm,
        }),
        icon: category.icon,
        parent_id: category.parent_id,
        description: JSON.stringify({
          description_tm: category.description_tm,
          description_ru: category.description_ru || category.description_tm,
        }),
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
          <h1 className="text-lg font-montserrat-bold">Add category</h1>

          <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
            <ImageUpload
              required={false}
              inputData={inputImageData}
              setInputData={setImageInputData}
              setCropedImage={setNewCropedImage}
              label={"Картинка"}
            />
          </aside>
          <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
            <TextField
              name="name_tm"
              label="Label"
              required
              withLocale
              lang="tm"
              placeholder="Adyny giriziň"
              handleChange={handleChange}
            />
            <TextField
              name="description_tm"
              label="Description"
              withLocale
              lang="tm"
              placeholder="input description"
              handleChange={handleChange}
            />
          </aside>
          <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
            <TextField
              name="name_ru"
              label="Label"
              required
              withLocale
              placeholder="Adyny giriziň"
              handleChange={handleChange}
            />
            <TextField
              name="description_ru"
              label="Description"
              withLocale
              placeholder="input description"
              handleChange={handleChange}
            />
          </aside>
          <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
            {/* <Select
              name="parent_id"
              label="Категория"
              placeholder="Выберите категорию"
              handleChange={handleChange}
              options={[
                { title: "1", value: 1 },
                { title: "2", value: 2 },
              ]}
            /> */}
            <TextField
              name="icon"
              label="Icon"
              type="file"
              placeholder="icon file"
              handleChange={handleChange}
            />
          </aside>

          <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-montserrat-bold px-6 py-2.5 border border-indigo-600 duration-300 rounded-lg">
            {t("save")}
          </button>
          <NavLink
            to={RouteNames.category}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 font-montserrat-bold px-6 py-3 duration-300 rounded-lg ml-10"
          >
            {t("cancel")}
          </NavLink>
        </form>
      </section>
    </AppLayout>
  );
};

export default CreateCategory;
