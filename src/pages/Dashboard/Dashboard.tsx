import { useTranslation } from "react-i18next";
import AppLayout from "../../layouts/AppLayout";
import { useQuery } from "@apollo/client";
import { GET_TOTALS } from "../../graphql/queries/Dashboard/TotalQuery";
import { NavLink } from "react-router-dom";
import {
  IoImageOutline,
  IoListOutline,
  IoNewspaperOutline,
  IoStarOutline,
  IoTicketOutline,
} from "react-icons/io5";

const Dashboard: React.FC = () => {
  const { t } = useTranslation(["common"]);
  const { data } = useQuery(GET_TOTALS);

  const bgClasses = {
    banners: "bg-sky-200/50",
    brands: "bg-green-200/50",
    news: "bg-red-200/50",
    coupons: "bg-orange-200/50",
    categories: "bg-teal-200/50",
  };

  const icons = {
    banners: <IoImageOutline size={48} />,
    brands: <IoStarOutline size={48} />,
    coupons: <IoTicketOutline size={48} />,
    news: <IoNewspaperOutline size={48} />,
    categories: <IoListOutline size={48} />,
  };

  return (
    <AppLayout>
      <main className="bg-white flex flex-wrap gap-4 justify-between rounded-xl p-5">
        {data &&
          Object.keys(data).map((key) => {
            return (
              <NavLink
                key={key}
                to={`/${key}`}
                className={`flex items-center justify-between ${
                  bgClasses[key as keyof typeof bgClasses]
                }  text-sky-900/80 xl:px-8 xl:py-4 px-5 py-3 rounded-2xl hover:scale-105 duration-500`}
              >
                <aside className="flex items-center px-2">
                  {icons[key as keyof typeof icons]}
                  <div className="flex flex-col p-3">
                    <h1 className="text-xl font-montserrat-bold">
                      {t(`common:${key}`)}
                    </h1>
                    <small className="mt-2">
                      {t("common:total")}:{data[key]?.paginatorInfo?.total ?? 0}
                    </small>
                  </div>
                </aside>
              </NavLink>
            );
          })}
      </main>
    </AppLayout>
  );
};

export default Dashboard;
