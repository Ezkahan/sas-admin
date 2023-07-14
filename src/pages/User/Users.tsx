import { useQuery } from "@apollo/client";
import MiniLoader from "../../components/Loader/MiniLoader";
import Paginate from "../../components/Paginate/Paginate";
import AppLayout from "../../layouts/AppLayout";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { RouteNames } from "../../router/routing";
import Title from "../../components/Title/Title";
import { GET_USERS } from "../../graphql/queries/User/getUsersQuery";
import { IUser } from "../../common/interfaces/User/IUser";
import { NavLink } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";

const Users = () => {
  const { t } = useTranslation(["common", "user"]);
  const [page, setPage] = useState<number>(1);
  const onError = () => toast.error(t("error_not_loaded"), { duration: 2000 });

  const { loading, data } = useQuery(GET_USERS, {
    variables: { page },
    onError,
  });

  return (
    <AppLayout>
      <>
        <main className="section">
          <header className="flex justify-between items-center mb-5">
            <Title
              title={t("user:title")}
              subtitle={`${t("common:total")}: ${
                data?.users?.paginatorInfo?.total
              }`}
            />
          </header>

          {loading && <MiniLoader />}

          {data?.users?.data && (
            <section className="overflow-x-auto">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-slate-100 text-left text-gray-800">
                  <tr>
                    <th className="px-3 py-2 rounded-tl-lg rounded-bl-lg">
                      {t("common:id")}
                    </th>
                    <th className="px-3 py-2">{t("user:photo")}</th>
                    <th className="px-3 py-2">{t("user:fullname")}</th>
                    <th className="px-3 py-2">{t("user:birth_day")}</th>
                    <th className="px-3 py-2">{t("user:phone")}</th>
                    <th className="px-3 py-2">{t("user:email")}</th>
                    <th className="px-3 py-2">{t("user:gender")}</th>
                    <th className="px-3 py-2 rounded-tr-lg rounded-br-lg">
                      {t("common:options")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.users?.data?.map((user: IUser) => {
                    return (
                      <tr
                        key={user.id}
                        className="border-b border-stone-100 text-indigo-900/80"
                      >
                        <td className="px-3 py-2">{user.id}</td>

                        <td className="px-3 py-2">
                          <img
                            src={user?.photo}
                            alt="img"
                            className="w-10 rounded-lg"
                          />
                        </td>

                        <td className="px-3 py-2">
                          {user.fullname ?? t("user:unknown")}
                        </td>

                        <td className="px-3 py-2">
                          {user.birth_day ?? t("user:unknown")}
                        </td>

                        <td className="px-3 py-2">
                          {user.phone ?? t("user:unknown")}
                        </td>

                        <td className="px-3 py-2">
                          {user.email ?? t("user:unknown")}
                        </td>

                        <td className="px-3 py-2">
                          {user.gender ?? t("user:unknown")}
                        </td>

                        <td className="px-2 py-3">
                          <div className="flex">
                            <NavLink
                              className="bg-blue-50 text-blue-700 border border-blue-100 rounded-lg p-1"
                              to={`${RouteNames.users}/${user.id}/addresses`}
                            >
                              <IoLocationOutline size={22} />
                            </NavLink>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          )}
        </main>

        {data?.users?.paginatorInfo?.lastPage > 1 && (
          <Paginate
            currentPage={page.toString()}
            lastPage={data?.users?.paginatorInfo?.lastPage}
            setPage={setPage}
          />
        )}
      </>
    </AppLayout>
  );
};

export default Users;
