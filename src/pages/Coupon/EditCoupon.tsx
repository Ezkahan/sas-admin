import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import TextField from "../../components/Form/TextField";
import { SAVE_COUPON } from "../../graphql/mutations/Coupon/saveCouponMutation";
import { GET_COUPONS } from "../../graphql/queries/Coupon/getCouponsQuery";
import Button from "../../components/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ICouponAdd } from "./ICoupon";
import Title from "../../components/Title/Title";
import Select from "../../components/Form/Select";
import { GET_COUPON } from "../../graphql/queries/Coupon/getCouponQuery";
import CouponSaveDTO from "./CouponSaveDTO";

const EditCoupon: React.FC = () => {
  const { t } = useTranslation(["common", "coupon"]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: couponData } = useQuery(GET_COUPON, {
    variables: { id },
  });

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

  const types = [
    {
      label: t("common:select"),
      value: "",
    },
    {
      label: t("common:cart"),
      value: "CART",
    },
    {
      label: t("common:delivery"),
      value: "DELIVERY",
    },
  ];

  const onCompleted = () => {
    toast.success(t("common:success_saved"), { duration: 1000 }) &&
      setTimeout(() => navigate(RouteNames.coupon), 1000);
  };

  const onError = () =>
    toast.error(t("common:error_not_saved"), { duration: 1000 });

  const [mutate, { loading }] = useMutation(SAVE_COUPON, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_COUPONS,
        variables: { page: 1 },
      },
    ],
  });

  const validationSchema = () => {
    return Yup.object().shape({
      title: Yup.object().shape({
        tm: Yup.string().required(t("coupon:title_tm_required")),
        ru: Yup.string().required(t("coupon:title_ru_required")),
      }),
      discount: Yup.number().required(t("coupon:discount_required")),
      discount_type: Yup.string().required(t("coupon:discount_type_required")),
      expires_at: Yup.date().required(t("coupon:expires_at_required")),
      type: Yup.string().required(t("coupon:type_required")),
    });
  };

  const formik = useFormik({
    initialValues: CouponSaveDTO(couponData?.coupon),
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate({
        variables: {
          ...values,
          id,
          title: JSON.stringify(values.title),
          expires_at: new Date(values.expires_at),
        },
      });
    },
  });

  return (
    <AppLayout>
      <form onSubmit={formik.handleSubmit} className="section space-y-6">
        <Title title={t("coupon:edit")} subtitle={t("common:required_text")} />

        <aside className="flex gap-5">
          <TextField
            name="title.tm"
            label={t("coupon:title_tm_required")}
            placeholder={t("coupon:title_tm_required")}
            handleChange={formik.handleChange}
            required
            hasError={Boolean(formik.errors.title?.tm)}
            defaultValue={formik.values.title.tm}
          />
          <TextField
            name="title.ru"
            label={t("coupon:title_ru_required")}
            placeholder={t("coupon:title_ru_required")}
            handleChange={formik.handleChange}
            required
            hasError={Boolean(formik.errors.title?.ru)}
            defaultValue={formik.values.title.ru}
          />
        </aside>

        <aside className="flex gap-5">
          <TextField
            name="discount"
            type="number"
            label={t("coupon:discount_required")}
            placeholder={t("coupon:discount_required")}
            handleChange={formik.handleChange}
            required
            hasError={Boolean(formik.errors.discount)}
            defaultValue={formik.values.discount}
          />

          <Select
            name="discount_type"
            label={t("common:discount_type")}
            placeholder={t("common:discount_type")}
            handleChange={formik.handleChange}
            options={discountTypes}
            selected_value={formik.values.discount_type}
          />
        </aside>

        <aside className="flex gap-5">
          <Select
            name="type"
            label={t("common:type")}
            placeholder={t("common:type")}
            handleChange={formik.handleChange}
            options={types}
            selected_value={formik.values.type}
          />

          <TextField
            name="expires_at"
            label={t("coupon:expires_at")}
            placeholder={t("coupon:expires_at")}
            type={"datetime-local"}
            handleChange={formik.handleChange}
            required
            hasError={Boolean(formik.errors.expires_at)}
            defaultValue={formik.values.expires_at}
          />
        </aside>

        <footer className="flex items-center justify-end gap-3">
          <Button bg="secondary" link={RouteNames.coupon}>
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

export default EditCoupon;
