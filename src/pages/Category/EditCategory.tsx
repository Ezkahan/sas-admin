import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import { GET_CATEGORY } from "../../graphql/queries/Categories/getCategoryQuery";
import { UPDATE_CATEGORY } from "../../graphql/mutations/Category/updateCategoryMutation";
import TextField from "../../components/common/Form/TextField";
import { ICategory } from "./Category/ICategory";
import NavigateBack from "../../components/Core/NavigateBack";
import {
  GET_CATEGORY_LIST,
  GET_SHORT_CATEGORY_LIST,
} from "../../graphql/queries/Categories/getCategoriesQuery";
import { useFormik } from "formik";
import ImageUpload from "../../components/common/Form/ImageEditor";
import * as Yup from "yup";
import CategoryListDTO from "./CategoryListDTO";
import Select from "../../components/common/Form/Select";
import Button from "../../components/Button/Button";

const EditCategory: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: shortCategories } = useQuery(GET_SHORT_CATEGORY_LIST);

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate(RouteNames.category), 2000);
  };

  const { loading, data } = useQuery(GET_CATEGORY, {
    variables: { id: id },
    onError: () => toast.error(t("error_not_loaded"), { duration: 2000 }),
  });

  const [mutate] = useMutation(UPDATE_CATEGORY, {
    onCompleted,
    onError: () => toast.error(t("error_not_saved"), { duration: 2000 }),
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

  return (
    <AppLayout>
      {/* {loading && <MiniLoader />} */}

      <form onSubmit={formik.handleSubmit} className="section space-y-6">
        <NavigateBack backPath={RouteNames.category} />

        <h1 className="text-lg font-montserrat-bold">Edit category</h1>

        <ImageUpload
          handleFile={handleFile}
          handleCroppedImage={handleCroppedImage}
          label={t("common:select_image")}
        />

        <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
          <TextField
            name="name_tm"
            label="Label"
            withLocale
            lang="tm"
            required
            placeholder="Adyny giriziň"
            handleChange={formik.handleChange}
            defaultValue={formik.values.name}
          />
          <TextField
            name="description_tm"
            label="Description"
            withLocale
            lang="tm"
            placeholder="input description"
            // defaultValue={formik.values.description}
            handleChange={formik.handleChange}
          />
        </aside>

        <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
          <TextField
            name="name_ru"
            label="Label"
            withLocale
            defaultValue={formik.values.name}
            required
            placeholder="Adyny giriziň"
            handleChange={formik.handleChange}
          />
          <TextField
            name="description_ru"
            label="Description"
            withLocale
            // defaultValue={formik.values.description}
            placeholder="input description"
            handleChange={formik.handleChange}
          />
        </aside>

        <aside className="flex gap-5">
          <Select
            name="category_id"
            label={t("common:category")}
            placeholder={t("common:category_placeholder")}
            handleChange={formik.handleChange}
            options={CategoryListDTO(shortCategories?.categories?.data)}
          />

          <TextField
            name="icon"
            label="Icon"
            type="file"
            placeholder="icon file"
            handleChange={formik.handleChange}
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

export default EditCategory;
