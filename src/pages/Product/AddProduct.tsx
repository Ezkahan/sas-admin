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
import { IProduct } from "./IProduct";
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

const AddProduct: React.FC = () => {
  const { t } = useTranslation(["common", "product"]);
  const navigate = useNavigate();
  const { data: brand } = useQuery(GET_BRANDS);
  const { data: category } = useQuery(GET_SHORT_CATEGORY_LIST);

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
      price: Yup.number().required(t("product:price_required")),
      brand_id: Yup.number().required(t("product:brand_required")),
      category_id: Yup.number().required(t("product:category_required")),
    });
  };

  const formik = useFormik({
    initialValues: {} as IProduct,
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
    toast.success(t("common:success_saved"), { duration: 500 }) &&
      setTimeout(() => navigate(RouteNames.products), 500);
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

  const handleDescription = (data: string, name: string) => {
    formik.setFieldValue(name, data);
  };

  const handleImage = useCallback(async (files: FileList | null) => {
    if (!files?.length) return;
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
    files = dataTransfer.files;
    // @ts-ignore
    formik.setFieldValue("images", [...files]);
  }, []);

  return (
    <AppLayout>
      <form onSubmit={formik.handleSubmit} className="section space-y-6">
        <h1 className="text-lg font-montserrat-bold">{t("product:add")}</h1>

        <aside className="flex flex-col gap-5">
          {formik.values.images && (
            <ImageGallery images={formik.values.images} />
          )}
          <ImageInput label={t("product:images")} handleImage={handleImage} />
        </aside>

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
          required
          name="description.tm"
          handleChange={handleDescription}
        />

        <TextEditor
          label={t("product:description_ru")}
          required
          name="description.ru"
          handleChange={handleDescription}
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
