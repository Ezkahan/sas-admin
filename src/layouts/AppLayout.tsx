import { atom, useAtom } from "jotai";
import IChildren from "../common/interfaces/IChildren";
import MainContainer from "../components/Main/MainContainer";
import { Toaster } from "react-hot-toast";
import ReactTooltip from "react-tooltip";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries/User/getCurrentUserQuery";
import { useEffect } from "react";
import Sidebar from "../components/Navigation/Sidebar";

export const userRole = atom("USER");

const AppLayout = ({ children }: IChildren) => {
  const [_, setRole] = useAtom(userRole);
  const { data } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    setRole(data?.me?.role);
  }, [data]);

  return (
    <>
      <section className="font-montserrat-medium">
        <Toaster />
        <ReactTooltip className="font-montserrat-bold" />
        <Sidebar />
        <MainContainer>{children}</MainContainer>
      </section>
    </>
  );
};
export default AppLayout;
