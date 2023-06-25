import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import TextField from "../../components/common/Form/TextField";
import ImageEditor from "../../components/common/Form/ImageEditor";
import Button from "../../components/Button/Button";
import { GET_PRODUCTS } from "../../graphql/queries/Product/getProductsQuery";
import { ADD_PRODUCT } from "../../graphql/mutations/Product/addProductMutation";
import { IProduct } from "./IProduct";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddProduct: React.FC = () => {
  const { t } = useTranslation(["common", "product"]);
  const navigate = useNavigate();
  const initialValues: IProduct = {} as IProduct;

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
    initialValues,
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

  const [mutate] = useMutation(ADD_PRODUCT, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_PRODUCTS,
        variables: { page: 1 },
      },
    ],
  });

  const handleCroppedImage = (reader: FileReader) =>
    formik.setFieldValue("cropped_image", reader.result);

  const handleFile = (files: FileList | null) =>
    formik.setFieldValue("image", files?.[0]);

  return (
    <AppLayout>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white px-5 py-3 my-3 rounded-lg"
      >
        <h1 className="text-lg font-montserrat-bold">{t("product:add")}</h1>

        <aside className="mt-5 mb-8">
          <ImageEditor
            handleFile={handleFile}
            handleCroppedImage={handleCroppedImage}
            label={t("product:select_image")}
          />
        </aside>

        <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
          <TextField
            name="title.tm"
            lang="tm"
            required
            label={t("product:title_tm")}
            placeholder={t("product:title_tm")}
            handleChange={formik.handleChange}
          />

          <TextField
            name="title.ru"
            lang="ru"
            required
            label={t("product:title_ru")}
            placeholder={t("product:title_ru")}
            handleChange={formik.handleChange}
          />
        </aside>

        {/* <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
          <div className="col-span-6">
            <TextEditor
              label="Description"
              required
              lang="tm"
              handleChange={(text: string) => {
                setProduct({
                  ...product,
                  description: text,
                });
              }}
            />
          </div>
          <div className="col-span-6">
            <TextEditor
              label="Description"
              required
              handleChange={(text: string) => {
                setProduct({
                  ...product,
                  description: text,
                });
              }}
            />
          </div>
        </aside> */}

        <footer className="flex items-center justify-end gap-3">
          <Button bg="secondary" link={RouteNames.category}>
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

export default AddProduct;
