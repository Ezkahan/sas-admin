import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import TextField from "../../components/common/Form/TextField";
import { ICouponCreate } from "../../common/interfaces/Coupon/ICouponCreate";
import { CREATE_COUPON } from "../../graphql/mutations/Coupon/createCouponMutation";
import { GET_COUPONS } from "../../graphql/queries/Coupon/getCouponsQuery";
import NavigateBack from "../../components/Core/NavigateBack";

const CreateCoupon: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState<ICouponCreate>({
    title_tm: "",
    title_ru: "",
    promo_price: 0,
    started_at: "",
    ended_at: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCoupon({
      ...coupon,
      [e.target.name]: e.target.value,
    });
  };

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate(RouteNames.coupon), 2000);
  };

  const [createCoupon] = useMutation(CREATE_COUPON, {
    onCompleted,
    onError: () => toast.error(t("error_not_saved"), { duration: 2000 }),
    refetchQueries: [
      {
        query: GET_COUPONS,
        variables: { page: 1 },
      },
    ],
  });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      Number(new Date(coupon.started_at)) - Number(new Date(coupon.ended_at)) >
      0
    ) {
      toast.error("Check date range");
      return;
    } else {
      createCoupon({
        variables: {
          title: JSON.stringify({
            tm: coupon.title_tm,
            ru:
              coupon.title_ru && coupon.title_ru.length > 0
                ? coupon.title_ru
                : coupon.title_tm,
          }),
          promo_price: Number(coupon.promo_price),
          started_at:
            coupon.started_at.split("T")[0] +
            " " +
            coupon.started_at.split("T")[1] +
            ":00",
          ended_at:
            coupon.ended_at.split("T")[0] +
            " " +
            coupon.ended_at.split("T")[1] +
            ":00",
        },
      });
    }
  };

  return (
    <AppLayout>
      <section className="xl:p-5 p-1">
        <form
          onSubmit={(e) => onSubmit(e)}
          className="bg-white xl:px-8 px-5 xl:py-6 py-4 xl:my-5 my-3 rounded-lg"
        >
          <NavigateBack backPath={RouteNames.coupon} />

          <h1 className="text-lg font-montserrat-bold">New coupon</h1>

          <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
            <TextField
              name="title_tm"
              label="Title"
              withLocale
              lang="tm"
              required
              placeholder="Input title"
              handleChange={handleChange}
            />
            <TextField
              withLocale
              name="title"
              label="Title"
              placeholder="Input title"
              handleChange={handleChange}
            />
          </aside>
          <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
            <TextField
              name="promo_price"
              label="Promo price"
              required
              type="number"
              placeholder="Input promo price"
              handleChange={handleChange}
            />
          </aside>

          <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
            <TextField
              name="started_at"
              label="Started at"
              required
              type={"datetime-local"}
              placeholder="Input started at"
              handleChange={handleChange}
            />
            <TextField
              name="ended_at"
              label="Ended at"
              required
              type={"datetime-local"}
              placeholder="Input ended at"
              handleChange={handleChange}
            />
          </aside>

          <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-montserrat-bold px-6 py-2.5 border border-indigo-600 duration-300 rounded-lg">
            {t("save")}
          </button>
          <NavLink
            to={RouteNames.coupon}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 font-montserrat-bold px-6 py-3 duration-300 rounded-lg ml-10"
          >
            {t("cancel")}
          </NavLink>
        </form>
      </section>
    </AppLayout>
  );
};

export default CreateCoupon;
