import { useQuery } from "@apollo/client";
import MiniLoader from "../../components/Loader/MiniLoader";
import AppLayout from "../../layouts/AppLayout";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Title from "../../components/Title/Title";
import { IUserAddresses } from "../../common/interfaces/User/IUser";
import { useParams } from "react-router-dom";
import { GET_USER } from "../../graphql/queries/User/getUserQuery";

const UserAddresses = () => {
  const { t } = useTranslation(["common", "user"]);
  const { id } = useParams();
  const onError = () => toast.error(t("error_not_loaded"), { duration: 2000 });

  const { loading, data } = useQuery(GET_USER, {
    variables: { id },
    onError,
  });

  return (
    <AppLayout>
      <>
        <main className="section">
          <header className="flex justify-between items-center mb-5">
            <Title
              title={`${data?.user?.phone} ${t("user:addresses")}`}
              subtitle={`${t("common:total")}: ${
                data?.user?.addresses?.length
              }`}
            />
          </header>

          {loading && <MiniLoader />}

          {data?.user?.addresses && (
            <section className="overflow-x-auto">
              <table className="w-full table-fixed text-sm">
                <thead className="bg-slate-100 text-left text-gray-800">
                  <tr>
                    <th className="px-3 py-2 rounded-tl-lg rounded-bl-lg">
                      {t("common:id")}
                    </th>
                    <th className="px-3 py-2 rounded-tr-lg rounded-br-lg">
                      {t("user:address")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.user?.addresses?.map((address: IUserAddresses) => {
                    return (
                      <tr
                        key={address.id}
                        className="border-b border-stone-100 text-indigo-900/80"
                      >
                        <td className="px-3 py-2">{address.id}</td>

                        <td className="px-3 py-2">
                          {address.address ?? t("user:unknown")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          )}
        </main>
      </>
    </AppLayout>
  );
};

export default UserAddresses;
