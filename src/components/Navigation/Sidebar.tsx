import { useState } from "react";
import Header from "../Header/Header";
import Logo from "../Header/Logo";
import Navbar from "./Navbar";
import Footer from "../Footer/Footer";

const Sidebar: React.FC = () => {
  const [menu, setMenu] = useState<boolean>(false);

  return (
    <section
      className={`fixed top-14 xl:top-0 xl:left-0 ${
        menu ? "left-0" : "-left-72"
      } z-50 bottom-0 bg-dark-purple text-white w-72 duration-500 overflow-y-auto flex flex-col justify-between`}
    >
      <div className="mt-4 flex flex-col gap-10">
        <Logo />
        <Navbar />
      </div>
      <Header menu={menu} setMenu={setMenu} />
      <Footer />
    </section>
  );
};

export default Sidebar;
