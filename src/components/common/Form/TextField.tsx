import { FC } from "react";
import { useTranslation } from "react-i18next";
import EN_FLAG from "../../../assets/icons/locales/en.jpg";
import RU_FLAG from "../../../assets/icons/locales/ru.jpg";
import TM_FLAG from "../../../assets/icons/locales/tm.png";

interface IProps {
  lang?: "ru" | "tm" | "en";
  handleChange: Function;
  placeholder: string;
  label: string;
  required?: boolean;
  name: string;
  type?: "text" | "number" | "file" | "date" | "datetime-local";
  withLocale?: boolean;
  defaultValue?: string | number;
}

const returnLangIcon = (lang: "ru" | "tm" | "en") => {
  switch (lang) {
    case "ru":
      return RU_FLAG;
    case "tm":
      return TM_FLAG;
    case "en":
      return EN_FLAG;
    default:
      return RU_FLAG;
  }
};

const TextField: FC<IProps> = ({
  lang = "ru",
  handleChange,
  placeholder,
  required = false,
  label,
  name,
  withLocale = false,
  type = "text",
  defaultValue,
}: IProps) => {
  const { t } = useTranslation("translation");
  return (
    <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
      <header className="flex items-center justify-between">
        <small className="px-4 pt-2">
          {t(label)} {required && <span className="text-red-600 pl-1">*</span>}
        </small>
        {withLocale && (
          <img
            src={returnLangIcon(lang)}
            alt="EN"
            className="w-6 h-4 mr-4 mt-2"
          />
        )}
      </header>
      <input
        defaultValue={defaultValue}
        required={required}
        name={name}
        onChange={(e) => handleChange(e)}
        type={type}
        className="bg-slate-50 px-4 py-2"
        placeholder={t(placeholder)}
      />
    </div>
  );
};

export default TextField;
