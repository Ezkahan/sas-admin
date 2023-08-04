import React from "react";
import {
  IoCartOutline,
  IoDocumentOutline,
  IoGridOutline,
  IoImageOutline,
  IoListOutline,
  IoNewspaperOutline,
  // IoNotificationsOutline,
  IoPeopleOutline,
  IoReceiptOutline,
  IoSettingsOutline,
  IoShirtOutline,
  IoStarOutline,
  IoTicketOutline,
} from "react-icons/io5";

const AddProduct = React.lazy(() => import("../pages/Product/AddProduct"));
const Products = React.lazy(() => import("../pages/Product/Products"));
const Banners = React.lazy(() => import("../pages/Banner/Banners"));
const AddBanner = React.lazy(() => import("../pages/Banner/AddBanner"));
const Brands = React.lazy(() => import("../pages/Brand/Brands"));
const AddBrand = React.lazy(() => import("../pages/Brand/AddBrand"));
const EditBrand = React.lazy(() => import("../pages/Brand/EditBrand"));
const Categories = React.lazy(() => import("../pages/Category/Categories"));
const AddCategory = React.lazy(() => import("../pages/Category/AddCategory"));
const EditCategory = React.lazy(() => import("../pages/Category/EditCategory"));
const News = React.lazy(() => import("../pages/News/News"));
const AddNews = React.lazy(() => import("../pages/News/AddNews"));
const EditNews = React.lazy(() => import("../pages/News/EditNews"));
const NewsDetail = React.lazy(() => import("../pages/News/Show"));
const Coupons = React.lazy(() => import("../pages/Coupon/Coupons"));
const AddCoupon = React.lazy(() => import("../pages/Coupon/AddCoupon"));
const EditCoupon = React.lazy(() => import("../pages/Coupon/EditCoupon"));
const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard"));
const Login = React.lazy(() => import("../pages/Auth/Login"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Settings = React.lazy(() => import("../pages/Setting/Settings"));
const Users = React.lazy(() => import("../pages/User/Users"));
const UserAddresses = React.lazy(() => import("../pages/User/UserAddresses"));
const Orders = React.lazy(() => import("../pages/Order/Orders"));
const Order = React.lazy(() => import("../pages/Order/Order"));
const Documentation = React.lazy(
  () => import("../pages/Documentation/Documentation")
);
const AddDocumentation = React.lazy(
  () => import("../pages/Documentation/AddDocumentation")
);
const EditDocumentation = React.lazy(
  () => import("../pages/Documentation/EditDocumentation")
);
const NotificationPage = React.lazy(
  () => import("../pages/Notification/NotificationPage")
);
const PagesPage = React.lazy(() => import("../pages/Page/Pages"));
const AddPage = React.lazy(() => import("../pages/Page/AddPage"));
const EditPage = React.lazy(() => import("../pages/Page/EditPage"));
const Forbidden = React.lazy(() => import("../pages/Forbidden"));

const RouteNames = {
  home: "/",
  banner: "/banners",
  bannerDetail: "/banners/",
  addBanner: "/banners/add",
  brand: "/brands",
  addBrand: "/brands/add",
  editBrand: "/brands/:id/edit",
  category: "/categories",
  addCategory: "/categories/add",
  editCategory: "/categories/:id/edit",
  coupon: "/coupons",
  addCoupon: "/coupons/add",
  editCoupon: "/coupons/:id/edit",
  news: "/news",
  addNews: "/news/add",
  newsDetail: "/news/:id",
  editNews: "/news/:id/edit",
  users: "/users",
  userAddresses: "/users/:id/addresses",
  products: "/products",
  addProduct: "/product/add",
  editProduct: "/product/:id/edit",
  profile: "/user/profile",
  documentation: "/documentation",
  addDocumentation: "/documentation/add",
  editDocumentation: "/documentation/:id/edit",
  login: "/auth/login",
  register: "/auth/register",
  settings: "/settings",
  notifications: "/notifications",
  orders: "/orders",
  order: "/orders/:id",
  pages: "/pages",
  addPage: "/pages/add",
  editPage: "/pages/:id/edit",
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
    title: "common:banners",
    icon: IoImageOutline,
  },
  {
    id: 2,
    path: RouteNames.brand,
    title: "common:brands",
    icon: IoStarOutline,
  },
  {
    id: 3,
    path: RouteNames.category,
    title: "common:categories",
    icon: IoListOutline,
  },
  {
    id: 4,
    path: RouteNames.coupon,
    title: "common:coupons",
    icon: IoTicketOutline,
  },
  {
    id: 5,
    path: RouteNames.news,
    title: "common:news",
    icon: IoNewspaperOutline,
  },
  {
    id: 5,
    path: RouteNames.documentation,
    title: "common:documentation",
    icon: IoReceiptOutline,
  },
  {
    id: 6,
    path: RouteNames.products,
    title: "common:products",
    icon: IoShirtOutline,
  },
  {
    id: 7,
    path: RouteNames.orders,
    title: "common:orders",
    icon: IoCartOutline,
  },
  {
    id: 8,
    path: RouteNames.users,
    title: "common:users",
    icon: IoPeopleOutline,
  },
  {
    id: 8,
    path: RouteNames.pages,
    title: "common:pages",
    icon: IoDocumentOutline,
  },
  // {
  //   id: 9,
  //   path: RouteNames.notifications,
  //   title: "common:notifications",
  //   icon: IoNotificationsOutline,
  // },
  {
    id: 10,
    path: RouteNames.settings,
    title: "common:settings",
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
    path: RouteNames.editBrand,
    private: true,
    priority: 5,
    element: EditBrand,
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
    path: RouteNames.addCoupon,
    private: true,
    priority: 5,
    element: AddCoupon,
  },
  {
    path: RouteNames.editCoupon,
    private: true,
    priority: 5,
    element: EditCoupon,
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
    path: RouteNames.addNews,
    private: true,
    priority: 5,
    element: AddNews,
  },
  {
    path: RouteNames.newsDetail + ":id",
    private: true,
    priority: 5,
    element: NewsDetail,
  },

  {
    path: RouteNames.editNews,
    private: true,
    priority: 5,
    element: EditNews,
  },
  {
    path: RouteNames.settings,
    private: true,
    priority: 5,
    element: Settings,
  },
  {
    path: RouteNames.notifications,
    private: true,
    priority: 5,
    element: NotificationPage,
  },
  {
    path: RouteNames.users,
    private: true,
    priority: 5,
    element: Users,
  },
  {
    path: RouteNames.userAddresses,
    private: true,
    priority: 5,
    element: UserAddresses,
  },
  {
    path: RouteNames.orders,
    private: true,
    priority: 5,
    element: Orders,
  },
  {
    path: RouteNames.order,
    private: true,
    priority: 5,
    element: Order,
  },
  {
    path: RouteNames.documentation,
    private: true,
    priority: 5,
    element: Documentation,
  },
  {
    path: RouteNames.addDocumentation,
    private: true,
    priority: 5,
    element: AddDocumentation,
  },
  {
    path: RouteNames.editDocumentation,
    private: true,
    priority: 5,
    element: EditDocumentation,
  },
  {
    path: RouteNames.pages,
    private: true,
    priority: 5,
    element: PagesPage,
  },
  {
    path: RouteNames.addPage,
    private: true,
    priority: 5,
    element: AddPage,
  },
  {
    path: RouteNames.editPage,
    private: true,
    priority: 5,
    element: EditPage,
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
