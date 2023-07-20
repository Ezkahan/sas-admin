import { FC } from "react";
import { ISelectOptionsList } from "../../common/interfaces/ISelect";

interface IProps extends ISelectOptionsList {
  label?: string;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  name: string;
  placeholder?: string;
  selected_value?: string | number;
}

const Select: FC<IProps> = ({
  label,
  options,
  handleChange,
  name,
  placeholder = "",
  selected_value,
}: IProps) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden select-none">
      <header className="flex items-center justify-between">
        {label && <small className="px-4 pt-2">{label}</small>}
      </header>

      <select
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={selected_value}
        className="bg-slate-50 px-4 py-2 appearance-none"
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
