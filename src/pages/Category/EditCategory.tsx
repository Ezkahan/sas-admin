import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import MiniLoader from "../../components/Loader/MiniLoader";
import { ICategoryCreate } from "../../common/interfaces/Category/ICategoryCreate";
import { RouteNames } from "../../router/routing";
import { GET_CATEGORY } from "../../graphql/queries/Categories/getCategoryQuery";
import { UPDATE_CATEGORY } from "../../graphql/mutations/Category/updateCategoryMutation";
import TextField from "../../components/common/Form/TextField";
import ImageUpload from "../../components/common/Form/imageUpload";
import { jsonParseToLangs } from "../../common/helpers/jsonParseToLangs";
import { ICategoryList } from "../../common/interfaces/Category/ICategoryList";
import NavigateBack from "../../components/Core/NavigateBack";
import { GET_CATEGORY_LIST } from "../../graphql/queries/Categories/getCategoriesQuery";

const EditCategory: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

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
    parent_id: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const setCategoryData = (data: ICategoryCreate) => {
    setCategory({
      ...category,
      name_tm: data.name_tm,
      name_ru: data.name_ru,
      description_tm: data.description_tm,
      description_ru: data.description_ru,
      image: data.image,
      parent_id: data.parent_id,
    });
  };

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate(RouteNames.category), 2000);
  };

  type TData = {
    category: ICategoryList;
  };
  const { loading, data } = useQuery(GET_CATEGORY, {
    variables: { id: id },
    onCompleted: (data: TData) =>
      setCategoryData({
        ...data,
        name_ru: jsonParseToLangs(data.category.name).ru,
        name_tm: jsonParseToLangs(data.category.name).tm,
        description_ru: data.category.description
          ? jsonParseToLangs(data.category.description).ru
          : "",
        description_tm: data.category.description
          ? jsonParseToLangs(data.category.description).tm
          : "",
      }),
    onError: () => toast.error(t("error_not_loaded"), { duration: 2000 }),
  });

  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
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

    var updateData: any = {
      variables: {
        id: id,
        name: JSON.stringify({
          tm: category.name_tm,
          ru: category.name_ru || category.name_tm,
        }),
        icon: category.icon,
        parent_id: category.parent_id,
      },
    };
    if (category.description_tm) {
      updateData.variables.description = JSON.stringify({
        description_tm: category.description_tm,
        description_ru: category.description_ru || category.description_tm,
      });
    }
    updateCategory(updateData);
  };
  // console.log(data);
  return (
    <AppLayout>
      <section className="xl:p-5 p-1">
        {loading && <MiniLoader />}

        {data && data.category && (
          <form
            onSubmit={(e) => onSubmit(e)}
            className="bg-white xl:px-8 px-5 xl:py-6 py-4 xl:my-5 my-3 rounded-lg"
          >
            <NavigateBack backPath={RouteNames.category} />

            <h1 className="text-lg font-montserrat-bold">Edit category</h1>

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
                name="name_tm"
                label="Label"
                withLocale
                lang="tm"
                required
                placeholder="Adyny giriziň"
                handleChange={handleChange}
                defaultValue={category.name_tm}
              />
              <TextField
                name="description_tm"
                label="Description"
                withLocale
                lang="tm"
                placeholder="input description"
                defaultValue={category.description_tm}
                handleChange={handleChange}
              />
            </aside>

            <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
              <TextField
                name="name_ru"
                label="Label"
                withLocale
                lang="ru"
                defaultValue={category.name_ru}
                required
                placeholder="Adyny giriziň"
                handleChange={handleChange}
              />
              <TextField
                name="description_ru"
                label="Description"
                withLocale
                lang="ru"
                defaultValue={category.description_ru}
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

            <button className="btn" type="submit">
              {t("save")}
            </button>

            <NavLink to={RouteNames.category} className="navlink">
              {t("cancel")}
            </NavLink>
          </form>
        )}
      </section>
    </AppLayout>
  );
};

export default EditCategory;
