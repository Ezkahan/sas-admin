import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  lang?: "tm" | "ru" | "en";
  handleChange: Function;
  placeholder: string;
  label: string;
  required?: boolean;
  name: string;
  type?: "text" | "number" | "file" | "date" | "datetime-local";
  withLocale?: boolean;
  defaultValue?: string | number;
}

const TextField: FC<IProps> = ({
  handleChange,
  placeholder,
  required = false,
  label,
  name,
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
