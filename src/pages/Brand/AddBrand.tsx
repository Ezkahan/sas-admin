import { useTranslation } from "react-i18next";
import React, { useCallback } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ADD_BRAND } from "../../graphql/mutations/Brand/addBrandMutation";
import { GET_BRANDS } from "../../graphql/queries/Brand/getBrandsQuery";
import { GET_SHORT_CATEGORY_LIST } from "../../graphql/queries/Categories/getCategoriesQuery";
import AppLayout from "../../layouts/AppLayout";
import TextField from "../../components/Form/TextField";
import Select from "../../components/Form/Select";
import Button from "../../components/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IBrand } from "./IBrand";
import { RouteNames } from "../../router/routing";
import CategoryListDTO from "../Category/CategoryListDTO";
import ImageGallery from "../../components/Image/ImageGallery";
import ImageInput from "../../components/Image/ImageInput";
import { compressImage } from "../../common/helpers/compressImage";

const AddBrand: React.FC = () => {
  const { t } = useTranslation(["common", "brand"]);
  const navigate = useNavigate();
  const { data } = useQuery(GET_SHORT_CATEGORY_LIST);

  const onCompleted = () => {
    toast.success(t("common:success_saved"), { duration: 1000 }) &&
      setTimeout(() => navigate("/brand"), 1000);
  };

  const onError = (e: ApolloError) =>
    toast.error(`${t("common:error_not_saved")} ${e.message}`, {
      duration: 2000,
    });

  const [mutate] = useMutation(ADD_BRAND, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_BRANDS,
        variables: { page: 1 },
      },
    ],
  });

  const validationSchema = () => {
    return Yup.object().shape({
      logo: Yup.string().required(t("brand:logo_required")),
      name: Yup.string().required(t("brand:name_required")),
      category_id: Yup.string().required(t("brand:category_required")),
    });
  };

  const formik = useFormik({
    initialValues: {} as IBrand,
    validationSchema,
    onSubmit: (values) => {
      mutate({
        variables: values,
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

      formik.setFieldValue("logo", compressedFile);
    },
    []
  );

  return (
    <AppLayout>
      <form onSubmit={formik.handleSubmit} className="section space-y-6">
        <h1 className="text-lg font-montserrat-bold">{t("brand:add")}</h1>

        <aside className="flex flex-col gap-5">
          {formik.values.logo && <ImageGallery image={formik.values.logo} />}
          <ImageInput label={t("common:image")} handleImage={handleImage} />
        </aside>

        <aside className="flex gap-5">
          <TextField
            name="name"
            label={t("brand:name")}
            placeholder={t("brand:name")}
            handleChange={formik.handleChange}
          />

          <Select
            name="category_id"
            label={t("common:category")}
            placeholder={t("common:category_placeholder")}
            handleChange={formik.handleChange}
            options={CategoryListDTO(data?.categories?.data)}
          />
        </aside>

        <footer className="flex items-center justify-end gap-3">
          <Button bg="secondary" link={RouteNames.brand}>
            <p>{t("common:cancel")}</p>
          </Button>

          <Button type="submit" disabled={!(formik.dirty && formik.isValid)}>
            <p>{t("common:save")}</p>
          </Button>
        </footer>
      </form>
    </AppLayout>
  );
};

export default AddBrand;
