import { useTranslation } from "react-i18next";
import React, { useCallback } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { SAVE_BRAND } from "../../graphql/mutations/Brand/saveBrandMutation";
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
import { GET_BRAND } from "../../graphql/queries/Brand/getBrandQuery";

const EditBrand: React.FC = () => {
  const { t } = useTranslation(["common", "brand"]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery(GET_SHORT_CATEGORY_LIST);
  const { data: brandData } = useQuery(GET_BRAND, {
    variables: { id },
  });

  const onCompleted = () => {
    toast.success(t("common:success_saved"), { duration: 1000 }) &&
      setTimeout(() => navigate("/brand"), 1000);
  };

  const onError = (e: ApolloError) =>
    toast.error(`${t("common:error_not_saved")} ${e.message}`, {
      duration: 2000,
    });

  const [mutate] = useMutation(SAVE_BRAND, {
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
      name: Yup.string().required(t("brand:name_required")),
      category_id: Yup.string().required(t("brand:category_required")),
    });
  };

  const formik = useFormik({
    initialValues: brandData?.brand as IBrand,
    validationSchema,
    enableReinitialize: true,
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
        <h1 className="text-lg font-montserrat-bold">{t("brand:edit")}</h1>

        <aside className="flex flex-col gap-5">
          <div className="flex gap-5">
            {formik.values?.logo_url && (
              <img src={formik.values?.logo_url} className="w-48 rounded-lg" />
            )}
            {formik.values?.logo && <ImageGallery image={formik.values.logo} />}
          </div>
          <ImageInput label={t("common:image")} handleImage={handleImage} />
        </aside>

        <aside className="flex gap-5">
          <TextField
            name="name"
            label={t("brand:name")}
            placeholder={t("brand:name")}
            handleChange={formik.handleChange}
            defaultValue={formik.values?.name}
          />

          <Select
            name="category_id"
            label={t("common:category")}
            placeholder={t("common:category_placeholder")}
            handleChange={formik.handleChange}
            options={CategoryListDTO(data?.categories?.data)}
            selected_value={formik.values?.category_id}
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

export default EditBrand;
