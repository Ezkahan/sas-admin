import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React, { useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GET_BANNERS } from "../../graphql/queries/Banner/getBannersQuery";
import { ADD_BANNER } from "../../graphql/mutations/Banner/addBannerMutation";
import TextField from "../../components/Form/TextField";
import Select from "../../components/Form/Select";
import Button from "../../components/Button/Button";
import { RouteNames } from "../../router/routing";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BannerType } from "./IBanner";
import CategoryListDTO from "../Category/CategoryListDTO";
import { GET_SHORT_CATEGORY_LIST } from "../../graphql/queries/Categories/getCategoriesQuery";
import ImageInput from "../../components/Image/ImageInput";
import { compressImage } from "../../common/helpers/compressImage";
import ImageGallery from "../../components/Image/ImageGallery";

const AddBanner: React.FC = () => {
  const { t } = useTranslation(["common", "banner"]);
  const navigate = useNavigate();
  const { data } = useQuery(GET_SHORT_CATEGORY_LIST);

  const positions = [
    { label: "TOP", value: "TOP" },
    { label: "MAIN", value: "MAIN" },
    { label: "BOTTOM", value: "BOTTOM" },
  ];

  const types = [
    { label: "WEB", value: "WEB" },
    { label: "MOBILE", value: "MOBILE" },
  ];

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 500 }) &&
      setTimeout(() => navigate("/banner"), 500);
  };

  const onError = () =>
    toast.error(t("common:error_not_saved"), { duration: 2000 });

  const [mutate] = useMutation(ADD_BANNER, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_BANNERS,
        variables: { page: 1 },
      },
    ],
  });

  const validationSchema = () => {
    return Yup.object().shape({
      image: Yup.string().required(t("banner:image_required")),
      position: Yup.string().required(t("banner:position_required")),
      link: Yup.string().required(t("banner:link_required")),
      category_id: Yup.string().required(t("banner:category_required")),
      type: Yup.string().required(t("banner:category_required")),
    });
  };

  const formik = useFormik({
    initialValues: {} as BannerType,
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

      formik.setFieldValue("image", compressedFile);
    },
    []
  );

  return (
    <AppLayout>
      <form onSubmit={formik.handleSubmit} className="section space-y-6">
        <h1 className="text-lg font-montserrat-bold">{t("banner:add")}</h1>

        <aside className="flex flex-col gap-5">
          {formik.values.image && <ImageGallery image={formik.values.image} />}
          <ImageInput label={t("banner:image")} handleImage={handleImage} />
        </aside>

        <aside className="flex gap-5">
          <TextField
            name="link"
            label={t("banner:url")}
            placeholder={t("banner:url_placeholder")}
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

        <aside className="flex gap-5">
          <Select
            name="position"
            label={t("banner:position")}
            placeholder={t("banner:position_placeholder")}
            handleChange={formik.handleChange}
            options={positions}
          />

          <Select
            name="type"
            label={t("banner:type")}
            placeholder={t("banner:type_placeholder")}
            handleChange={formik.handleChange}
            options={types}
          />
        </aside>

        <footer className="flex items-center justify-end gap-3">
          <Button bg="secondary" link={RouteNames.banner}>
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

export default AddBanner;
