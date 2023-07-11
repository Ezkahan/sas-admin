import { FC } from "react";
import { useTranslation } from "react-i18next";

interface TextFieldType {
  lang?: "tm" | "ru" | "en";
  handleChange: any;
  placeholder: string;
  label: string;
  required?: boolean;
  name: string;
  type?: "text" | "number" | "file" | "date" | "datetime-local";
  withLocale?: boolean;
  defaultValue?: string | number;
  hasError?: boolean;
}

const TextField: FC<TextFieldType> = ({
  handleChange,
  placeholder,
  required = false,
  label,
  name,
  type = "text",
  defaultValue,
  hasError,
}) => {
  const { t } = useTranslation("translation");
  return (
    <div
      className={`bg-slate-50 border rounded-lg flex flex-col w-full overflow-hidden ${
        hasError ? "border-red-500 animate-pulse" : "border-slate-200"
      }`}
    >
      <header className="flex items-center justify-between">
        <small className={`px-4 pt-2 ${hasError && "text-red-500"}`}>
          {t(label)} {required && <span className="text-red-600 pl-1">*</span>}
        </small>
      </header>
      <input
        defaultValue={defaultValue}
        required={required}
        name={name}
        onChange={handleChange}
        type={type}
        className="bg-slate-50 px-4 py-2"
        placeholder={t(placeholder)}
      />
    </div>
  );
};

export default TextField;
