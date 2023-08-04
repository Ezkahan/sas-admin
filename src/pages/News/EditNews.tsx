import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React, { useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import TextField from "../../components/Form/TextField";
import Button from "../../components/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImageInput from "../../components/Image/ImageInput";
import ImageGallery from "../../components/Image/ImageGallery";
import { compressImage } from "../../common/helpers/compressImage";
import { INewsSave } from "./INews";
import { SAVE_NEWS } from "../../graphql/mutations/News/saveNewsMutation";
import { GET_NEWS_DETAIL } from "../../graphql/queries/News/getNewsDetailQuery";
import { GET_NEWS } from "../../graphql/queries/News/getNewsQuery";
import NewsSaveDTO from "./NewsSaveDTO";

const EditNews: React.FC = () => {
  const { t } = useTranslation(["common", "news"]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery(GET_NEWS_DETAIL, {
    variables: { id },
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

  const onCompleted = () => {
    toast.success(t("common:success_saved"), { duration: 1500 });
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

  const formik = useFormik({
    initialValues: NewsSaveDTO(data?.newsDetail) as INewsSave,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate({
        variables: {
          ...values,
          id,
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

        <aside className="flex flex-col gap-5 w-full">
          <div className="flex gap-5">
            {formik.values?.image_url && (
              <img src={formik.values?.image_url} className="h-48 rounded-lg" />
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
        </aside>

        <aside className="flex gap-5">
          <TextField
            name="title.tm"
            required
            lang="tm"
            label={t("common:name_tm")}
            placeholder={t("common:name_tm")}
            handleChange={formik.handleChange}
            defaultValue={formik.values.title?.tm}
          />

          <TextField
            name="title.ru"
            required
            lang="tm"
            label={t("common:name_ru")}
            placeholder={t("common:name_ru")}
            handleChange={formik.handleChange}
            defaultValue={formik.values.title?.ru}
          />
        </aside>

        <aside className="flex gap-5">
          <TextField
            name="description.tm"
            required
            label={t("common:description_tm")}
            placeholder={t("common:description_tm")}
            handleChange={formik.handleChange}
            defaultValue={formik.values.description?.tm}
          />

          <TextField
            name="description.ru"
            required
            label={t("common:description_ru")}
            placeholder={t("common:description_ru")}
            handleChange={formik.handleChange}
            defaultValue={formik.values.description?.ru}
          />
        </aside>

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

export default EditNews;
