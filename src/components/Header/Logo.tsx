import SAS from "../../assets/logo.svg";

type LogoType = {
  size?: "lg" | "sm";
};

const Logo: React.FC<LogoType> = ({ size = "sm" }) => {
  return (
    <img
      src={SAS}
      alt="Logo"
      className={`bg-white px-4 py-2 rounded-lg mx-auto ${
        size === "lg" ? "w-42" : "w-24"
      }`}
    />
  );
};

export default Logo;
