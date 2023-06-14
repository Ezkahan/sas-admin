import { NavLink } from "react-router-dom";
import { INavRoute } from "../../router/routing";
import { FC } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

interface IProps {
  nav?: INavRoute;
  addPath: string;
  total?: number | string;
}

const PageHeader: FC<IProps> = ({ nav, addPath, total = 0 }: IProps) => {
  const { t } = useTranslation("translation");
  return (
    <header className=" flex justify-between items-center mb-5">
      <aside className="flex">
        {nav?.icon && <nav.icon size={48} className="text-indigo-800 mr-3" />}
        <div className="flex flex-col">
          <h1 className="text-xl font-montserrat-bold text-indigo-800">
            {nav?.title && nav.title}
          </h1>
          <small className="text-indigo-500">
            {t("total")}: <strong>{total}</strong>
          </small>
        </div>
      </aside>

      <div className="ml-5">
        <NavLink
          to={addPath}
          className="flex items-center border border-indigo-500 hover:bg-indigo-600 text-indigo-600 hover:text-white duration-300 px-2 py-1.5 rounded-lg"
        >
          <IoAddOutline size={22} />
          <p className="hidden xl:block">{t("add")}</p>
        </NavLink>
      </div>
    </header>
  );
};

export default PageHeader;
