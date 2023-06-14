import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ISelectOptionsList } from "../../../common/interfaces/ISelect";

interface IProps extends ISelectOptionsList {
  label: string;
  handleChange: Function;
  name: string;
  placeholder?: string;
}

const Select: FC<IProps> = ({
  label,
  options,
  handleChange,
  name,
  placeholder = "",
}: IProps) => {
  const { t } = useTranslation("translation");
  return (
    <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
      <header className="flex items-center justify-between">
        <small className="px-4 pt-2">{t(label)}</small>
      </header>

      <select
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          //   console.log(e.target.value);
          handleChange(e);
        }}
        className="bg-slate-50 px-4 py-2"
      >
        {options.map((option) => {
          return (
            <option key={option.title + option.value} value={option.value}>
              {option.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
