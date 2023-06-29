import { FC } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useTranslation } from "react-i18next";
import "../../../assets/css/ckeditor-custom.css";

interface TextEditorType {
  handleChange: Function;
  label: string;
  lang?: "ru" | "tm" | "en";
  required?: boolean;
  placeholder?: string;
}

const TextEditor: FC<TextEditorType> = ({
  handleChange,
  label,
  required = false,
  placeholder = "",
}) => {
  const { t } = useTranslation("common");

  // ClassicEditor.create(document.querySelector("#editor" as any))
  //   .then((editor) => {
  //     console.log(editor);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  return (
    <>
      <header className="flex items-center justify-between mb-2 text-md">
        <span className="text-sm">
          {t(label)}
          {required && <span className="text-red-600 pl-1">*</span>}
        </span>
      </header>

      {/* <textarea id="editor" placeholder="Type the content here!"></textarea> */}
      <CKEditor
        editor={ClassicEditor}
        data={`<p>${placeholder ?? "placeholder"}</p>`}
        onChange={(event, editor) => {
          const data = editor.getData();
          handleChange(data);
        }}
      />
    </>
  );
};

export default TextEditor;
