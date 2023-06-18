import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";

const Banners = React.lazy(() => import("../pages/Banner/Banners"));
const AddBanner = React.lazy(() => import("../pages/Banner/AddBanner"));
const Brands = React.lazy(() => import("../pages/Brand/Brands"));
const AddBrand = React.lazy(() => import("../pages/Brand/AddBrand"));
const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

export interface IRoute {
  element: any;
  private: boolean;
  path: string;
  name: string;
  icon?: any;
}

export const routes: IRoute[] = [
  {
    path: "/",
    private: true,
    element: Home,
    name: "Home",
  },
  // {
  //   path: "login",
  //   private: true,
  //   element: Login,
  //   name: "Login",
  // },
  // {
  //   path: "banner",
  //   private: true,
  //   element: Banners,
  //   name: "Banners",
  // },
  // {
  //   path: "banner/add",
  //   private: true,
  //   element: AddBanner,
  //   name: "Banner add",
  // },
  // {
  //   path: "brand",
  //   private: true,
  //   element: Brands,
  //   name: "Brands",
  // },
  // {
  //   path: "brand/add",
  //   private: true,
  //   element: AddBrand,
  //   name: "Brand add",
  // },
  // {
  //   path: "category",
  //   private: true,
  //   element: Categories,
  //   name: "Categories",
  // },
  // {
  //   path: "category/add",
  //   private: true,
  //   element: AddCategory,
  //   name: "Category add",
  // },
  // {
  //   path: "category/:id/edit",
  //   private: true,
  //   element: CategoryEdit,
  //   name: "Category edit",
  // },
  // {
  //   path: "coupon",
  //   private: true,
  //   element: Coupons,
  //   name: "Coupons",
  // },
  // {
  //   path: "coupon/add",
  //   private: true,
  //   element: AddCoupon,
  //   name: "Coupon add",
  // },
  // {
  //   path: "news",
  //   private: true,
  //   element: News,
  //   name: "News",
  // },
  // {
  //   path: "news/add",
  //   private: true,
  //   element: AddNews,
  //   name: "News add",
  // },
  // {
  //   path: "news/:id",
  //   private: true,
  //   element: NewsDetail,
  //   name: "News detail",
  // },
  // {
  //   path: "forbidden",
  //   private: true,
  //   element: Forbidden,
  //   name: "Forbidden",
  // },
  // {
  //   path: "*",
  //   private: true,
  //   element: NotFound,
  //   name: "NotFound",
  // },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: Dashboard,
    errorElement: <ErrorPage />,
  },
]);

export default router;
