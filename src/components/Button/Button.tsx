import { NavLink } from "react-router-dom";
import IChildren from "../../common/interfaces/IChildren";
import { IoAddOutline, IoTrashOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

type ButtonType = {
  link?: string;
  bg?: "secondary" | "primary" | "success" | "info" | "danger" | "warning";
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonCompositionType = {
  Add: React.FC<ButtonType>;
  Edit: React.FC<ButtonType>;
  Delete: React.FC<ButtonType>;
};

const Button: ButtonCompositionType &
  React.FC<
    IChildren & ButtonType & React.ButtonHTMLAttributes<HTMLButtonElement>
  > = ({ children, bg = "primary", link, ...rest }) => {
  const bg_list = {
    secondary:
      "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200",
    primary: "bg-indigo-500 hover:bg-indigo-800",
    success: "bg-green-500 hover:bg-green-800",
    info: "bg-blue-500 hover:bg-blue-800",
    danger: "bg-red-500 hover:bg-red-800",
    warning: "bg-orange-400 hover:bg-orange-600",
  };

  return link ? (
    <NavLink to={link} className={`btn ${bg_list[bg]}`}>
      {children}
    </NavLink>
  ) : (
    <button className={`btn ${bg_list[bg]}`} {...rest}>
      {children}
    </button>
  );
};

const AddButton: React.FC<ButtonType> = ({ link, onClick }) => {
  return link ? (
    <NavLink to={link} className="btn__add">
      <IoAddOutline size={22} />
    </NavLink>
  ) : (
    <button onClick={onClick} className="btn__add">
      <IoAddOutline size={22} />
    </button>
  );
};

const EditButton: React.FC<ButtonType> = ({ link, onClick }) => {
  return link ? (
    <NavLink id="edit" to={link} className="btn__edit">
      <CiEdit size={28} />
    </NavLink>
  ) : (
    <button id="edit" onClick={onClick} className="btn__edit">
      <CiEdit size={28} />
    </button>
  );
};

const DeleteButton: React.FC<ButtonType> = ({ link, onClick }) => {
  return link ? (
    <NavLink to={link} className="btn__delete">
      <IoTrashOutline size={18} />
    </NavLink>
  ) : (
    <button type="button" onClick={onClick} className="btn__delete">
      <IoTrashOutline size={18} />
    </button>
  );
};

Button.Add = AddButton;
Button.Edit = EditButton;
Button.Delete = DeleteButton;

export default Button;
