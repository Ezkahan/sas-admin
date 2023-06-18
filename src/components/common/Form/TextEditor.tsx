import { FC } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import EN_FLAG from "../../../assets/icons/locales/en.jpg";
import TM_FLAG from "../../../assets/icons/locales/tm.png";
import { useTranslation } from "react-i18next";

interface IProps {
  onChange: Function;
  withLocale?: boolean;
  label: string;
  lang?: "ru" | "tm" | "en";
  required?: boolean;
  placeholder?: string;
}

const returnLangIcon = (lang: "tm" | "en") => {
  switch (lang) {
    case "tm":
      return TM_FLAG;
    case "en":
      return EN_FLAG;
    default:
      return TM_FLAG;
  }
};

const TextEditor: FC<IProps> = ({
  onChange,
  withLocale = false,
  label,
  lang = "tm",
  required = false,
  placeholder = "",
}: IProps) => {
  const { t } = useTranslation("translation");
  return (
    <div>
      <div className="flex flex-col">
        <header className="flex items-center justify-between mb-2 text-md">
          <span className="text-sm">
            {t(label)}{" "}
            {required && <span className="text-red-600 pl-1">*</span>}
          </span>
        </header>
      </div>
      <CKEditor
        editor={ClassicEditor}
        data={`<p>${placeholder}</p>`}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
          // console.log({ event, editor, data });
        }}
        // onBlur={(event, editor) => {
        //   console.log("Blur.", editor);
        // }}
        // onFocus={(event, editor) => {
        //   console.log("Focus.", editor);
        // }}
      />
    </div>
  );
};

export default TextEditor;
