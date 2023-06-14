import { FC } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface IProps {
  backPath?: string;
}

const NavigateBack: FC<IProps> = ({ backPath }: IProps) => {
  const navigation = useNavigate();
  return (
    <div className="inline-block">
      <div
        onClick={() => {
          if (backPath) navigation(backPath);
          else navigation(-1);
        }}
        className="px-3 py-1  hover:text-gray-700 text-gray-600 duration-200 hover:cursor-pointer mb-4 bg-gray-100 border border-gray-199 hover:border-gray-300 rounded-md flex items-center"
      >
        <BiArrowBack size={18} className={""} />
        <span className="ml-2 ">{"Back"}</span>
      </div>
    </div>
  );
};

export default NavigateBack;
