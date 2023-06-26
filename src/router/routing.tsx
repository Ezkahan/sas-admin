import React from "react";
import {
  IoCartOutline,
  IoGridOutline,
  IoImageOutline,
  IoListOutline,
  IoNewspaperOutline,
  IoNotificationsOutline,
  IoPeopleOutline,
  IoSettingsOutline,
  IoStarOutline,
  IoTicketOutline,
} from "react-icons/io5";
import AddProduct from "../pages/Product/AddProduct";
import Products from "../pages/Product/Products";

const Banners = React.lazy(() => import("../pages/Banner/Banners"));
const AddBanner = React.lazy(() => import("../pages/Banner/AddBanner"));
const Brands = React.lazy(() => import("../pages/Brand/Brands"));
const AddBrand = React.lazy(() => import("../pages/Brand/AddBrand"));
const Categories = React.lazy(() => import("../pages/Category/Categories"));
const AddCategory = React.lazy(() => import("../pages/Category/AddCategory"));
const EditCategory = React.lazy(() => import("../pages/Category/EditCategory"));
const News = React.lazy(() => import("../pages/News/News"));
const NewsCreate = React.lazy(() => import("../pages/News/CreateNews"));
const NewsDetail = React.lazy(() => import("../pages/News/ShowNews"));
const Coupons = React.lazy(() => import("../pages/Coupon/Coupons"));
const CouponCreate = React.lazy(() => import("../pages/Coupon/CreateCoupon"));
const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard"));
const Login = React.lazy(() => import("../pages/Auth/Login"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Forbidden = React.lazy(() => import("../pages/Forbidden"));

const RouteNames = {
  home: "/",
  banner: "/banner",
  bannerDetail: "/banner/",
  addBanner: "/banner/add",
  brand: "/brand",
  addBrand: "/brand/add",
  category: "/category",
  addCategory: "/category/add",
  editCategory: "/category/:id/edit",
  coupon: "/coupon",
  couponCreate: "/coupon/create",
  news: "/news",
  newsCreate: "/news/create",
  newsDetail: "/news/:id",
  users: "/users",
  products: "/products",
  addProduct: "/product/add",
  editProduct: "/product/:id/edit",
  profile: "/user/profile",
  login: "/auth/login",
  register: "/auth/register",
  settings: "/settings",
  notifications: "/notifications",
  forbidden: "/403",
  notFound: "*",
};

export interface IRoute {
  element: any;
  private: boolean;
  priority: number;
  path: string;
  nav?: INavRoute;
}

export interface INavRoute {
  id: number;
  icon: any;
  is_main?: boolean;
  title: string;
  path: string;
  queryTotal?: string;
}

const navRoutes: INavRoute[] = [
  { id: 0, path: RouteNames.home, title: "Baş menýu", icon: IoGridOutline },
  {
    id: 1,
    path: RouteNames.banner,
    title: "Bannerler",
    icon: IoImageOutline,
    is_main: true,
    queryTotal: `
      banners(first: 10) {
        paginatorInfo {
          total
        }
      }
    `,
  },
  {
    id: 2,
    path: RouteNames.brand,
    title: "Brendler",
    icon: IoStarOutline,
    is_main: true,
    queryTotal: `
      brands(first: 10) {
        paginatorInfo {
          total
        }
      }
    `,
  },
  {
    id: 3,
    path: RouteNames.category,
    title: "Kategoriýalar",
    icon: IoListOutline,
    queryTotal: `
      categories(first: 10) {
        paginatorInfo {
          total
        }
      }
    `,
  },
  {
    id: 4,
    path: RouteNames.coupon,
    title: "Kuponlar",
    icon: IoTicketOutline,
    is_main: true,
    queryTotal: `
      coupons(first: 10) {
        paginatorInfo {
          total
        }
      }
    `,
  },
  {
    id: 5,
    path: RouteNames.news,
    title: "Habarlar",
    icon: IoNewspaperOutline,
    is_main: true,
    queryTotal: `
      news(first: 10) {
        paginatorInfo {
          total
        }
      }
    `,
  },
  {
    id: 6,
    path: RouteNames.products,
    title: "Harytlar",
    icon: IoCartOutline,
    queryTotal: `
      news(first: 10) {
        paginatorInfo {
          total
        }
      }
    `,
  },
  { id: 7, path: RouteNames.users, title: "Ulanyjylar", icon: IoPeopleOutline },
  {
    id: 8,
    path: RouteNames.notifications,
    title: "Bildirişler",
    icon: IoNotificationsOutline,
  },
  {
    id: 9,
    path: RouteNames.settings,
    title: "Sazlamalar",
    icon: IoSettingsOutline,
  },
];

const routing: IRoute[] = [
  { path: RouteNames.login, private: false, priority: 5, element: Login },
  {
    path: RouteNames.home,
    private: true,
    priority: 5,
    element: Dashboard,
    nav: navRoutes[0],
  },
  {
    path: RouteNames.banner,
    private: true,
    priority: 5,
    element: Banners,
    nav: navRoutes[1],
  },
  {
    path: RouteNames.addBanner,
    private: true,
    priority: 5,
    element: AddBanner,
  },
  {
    path: RouteNames.brand,
    private: true,
    priority: 5,
    element: Brands,
    nav: navRoutes[2],
  },
  {
    path: RouteNames.addBrand,
    private: true,
    priority: 5,
    element: AddBrand,
  },
  {
    path: RouteNames.category,
    private: true,
    priority: 5,
    element: Categories,
    nav: navRoutes[3],
  },
  {
    path: RouteNames.addCategory,
    private: true,
    priority: 5,
    element: AddCategory,
  },
  {
    path: RouteNames.editCategory,
    private: true,
    priority: 5,
    element: EditCategory,
  },
  {
    path: RouteNames.coupon,
    private: true,
    priority: 5,
    element: Coupons,
    nav: navRoutes[4],
  },
  {
    path: RouteNames.products,
    private: true,
    priority: 5,
    element: Products,
  },
  {
    path: RouteNames.addProduct,
    private: true,
    priority: 5,
    element: AddProduct,
  },
  {
    path: RouteNames.editProduct,
    private: true,
    priority: 5,
    element: AddProduct,
  },
  {
    path: RouteNames.couponCreate,
    private: true,
    priority: 5,
    element: CouponCreate,
  },
  {
    path: RouteNames.products,
    private: true,
    priority: 5,
    element: Products,
  },
  {
    path: RouteNames.addProduct,
    private: true,
    priority: 5,
    element: AddProduct,
  },
  {
    path: RouteNames.news,
    private: true,
    priority: 5,
    element: News,
    nav: navRoutes[5],
  },
  {
    path: RouteNames.newsCreate,
    private: true,
    priority: 5,
    element: NewsCreate,
  },
  {
    path: RouteNames.newsDetail + ":id",
    private: true,
    priority: 5,
    element: NewsDetail,
  },
  {
    path: RouteNames.forbidden,
    private: true,
    priority: 1,
    element: Forbidden,
  },
  { path: RouteNames.notFound, private: true, priority: 5, element: NotFound },
];

export { RouteNames, routing, navRoutes };
