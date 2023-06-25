import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import TextField from "../../components/common/Form/TextField";
import ImageUpload from "../../components/common/Form/ImageEditor";
import {
  GET_CATEGORY_LIST,
  GET_SHORT_CATEGORY_LIST,
} from "../../graphql/queries/Categories/getCategoriesQuery";
import Button from "../../components/Button/Button";
import Select from "../../components/common/Form/Select";
import CategoryListDTO from "./CategoryListDTO";
import { ADD_CATEGORY } from "../../graphql/mutations/Category/addCategoryMutation";
import { useFormik } from "formik";
import { ICategory } from "./Category/ICategory";
import * as Yup from "yup";

const AddCategory: React.FC = () => {
  const { t } = useTranslation(["common", "category"]);
  const navigate = useNavigate();
  const { data } = useQuery(GET_SHORT_CATEGORY_LIST);

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate(RouteNames.category), 2000);
  };

  const onError = () => toast.error(t("error_not_saved"), { duration: 2000 });

  const [mutate] = useMutation(ADD_CATEGORY, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_CATEGORY_LIST,
        variables: { page: 1 },
      },
    ],
  });

  const validationSchema = () => {
    return Yup.object().shape({
      image: Yup.string().required(t("category:image_required")),
      icon: Yup.string().required(t("category:icon_required")),
    });
  };

  const formik = useFormik({
    initialValues: {} as ICategory,
    validationSchema,
    onSubmit: (values) => {
      mutate({
        variables: values,
      });
    },
  });

  const handleCroppedImage = (reader: FileReader) =>
    formik.setFieldValue("image", reader.result);

  const handleFile = (files: FileList | null) =>
    formik.setFieldValue("image", files?.[0]);

  const handleCroppedIcon = (reader: FileReader) =>
    formik.setFieldValue("icon", reader.result);

  const handleIconFile = (files: FileList | null) =>
    formik.setFieldValue("icon", files?.[0]);

  return (
    <AppLayout>
      <form onSubmit={formik.handleSubmit} className="section space-y-6">
        <h1 className="text-lg font-montserrat-bold">{t("category:add")}</h1>

        <aside className="flex gap-5">
          <ImageUpload
            handleFile={handleFile}
            handleCroppedImage={handleCroppedImage}
            label={t("common:select_image")}
          />

          <ImageUpload
            handleFile={handleIconFile}
            handleCroppedImage={handleCroppedIcon}
            label={t("common:select_icon")}
          />
        </aside>

        <aside className="flex gap-5">
          <TextField
            name="name_tm"
            required
            lang="tm"
            label={t("category:name_tm")}
            placeholder={t("category:name_tm")}
            handleChange={formik.handleChange}
          />

          <TextField
            name="name_tm"
            required
            lang="tm"
            label={t("category:name_ru")}
            placeholder={t("category:name_ru")}
            handleChange={formik.handleChange}
          />
        </aside>

        <aside className="flex gap-5">
          <TextField
            name="description_tm"
            required
            label={t("category:description_tm")}
            placeholder={t("category:description_tm")}
            handleChange={formik.handleChange}
          />

          <TextField
            name="description_ru"
            required
            label={t("category:description_ru")}
            placeholder={t("category:description_ru")}
            handleChange={formik.handleChange}
          />
        </aside>

        <aside className="flex gap-5">
          <Select
            name="category_id"
            label={t("common:category")}
            placeholder={t("common:category_placeholder")}
            handleChange={formik.handleChange}
            options={CategoryListDTO(data?.categories?.data)}
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
