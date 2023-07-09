import { NavLink } from "react-router-dom";
import { navRoutes } from "../../router/routing";

const Navbar: React.FC = () => {
  return (
    <nav className="text-sm font-bold mt-6">
      {navRoutes.map((route) => {
        return (
          <NavLink
            key={route.path}
            to={route.path}
            className="flex items-center px-6 py-3.5 text-slate-300 hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-pink-500/5 hover:text-white duration-500"
          >
            <route.icon size={24} />
            <p className="px-3">{route.title}</p>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Navbar;
