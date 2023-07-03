import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import TextField from "../../components/Form/TextField";
import { ADD_NEWS } from "../../graphql/mutations/News/addNewsMutation";
import { GET_NEWS } from "../../graphql/queries/News/getNewsQuery";
import TextEditor from "../../components/Form/TextEditor";
import Button from "../../components/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { INews } from "./INews";
import ImageEditor from "../../components/Image/ImageEditor";

const CreateNews: React.FC = () => {
  const { t } = useTranslation(["common", "news"]);
  const navigate = useNavigate();

  const validationSchema = () => {
    return Yup.object().shape({
      title: Yup.object().shape({
        tm: Yup.string().required(t("product:name_tm_required")),
        ru: Yup.string().required(t("product:name_ru_required")),
      }),
      description: Yup.object().shape({
        tm: Yup.string().required(t("product:name_tm_required")),
        ru: Yup.string().required(t("product:name_ru_required")),
      }),
    });
  };

  const formik = useFormik({
    initialValues: {} as INews,
    validationSchema,
    onSubmit: (values) => {
      mutate({
        variables: values,
      });
    },
  });

  const onCompleted = () => {
    toast.success(t("common:success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate(RouteNames.news), 2000);
  };

  const onError = () =>
    toast.error(t("common:error_not_saved"), { duration: 2000 });

  const handleCroppedImage = (reader: FileReader) =>
    formik.setFieldValue("cropped_image", reader.result);

  const handleFile = (files: FileList | null) =>
    formik.setFieldValue("image", files?.[0]);

  const [mutate] = useMutation(ADD_NEWS, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_NEWS,
        variables: { page: 1 },
      },
    ],
  });

  return (
    <AppLayout>
      <form onSubmit={formik.handleSubmit} className="section space-y-6">
        <h1 className="text-lg font-montserrat-bold">{t("news:title")}</h1>

        <ImageEditor
          handleFile={handleFile}
          handleCroppedImage={handleCroppedImage}
          label={t("common:select_image")}
        />

        <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
          <TextField
            name="title_tm"
            lang="tm"
            label="Label"
            required
            placeholder="Input title"
            handleChange={formik.handleChange}
          />
          <TextField
            name="title_ru"
            label="Label"
            required
            placeholder="Input title"
            handleChange={formik.handleChange}
          />
        </aside>
        <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
          <div className="col-span-6">
            <TextEditor
              label="Description"
              required
              locale="tm"
              handleChange={formik.handleChange}
            />
          </div>
          <div className="col-span-6">
            <TextEditor
              label="Description"
              required
              handleChange={formik.handleChange}
            />
          </div>
        </aside>

        <footer className="flex items-center justify-end gap-3">
          <Button bg="secondary" link={RouteNames.news}>
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

export default CreateNews;
