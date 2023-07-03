import { useTranslation } from "react-i18next";

interface ImageInputType {
  label: string;
  multiple?: boolean;
  handleImage: any;
}

const ImageInput: React.FC<ImageInputType> = ({
  handleImage,
  label,
  multiple = false,
}) => {
  const { t } = useTranslation("common");

  return (
    <aside className="flex flex-col border border-gray-200 bg-gray-50 rounded-md w-full">
      <label className="text-sm px-4 pt-2 w-max">{label}</label>

      <div className="relative h-10">
        <label className="absolute top-2 left-4 text-gray-400">
          {t("common:select_image")}
        </label>

        <input
          onChange={handleImage}
          type="file"
          multiple={multiple}
          className="opacity-0"
          accept="image/*"
        />
      </div>
    </aside>
  );
};

export default ImageInput;
