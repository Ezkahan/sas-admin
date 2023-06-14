import IChildren from "../common/interfaces/IChildren";
import MainContainer from "../components/Main/MainContainer";
import Sidebar from "../components/Navigation/Sidebar";
import { Toaster } from "react-hot-toast";
import ReactTooltip from "react-tooltip";


const AppLayout = ({ children }: IChildren) => {

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
