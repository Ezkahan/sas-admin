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
import { SAVE_PAGE } from "../../graphql/mutations/Page/savePageMutation";
import { GET_PAGES } from "../../graphql/queries/Page/getPagesQuery";
import { IPage } from "./IPage";
import ImageInput from "../../components/Image/ImageInput";
import ImageGallery from "../../components/Image/ImageGallery";
import { compressImage } from "../../common/helpers/compressImage";
import Select from "../../components/Form/Select";
import { SelectOption } from "../../common/interfaces/ISelect";
import TextEditor from "../../components/Form/TextEditor";

const AddPage: React.FC = () => {
  const { t } = useTranslation(["common", "page"]);
  const navigate = useNavigate();

  const positions: SelectOption[] = [
    {
      label: t("page:position_header"),
      value: "HEADER",
    },
    {
      label: t("page:position_footer"),
      value: "FOOTER",
    },
  ];

  const onCompleted = () => {
    toast.success(t("common:success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate(RouteNames.pages), 2000);
  };

  const onError = () =>
    toast.error(t("common:error_not_saved"), { duration: 2000 });

  const [mutate] = useMutation(SAVE_PAGE, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_PAGES,
        variables: { page: 1 },
      },
    ],
  });

  const validationSchema = () => {
    return Yup.object().shape({
      title: Yup.object().shape({
        tm: Yup.string().required(t("page:title_tm_required")),
        ru: Yup.string().required(t("page:title_ru_required")),
      }),
      text: Yup.object().shape({
        tm: Yup.string().required(t("page:text_tm_required")),
        ru: Yup.string().required(t("page:text_ru_required")),
      }),
      position: Yup.string().required(t("page:position_required")),
    });
  };

  const formik = useFormik({
    initialValues: {} as IPage,
    validationSchema,
    onSubmit: (values) => {
      mutate({
        variables: {
          ...values,
          title: JSON.stringify(values.title),
          text: JSON.stringify(values.text),
        },
      });
    },
  });

  const handleText = (data: string, name: string) => {
    formik.setFieldValue(name, data);
  };

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
        <h1 className="text-lg font-montserrat-bold">{t("page:add")}</h1>

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
            label={t("common:title_tm")}
            placeholder={t("common:title_tm")}
            handleChange={formik.handleChange}
          />

          <TextField
            name="title.ru"
            required
            lang="tm"
            label={t("common:title_ru")}
            placeholder={t("common:title_ru")}
            handleChange={formik.handleChange}
          />
        </aside>

        <aside className="flex flex-col gap-5">
          <TextEditor
            label={t("common:text_tm")}
            name="text.tm"
            handleChange={handleText}
          />

          <TextEditor
            label={t("common:text_ru")}
            name="text.ru"
            handleChange={handleText}
          />
        </aside>

        <aside className="flex gap-5">
          <Select
            name="position"
            label={t("page:position")}
            placeholder={t("page:position_placeholder")}
            handleChange={formik.handleChange}
            options={positions}
            selected_value={formik.values?.position}
          />
        </aside>

        <footer className="flex items-center justify-end gap-3">
          <Button bg="secondary" link={RouteNames.pages}>
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

export default AddPage;
