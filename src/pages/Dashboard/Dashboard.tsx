import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { gql, useQuery } from "@apollo/client";
import { navRoutes } from "../../router/routing";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const _TOTALS = gql`
    query GetAll {
      ${navRoutes.map((r) => {
        if (r.is_main)
          return `
          ${r.queryTotal}
        
        `;
        else return "\n";
      })}
    }
  `;

  const { data } = useQuery(_TOTALS);
  const bgClasses = [
    "bg-sky-200/50",
    "bg-green-200/50",
    "bg-red-200/50",
    "bg-orange-200/50",
    "bg-teal-200/50",
  ];
  var count = 0;
  const returnTotal = (query: string | undefined) => {
    if (!query) return 0;
    var name = query.split("(")[0].replaceAll("\n", "").replaceAll(" ", "");
    if (data && name && data[name]) {
      return data[name].paginatorInfo.total;
    } else return 0;
  };
  return (
    <AppLayout>
      <section className="xl:p-5">
        <main className="bg-white bg grid grid-cols-12 gap-6 rounded-xl p-5">
          {navRoutes.map((route, index) => {
            if (index === 0) count = -1;
            if (!route.is_main) return <></>;
            count++;
            return (
              <NavLink
                key={route.path + index}
                to={route.path}
                className={`col-span-12 xl:col-span-4 flex  items-center justify-between ${bgClasses[count]}  text-sky-900/80 p-4 rounded-2xl hover:scale-105 duration-500`}
              >
                <aside className="flex items-center px-2">
                  <route.icon size={48} />
                  <div className="flex flex-col p-3">
                    <h1 className="text-xl font-montserrat-bold">
                      {t(route.title)}
                    </h1>
                    <small className="mt-2">
                      {" "}
                      {t("total")}: {returnTotal(route.queryTotal)}{" "}
                    </small>
                  </div>
                </aside>
                {/* <div className="bg-white text-center px-6 py-4 rounded-3xl">
                  <h3 className="font-bold text-lg">+0</h3>
                  <small className="text-xs">{t("new")}</small>
                </div> */}
              </NavLink>
            );
          })}
        </main>
      </section>
    </AppLayout>
  );
};

export default Dashboard;
