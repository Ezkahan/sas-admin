import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GET_BANNERS } from "../../graphql/queries/Banner/getBannersQuery";
import { ADD_BANNER } from "../../graphql/mutations/Banner/addBannerMutation";
import TextField from "../../components/common/Form/TextField";
import Select from "../../components/common/Form/Select";
import ImageEditor from "../../components/common/Form/ImageEditor";
import Button from "../../components/Button/Button";
import { RouteNames } from "../../router/routing";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BannerType } from "./IBanner";
import CategoryListDTO from "../Category/CategoryListDTO";
import { GET_SHORT_CATEGORY_LIST } from "../../graphql/queries/Categories/getCategoriesQuery";

const AddBanner: React.FC = () => {
  const { t } = useTranslation(["common", "banner"]);
  const navigate = useNavigate();
  const { data } = useQuery(GET_SHORT_CATEGORY_LIST);

  const positions = [
    { label: "TOP", value: "TOP" },
    { label: "MAIN", value: "MAIN" },
    { label: "BOTTOM", value: "BOTTOM" },
  ];

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate("/banner"), 2000);
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

  const handleCroppedImage = (reader: FileReader) =>
    formik.setFieldValue("image", reader.result);

  const handleFile = (files: FileList | null) =>
    formik.setFieldValue("image", files?.[0]);

  return (
    <AppLayout>
      <form onSubmit={formik.handleSubmit} className="section space-y-6">
        <h1 className="text-lg font-montserrat-bold">{t("banner:add")}</h1>

        <ImageEditor
          handleFile={handleFile}
          handleCroppedImage={handleCroppedImage}
          label={t("banner:select_image")}
        />

        <aside className="flex gap-5">
          <TextField
            name="link"
            label={t("banner:url")}
            placeholder={t("banner:url_placeholder")}
            handleChange={formik.handleChange}
          />
          <Select
            name="position"
            label={t("banner:position")}
            placeholder={t("banner:position_placeholder")}
            handleChange={formik.handleChange}
            options={positions}
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
