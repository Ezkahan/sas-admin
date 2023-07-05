import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React, { useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import TextField from "../../components/Form/TextField";
import {
  GET_CATEGORY_LIST,
  GET_SHORT_CATEGORY_LIST,
} from "../../graphql/queries/Categories/getCategoriesQuery";
import Button from "../../components/Button/Button";
import Select from "../../components/Form/Select";
import CategoryListDTO from "./CategoryListDTO";
import { SAVE_CATEGORY } from "../../graphql/mutations/Category/saveCategoryMutation";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImageInput from "../../components/Image/ImageInput";
import ImageGallery from "../../components/Image/ImageGallery";
import { compressImage } from "../../common/helpers/compressImage";
import { GET_CATEGORY } from "../../graphql/queries/Categories/getCategoryQuery";
import CategorySaveDTO from "./CategorySaveDTO";

const EditCategory: React.FC = () => {
  const { t } = useTranslation(["common", "category"]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery(GET_SHORT_CATEGORY_LIST);
  const { data: categoryData } = useQuery(GET_CATEGORY, {
    variables: { id },
  });

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate(RouteNames.category), 2000);
  };

  const onError = () => toast.error(t("error_not_saved"), { duration: 2000 });

  const [mutate] = useMutation(SAVE_CATEGORY, {
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
      // name: Yup.string().required(t("category:image_required")),
      // icon: Yup.string().required(t("category:icon_required")),
    });
  };

  const formik = useFormik({
    initialValues: CategorySaveDTO(categoryData?.category),
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate({
        variables: {
          ...values,
          name: JSON.stringify(values.name),
          description: JSON.stringify(values.description),
        },
      });
    },
  });

  const handleImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      const compressedFile = await compressImage(file as File, {
        quality: 0.5,
        type: "image/jpeg",
      });

      formik.setFieldValue(e.target.name, compressedFile);
    },
    []
  );

  return (
    <AppLayout>
      <form onSubmit={formik.handleSubmit} className="section space-y-6">
        <h1 className="text-lg font-montserrat-bold">{t("category:edit")}</h1>

        <aside className="flex gap-x-5">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex gap-5">
              {formik.values?.image_url && (
                <img
                  src={formik.values?.image_url}
                  className="h-48 rounded-lg"
                />
              )}
              {formik.values?.image && (
                <ImageGallery image={formik.values.image} />
              )}
            </div>
            <ImageInput
              name="image"
              label={t("common:image")}
              handleImage={handleImage}
            />
          </div>

          <div className="flex flex-col gap-5 w-full">
            <div className="flex gap-5">
              {formik.values?.icon_url && (
                <img
                  src={formik.values?.icon_url}
                  className="h-48 rounded-lg"
                />
              )}
              {formik.values?.icon && (
                <ImageGallery image={formik.values.icon} />
              )}
            </div>
            <ImageInput
              name="icon"
              label={t("category:icon")}
              handleImage={handleImage}
            />
          </div>
        </aside>

        <aside className="flex gap-5">
          <TextField
            name="name.tm"
            required
            lang="tm"
            label={t("category:name_tm")}
            placeholder={t("category:name_tm")}
            handleChange={formik.handleChange}
            defaultValue={formik.values?.name?.tm}
          />

          <TextField
            name="name.ru"
            required
            lang="tm"
            label={t("category:name_ru")}
            placeholder={t("category:name_ru")}
            handleChange={formik.handleChange}
            defaultValue={formik.values?.name?.ru}
          />
        </aside>

        <aside className="flex gap-5">
          <TextField
            name="description.tm"
            label={t("category:description_tm")}
            placeholder={t("category:description_tm")}
            handleChange={formik.handleChange}
            defaultValue={formik.values?.description?.tm}
          />

          <TextField
            name="description.ru"
            label={t("category:description_ru")}
            placeholder={t("category:description_ru")}
            handleChange={formik.handleChange}
            defaultValue={formik.values?.description?.ru}
          />
        </aside>

        <aside className="flex gap-5">
          <Select
            name="category_id"
            label={t("common:category")}
            placeholder={t("common:category_placeholder")}
            handleChange={formik.handleChange}
            options={CategoryListDTO(data?.categories?.data)}
            selected_value={formik.values?.parent_id}
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
