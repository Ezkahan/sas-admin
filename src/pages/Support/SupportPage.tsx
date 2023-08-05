import { useQuery } from "@apollo/client";
import MiniLoader from "../../components/Loader/MiniLoader";
import Paginate from "../../components/Paginate/Paginate";
import AppLayout from "../../layouts/AppLayout";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Title from "../../components/Title/Title";
import { ISupport } from "./ISupport";
import { GET_SUPPORT_LIST } from "../../graphql/queries/Support/getSupportListQuery";

const SupportPage = () => {
  const { t } = useTranslation(["common", "support"]);
  const [page, setPage] = useState<number>(1);

  const onError = () => toast.error(t("error_not_loaded"), { duration: 2000 });

  const { loading, data } = useQuery(GET_SUPPORT_LIST, {
    variables: { page },
    onError,
  });

  return (
    <AppLayout>
      <>
        <main className="section">
          <header className="flex justify-between items-center mb-5">
            <Title
              title={t("common:support")}
              subtitle={`${t("common:total")}: ${
                data?.support?.paginatorInfo?.total ?? 0
              }`}
            />
          </header>

          {loading && <MiniLoader />}

          {data?.supportList?.data && (
            <section className="overflow-x-auto">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-slate-100 text-left text-gray-800">
                  <tr>
                    <th className="px-3 py-2 w-16 rounded-tl-lg rounded-bl-lg">
                      {t("common:id")}
                    </th>
                    <th className="px-3 py-2">{t("support:title")}</th>
                    <th className="px-3 py-2">{t("support:email")}</th>
                    <th className="px-3 py-2 rounded-tr-lg rounded-br-lg">
                      {t("support:subject")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.supportList?.data?.map((support: ISupport) => {
                    return (
                      <tr
                        key={support.id}
                        className="border-b border-stone-100 text-indigo-900/80"
                      >
                        <td className="px-3 py-2">{support.id}</td>
                        <td className="px-3 py-2">{support.title}</td>
                        <td className="px-3 py-2">{support.email}</td>
                        <td className="px-3 py-2">{support.subject}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          )}
        </main>

        {data?.supportList?.paginatorInfo?.lastPage > 1 && (
          <Paginate
            currentPage={page.toString()}
            lastPage={data?.supportList?.paginatorInfo?.lastPage}
            setPage={setPage}
          />
        )}
      </>
    </AppLayout>
  );
};

export default SupportPage;
