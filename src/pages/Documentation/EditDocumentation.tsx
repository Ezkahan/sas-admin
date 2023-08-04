import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import TextField from "../../components/Form/TextField";
import Button from "../../components/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IDocumentationSave } from "./IDocumentation";
import { SAVE_DOCUMENTATION } from "../../graphql/mutations/Documentation/saveDocsMutation";
import { GET_DOCUMENTATION } from "../../graphql/queries/Documentation/getDocByIdQuery";
import DocSaveDTO from "./DocSaveDTO";

const EditDocumentation: React.FC = () => {
  const { t } = useTranslation(["common", "documentation"]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery(GET_DOCUMENTATION, {
    variables: { id },
  });

  const onCompleted = () => {
    toast.success(t("common:success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate(RouteNames.documentation), 2000);
  };

  const onError = () =>
    toast.error(t("common:error_not_saved"), { duration: 2000 });

  const [mutate] = useMutation(SAVE_DOCUMENTATION, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_DOCUMENTATION,
        variables: { page: 1 },
      },
    ],
  });

  const validationSchema = () => {
    return Yup.object().shape({
      title: Yup.object().shape({
        tm: Yup.string().required(t("documentation:title_tm_required")),
        ru: Yup.string().required(t("documentation:title_ru_required")),
      }),
      text: Yup.object().shape({
        tm: Yup.string().required(t("documentation:text_tm_required")),
        ru: Yup.string().required(t("documentation:text_ru_required")),
      }),
    });
  };

  const formik = useFormik({
    initialValues: DocSaveDTO(data?.docDetail) as IDocumentationSave,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate({
        variables: {
          ...values,
          id,
          title: JSON.stringify(values.title),
          text: JSON.stringify(values.text),
        },
      });
    },
  });

  return (
    <AppLayout>
      <form onSubmit={formik.handleSubmit} className="section space-y-6">
        <h1 className="text-lg font-montserrat-bold">
          {t("documentation:edit")}
        </h1>

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
            name="text.tm"
            required
            label={t("common:text_tm")}
            placeholder={t("common:text_tm")}
            handleChange={formik.handleChange}
            defaultValue={formik.values.text?.tm}
          />

          <TextField
            name="text.ru"
            required
            label={t("common:text_ru")}
            placeholder={t("common:text_ru")}
            handleChange={formik.handleChange}
            defaultValue={formik.values.text?.ru}
          />
        </aside>

        <footer className="flex items-center justify-end gap-3">
          <Button bg="secondary" link={RouteNames.documentation}>
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

export default EditDocumentation;
