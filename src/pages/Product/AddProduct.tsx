import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React, { useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import TextField from "../../components/Form/TextField";
import Button from "../../components/Button/Button";
import { GET_PRODUCTS } from "../../graphql/queries/Product/getProductsQuery";
import { ADD_PRODUCT } from "../../graphql/mutations/Product/addProductMutation";
import { IProductSave } from "./IProduct";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextEditor from "../../components/Form/TextEditor";
import { GET_BRANDS } from "../../graphql/queries/Brand/getBrandsQuery";
import Select from "../../components/Form/Select";
import CategoryListDTO from "../Category/CategoryListDTO";
import { GET_SHORT_CATEGORY_LIST } from "../../graphql/queries/Categories/getCategoriesQuery";
import BrandListDTO from "../Brand/BrandListDTO";
import ImageGallery from "../../components/Image/ImageGallery";
import ImageInput from "../../components/Image/ImageInput";
import { compressImage } from "../../common/helpers/compressImage";
import Title from "../../components/Title/Title";

const AddProduct: React.FC = () => {
  const { t } = useTranslation(["common", "product"]);
  const navigate = useNavigate();
  const { data: brand } = useQuery(GET_BRANDS);
  const { data: category } = useQuery(GET_SHORT_CATEGORY_LIST);

  const discountTypes = [
    {
      label: t("common:select"),
      value: "",
    },
    {
      label: t("common:fix_price"),
      value: "FIX_PRICE",
    },
    {
      label: t("common:percent"),
      value: "PERCENT",
    },
  ];

  const validationSchema = () => {
    return Yup.object().shape({
      title: Yup.object().shape({
        tm: Yup.string().required(t("product:name_tm_required")),
        ru: Yup.string().required(t("product:name_ru_required")),
      }),
      code: Yup.number().required(t("product:code_required")),
      price: Yup.number().required(t("product:price_required")),
      brand_id: Yup.number().required(t("product:brand_required")),
      category_id: Yup.number().required(t("product:category_required")),
    });
  };

  const formik = useFormik({
    initialValues: {} as IProductSave,
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

  const onCompleted = () => {
    toast.success(t("common:success_saved"), { duration: 1000 }) &&
      setTimeout(() => navigate(RouteNames.products), 1000);
  };

  const onError = () =>
    toast.error(t("common:error_not_saved"), { duration: 1000 });

  const [mutate, { error, loading }] = useMutation(ADD_PRODUCT, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_PRODUCTS,
        variables: { page: 1 },
      },
    ],
  });

  const handleDescription = (data: string, name: string) => {
    formik.setFieldValue(name, data);
  };

  const handleImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;
      const { files } = e.target;
      const dataTransfer = new DataTransfer();

      // @ts-ignore
      for (const file of files) {
        if (!file.type.startsWith("image")) {
          dataTransfer.items.add(file);
          continue;
        }
        const compressedFile = await compressImage(file, {
          quality: 0.5,
          type: "image/jpeg",
        });
        dataTransfer.items.add(compressedFile);
      }
      const compressedFiles = dataTransfer.files;
      // @ts-ignore
      formik.setFieldValue("images", [...compressedFiles]);
    },
    []
  );

  return (
    <AppLayout>
      <form onSubmit={formik.handleSubmit} className="section space-y-6">
        <Title title={t("product:add")} subtitle={t("common:required_text")} />

        <aside className="flex flex-col gap-5">
          {formik.values?.images && (
            <ImageGallery images={formik.values?.images} />
          )}
          <ImageInput
            multiple
            label={t("product:images")}
            handleImage={handleImage}
          />
        </aside>

        <aside className="flex gap-5">
          <TextField
            name="title.tm"
            required
            label={t("product:title_tm")}
            placeholder={t("product:title_tm")}
            handleChange={formik.handleChange}
            hasError={Boolean(formik.errors.title?.tm)}
          />

          <TextField
            name="title.ru"
            required
            label={t("product:title_ru")}
            placeholder={t("product:title_ru")}
            handleChange={formik.handleChange}
            hasError={Boolean(formik.errors.title?.ru)}
          />
        </aside>

        <aside className="flex gap-5">
          <TextField
            name="code"
            required
            label={t("product:code")}
            placeholder={t("product:code")}
            handleChange={formik.handleChange}
            hasError={Boolean(formik.errors.code)}
          />

          <TextField
            name="price"
            label={t("product:price")}
            placeholder={t("product:price")}
            required
            handleChange={formik.handleChange}
            hasError={Boolean(formik.errors.price)}
          />

          <TextField
            type="number"
            name="discount_amount"
            label={t("product:discount_amount")}
            placeholder={t("product:discount_amount")}
            handleChange={formik.handleChange}
          />
          <Select
            name="discount_type"
            label={t("product:discount_type")}
            placeholder={t("product:discount_type")}
            handleChange={formik.handleChange}
            options={discountTypes}
          />
        </aside>

        <aside className="flex gap-5">
          <Select
            name="category_id"
            label={t("common:category")}
            placeholder={t("common:category_placeholder")}
            handleChange={formik.handleChange}
            options={CategoryListDTO(category?.categories?.data)}
          />

          <Select
            name="brand_id"
            label={t("common:brand")}
            placeholder={t("common:brand_placeholder")}
            handleChange={formik.handleChange}
            options={BrandListDTO(brand?.brands?.data)}
          />
        </aside>

        <TextEditor
          label={t("product:description_tm")}
          name="description.tm"
          handleChange={handleDescription}
        />

        <TextEditor
          label={t("product:description_ru")}
          name="description.ru"
          handleChange={handleDescription}
        />

        <footer className="flex items-center justify-end gap-3">
          <Button bg="secondary" link={RouteNames.products}>
            <p>{t("common:cancel")}</p>
          </Button>

          <Button
            type="submit"
            disabled={!(formik.dirty && formik.isValid) || loading}
          >
            {loading ? <p>{t("common:saving")}</p> : <p>{t("common:save")}</p>}
          </Button>
        </footer>
      </form>
    </AppLayout>
  );
};

export default AddProduct;
