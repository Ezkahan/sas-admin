import { NavLink } from "react-router-dom";
import Locale from "../Locale/Locale";
import { IoPersonOutline } from "react-icons/io5";

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-950 flex items-center justify-center gap-4 w-max rounded-lg my-4 mx-auto px-3">
      <NavLink
        to="/login"
        className="flex items-center justify-center w-10 h-10 rounded-full"
      >
        <IoPersonOutline size={24} />
      </NavLink>
      <Locale />
    </footer>
  );
};

export default Footer;
