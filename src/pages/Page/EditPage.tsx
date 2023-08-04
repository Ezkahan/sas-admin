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
import { IPageSave } from "./IPage";
import { SAVE_PAGE } from "../../graphql/mutations/Page/savePageMutation";
import { GET_PAGES } from "../../graphql/queries/Page/getPagesQuery";
import { GET_PAGE } from "../../graphql/queries/Page/getPageQuery";
import ImageInput from "../../components/Image/ImageInput";
import ImageGallery from "../../components/Image/ImageGallery";
import { compressImage } from "../../common/helpers/compressImage";
import PageSaveDTO from "./PageSaveDTO";
import TextEditor from "../../components/Form/TextEditor";
import Select from "../../components/Form/Select";
import { SelectOption } from "../../common/interfaces/ISelect";

const EditPage: React.FC = () => {
  const { t } = useTranslation(["common", "page"]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery(GET_PAGE, {
    variables: { id },
  });

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
    initialValues: PageSaveDTO(data?.pageDetail) as IPageSave,
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
        <h1 className="text-lg font-montserrat-bold">{t("page:edit")}</h1>

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
            label={t("common:title_tm")}
            placeholder={t("common:title_tm")}
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

        <aside className="flex flex-col gap-5">
          <TextEditor
            label={t("common:text_tm")}
            value={formik.values.text?.tm}
            name="text.tm"
            handleChange={handleText}
          />

          <TextEditor
            label={t("common:text_ru")}
            value={formik.values.text?.ru}
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

export default EditPage;
