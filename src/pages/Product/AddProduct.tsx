import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import TextField from "../../components/common/Form/TextField";
import Button from "../../components/Button/Button";
import { GET_PRODUCTS } from "../../graphql/queries/Product/getProductsQuery";
import { ADD_PRODUCT } from "../../graphql/mutations/Product/addProductMutation";
import { IProduct } from "./IProduct";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextEditor from "../../components/common/Form/TextEditor";

const AddProduct: React.FC = () => {
  const { t } = useTranslation(["common", "product"]);
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
    initialValues: {} as IProduct,
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

  return (
    <AppLayout>
      <form onSubmit={formik.handleSubmit} className="section space-y-6">
        <h1 className="text-lg font-montserrat-bold">{t("product:add")}</h1>

        <aside className="flex gap-5">
          <TextField
            name="title.tm"
            required
            label={t("product:title_tm")}
            placeholder={t("product:title_tm")}
            handleChange={formik.handleChange}
          />

          <TextField
            name="title.ru"
            required
            label={t("product:title_ru")}
            placeholder={t("product:title_ru")}
            handleChange={formik.handleChange}
          />
        </aside>

        <aside className="flex gap-5">
          <TextField
            name="code"
            required
            label={t("product:code")}
            placeholder={t("product:code")}
            handleChange={formik.handleChange}
          />

          <TextField
            name="price"
            required
            label={t("product:price")}
            placeholder={t("product:price")}
            handleChange={formik.handleChange}
          />

          <TextField
            name="percent"
            required
            label={t("product:percent")}
            placeholder={t("product:percent")}
            handleChange={formik.handleChange}
          />
        </aside>

        <TextEditor
          label={t("product:description")}
          required
          handleChange={formik.handleChange}
        />

        <footer className="flex items-center justify-end gap-3">
          <Button bg="secondary" link={RouteNames.products}>
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

// title: JSON
// description: JSON
// code: String
// brand_id: ID
// category_id: ID
// price: String
// percent: String
// in_stock: Boolean
// status: Boolean
