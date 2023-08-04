import { FC } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useTranslation } from "react-i18next";
import "../../assets/css/ckeditor-custom.css";

interface TextEditorType {
  handleChange: Function;
  label: string;
  locale?: "ru" | "tm" | "en";
  required?: boolean;
  name?: string;
  value?: string;
}

const TextEditor: FC<TextEditorType> = ({
  handleChange,
  label,
  required = false,
  value = "",
  name,
}) => {
  const { t } = useTranslation("common");

  return (
    <>
      <header className="flex items-center justify-between mb-2 text-md">
        <span className="text-sm">
          {t(label)}
          {required && <span className="text-red-600 pl-1">*</span>}
        </span>
      </header>

      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(_, editor) => {
          const data = editor.getData();
          handleChange(data, name);
        }}
      />
    </>
  );
};

export default TextEditor;
