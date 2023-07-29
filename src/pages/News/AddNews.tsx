import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React, { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import TextField from "../../components/Form/TextField";
import Button from "../../components/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImageInput from "../../components/Image/ImageInput";
import ImageGallery from "../../components/Image/ImageGallery";
import { compressImage } from "../../common/helpers/compressImage";
import { INews } from "./INews";
import { GET_NEWS } from "../../graphql/queries/News/getNewsQuery";
import { SAVE_NEWS } from "../../graphql/mutations/News/saveNewsMutation";

const AddNews: React.FC = () => {
  const { t } = useTranslation(["common", "news"]);
  const navigate = useNavigate();

  const onCompleted = () => {
    toast.success(t("common:success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate(RouteNames.news), 2000);
  };

  const onError = () =>
    toast.error(t("common:error_not_saved"), { duration: 2000 });

  const [mutate] = useMutation(SAVE_NEWS, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_NEWS,
        variables: { page: 1 },
      },
    ],
  });

  const validationSchema = () => {
    return Yup.object().shape({
      title: Yup.object().shape({
        tm: Yup.string().required(t("news:title_tm_required")),
        ru: Yup.string().required(t("news:title_ru_required")),
      }),
      description: Yup.object().shape({
        tm: Yup.string().required(t("news:description_tm_required")),
        ru: Yup.string().required(t("news:description_ru_required")),
      }),
    });
  };

  const formik = useFormik({
    initialValues: {} as INews,
    validationSchema,
    onSubmit: (values) => {
      mutate({
        variables: {
          ...values,
          title: JSON.stringify(values.title),
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
        <h1 className="text-lg font-montserrat-bold">{t("news:add")}</h1>

        <aside className="flex flex-col gap-5">
          {formik.values.image && <ImageGallery image={formik.values.image} />}
          <ImageInput
            name="image"
            label={t("common:image")}
            handleImage={handleImage}
          />
        </aside>

        <aside className="flex gap-5">
          <TextField
            name="title.tm"
            required
            lang="tm"
            label={t("common:name_tm")}
            placeholder={t("common:name_tm")}
            handleChange={formik.handleChange}
          />

          <TextField
            name="title.ru"
            required
            lang="tm"
            label={t("common:name_ru")}
            placeholder={t("common:name_ru")}
            handleChange={formik.handleChange}
          />
        </aside>

        <aside className="flex gap-5">
          <TextField
            name="description.tm"
            required
            label={t("common:description_tm")}
            placeholder={t("common:description_tm")}
            handleChange={formik.handleChange}
          />

          <TextField
            name="description.ru"
            required
            label={t("common:description_ru")}
            placeholder={t("common:description_ru")}
            handleChange={formik.handleChange}
          />
        </aside>

        {JSON.stringify(formik.values)}

        <footer className="flex items-center justify-end gap-3">
          <Button bg="secondary" link={RouteNames.news}>
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

export default AddNews;
