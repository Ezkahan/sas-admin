import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import TextField from "../../components/common/Form/TextField";
import ImageUpload from "../../components/common/Form/imageUpload";
import { ICategoryCreate } from "../../common/interfaces/Category/ICategoryCreate";
import { CREATE_CATEGORY } from "../../graphql/mutations/Category/createCategoryMutation";
import { GET_CATEGORY_LIST } from "../../graphql/queries/Categories/getCategoriesQuery";
import Button from "../../components/Button/Button";
import Select from "../../components/common/Form/Select";

const AddCategory: React.FC = () => {
  const { t } = useTranslation(["common", "category"]);
  const navigate = useNavigate();
  const [image, setImage] = useState({
    select_image: t("common:select_image"),
    image: "",
  });
  const [cropedImage, setCropedImage] = useState();
  const [cropedIcon, setCropedIcon] = useState();

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  const onError = () => toast.error(t("error_not_saved"), { duration: 2000 });

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_CATEGORY_LIST,
        variables: { page: 1 },
      },
    ],
  });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    createCategory({
      variables: {
        image: cropedImage,
        icon: cropedIcon,
        parent_id: category.parent_id,
        name: JSON.stringify({
          tm: category.name_tm,
          ru: category.name_ru || category.name_tm,
        }),
        description: JSON.stringify({
          description_tm: category.description_tm,
          description_ru: category.description_ru || category.description_tm,
        }),
      },
    });
  };

  return (
    <AppLayout>
      <form onSubmit={onSubmit} className="bg-white px-5 py-3 rounded-lg">
        <h1 className="text-lg font-montserrat-bold">{t("category:add")}</h1>

        <aside className="flex gap-5 mt-5 mb-8">
          <ImageUpload
            required={false}
            inputData={image}
            setInputData={setImage}
            setCropedImage={setCropedImage}
            label={t("category:select_image")}
          />

          <ImageUpload
            required={false}
            inputData={image}
            setInputData={setImage}
            setCropedImage={setCropedIcon}
            label={t("category:select_icon")}
          />
        </aside>

        <aside className="grid grid-cols-12 gap-5 mt-3 mb-8">
          <TextField
            name="name_tm"
            required
            lang="tm"
            label={t("category:name_tm")}
            placeholder={t("category:name_tm")}
            handleChange={handleChange}
          />

          <TextField
            name="name_tm"
            required
            lang="tm"
            label={t("category:name_ru")}
            placeholder={t("category:name_ru")}
            handleChange={handleChange}
          />
        </aside>

        <aside className="flex gap-5 mt-5 mb-8">
          <TextField
            name="description_tm"
            required
            label={t("category:description_tm")}
            placeholder={t("category:description_tm")}
            handleChange={handleChange}
          />

          <TextField
            name="description_ru"
            required
            label={t("category:description_ru")}
            placeholder={t("category:description_ru")}
            handleChange={handleChange}
          />
        </aside>

        <aside className="mt-5 mb-8">
          <Select
            name="parent_id"
            label={t("category:select_category")}
            placeholder={t("category:select_category")}
            handleChange={handleChange}
            options={[
              { title: "1", value: 1 },
              { title: "2", value: 2 },
            ]}
          />
        </aside>

        <footer className="flex items-center justify-end gap-3">
          <Button bg="secondary" link={RouteNames.category}>
            <p>{t("common:cancel")}</p>
          </Button>

          <Button type="submit">
            <p>{t("common:save")}</p>
          </Button>
        </footer>
      </form>
    </AppLayout>
  );
};

export default AddCategory;
