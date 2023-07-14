import { Formik, Field, Form, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { IoKeyOutline, IoPersonOutline } from "react-icons/io5";
import { useMutation } from "@apollo/client";
import { _LOGIN } from "../../graphql/mutations/Auth/LoginMutation";
import { ILogin } from "../../common/interfaces/User/ILogin";
import { Navigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import React, { useContext, useEffect } from "react";
import { RouteNames } from "../../router/routing";
import { IAuthContext } from "../../common/interfaces/IAuthContext";
import { AuthContext } from "../../components/Provider/AuthProvider";
import Cookies from "js-cookie";
import { IUser } from "../../common/interfaces/User/IUser";
import Button from "../../components/Button/Button";
import Logo from "../../components/Header/Logo";

interface IData {
  login: IUser;
}

const Login: React.FC = () => {
  const { t } = useTranslation(["auth"]);

  const showError = () => {
    toast.error("Username or password invald", { duration: 2000 });
  };

  const onCompleted = (data: IData) => {
    if (data?.login?.token) {
      Cookies.set("access_token", data.login.token);
      setUserData(data.login);
      setIsAuth(true);
      toast.success("success");
    }
  };
  const [login, { data, error }] = useMutation(_LOGIN, {
    onCompleted,
    onError: () => {
      toast.error(error?.message || "Unknown error");
    },
  });

  const { isAuth, setUserData, setIsAuth } = useContext(
    AuthContext
  ) as IAuthContext;

  const { state } = useLocation() as any;
  const from = state?.from || RouteNames.home;

  useEffect(() => {
    if (!!Cookies.get("access_token")) setIsAuth(true);
  }, []);

  // if (isAuth) window.location.replace(from) return <></>;
  if (isAuth) return <Navigate to={from} />;
  return (
    <section className="flex items-center justify-center h-screen bg-slate-50 font-montserrat-medium">
      <Toaster />
      <Formik
        initialValues={{
          phone: "",
          password: "",
        }}
        onSubmit={(
          values: ILogin,
          { setSubmitting }: FormikHelpers<ILogin>
        ) => {
          setTimeout(() => {
            login({
              variables: { phone: values.phone, password: values.password },
            }).then(
              (res) =>
                res.data?.login.token != null && window.location.replace(from)
            );
            setSubmitting(false);
          }, 500);
        }}
      >
        <section className="flex flex-col gap-10">
          <Logo size="lg" />

          <Form className="flex flex-col bg-white w-96 rounded-xl shadow-lg shadow-slate-200 p-8">
            {data && data.login === null
              ? showError()
              : data && setUserData(data.login)}

            <div className="flex items-center group-focus:border-slate-600 border border-slate-200/50 rounded-xl overflow-hidden mb-5">
              <label
                htmlFor="phone_login"
                className="text-slate-500 pl-4 pr-1.5"
              >
                <IoPersonOutline size={20} />
              </label>
              <Field
                className="w-full focus:outline-none group placeholder:text-slate-400 p-3"
                id="phone_login"
                type="text"
                name="phone"
                placeholder={t("auth:phone")}
              />
            </div>

            <div className="flex items-center border border-slate-200/50 rounded-xl overflow-hidden mb-5">
              <label htmlFor="password" className="text-slate-500 pl-4 pr-1.5">
                <IoKeyOutline size={20} />
              </label>
              <Field
                className="w-full focus:outline-none placeholder:text-slate-400 p-3"
                id="password"
                type="password"
                name="password"
                placeholder={t("auth:password")}
              />
            </div>

            <Button type="submit">
              <p>{t("auth:sign_in")}</p>
            </Button>
          </Form>
        </section>
      </Formik>
    </section>
  );
};

export default Login;
