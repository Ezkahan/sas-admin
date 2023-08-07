import { IoAppsOutline } from "react-icons/io5";
import IChildren from "../../common/interfaces/IChildren";
import React, { SetStateAction } from "react";

interface IDrawMenu {
  menu?: boolean;
  setMenu?: React.Dispatch<SetStateAction<boolean>> | any;
}

const Header: React.FC<IChildren & IDrawMenu> = ({
  children,
  menu,
  setMenu,
}: IChildren & IDrawMenu) => {
  return (
    <header className="xl:hidden flex justify-between items-center bg-white text-slate-700 px-5 py-4 fixed top-0 xl:left-72 left-0 right-0 z-40 shadow shadow-slate-200/80">
      <IoAppsOutline
        className="xl:opacity-0"
        onClick={() => setMenu(!menu)}
        size={24}
      />
      {children}
    </header>
  );
};

export default Header;
