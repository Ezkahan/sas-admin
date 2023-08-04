import { NavLink } from "react-router-dom";
import { navRoutes } from "../../router/routing";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <nav>
      {navRoutes.map((route) => {
        return (
          <NavLink
            key={route.path}
            to={route.path}
            className="flex items-center px-6 py-3 text-slate-300 hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-pink-500/5 hover:text-white text-sm duration-500"
          >
            <route.icon size={24} />
            <p className="px-3">{t(route.title)}</p>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Navbar;
