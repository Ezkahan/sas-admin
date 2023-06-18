import { NavLink } from "react-router-dom";
import { jsonParseToLangs } from "../../common/helpers/jsonParseToLangs";
import { ICategoryList } from "../../common/interfaces/Category/ICategoryList";
import AppLayout from "../../layouts/AppLayout";
import Select from "../common/Form/Select";
import TextField from "../common/Form/TextField";
import { useTranslation } from "react-i18next";
import { CreateType } from "./CreateType";
import ImageUpload from "../common/Form/imageUpload";

const Add: React.FC<CreateType> = ({ onSubmit, handleChange, categories }) => {
  const { t } = useTranslation();

  return (
    // <AppLayout>
    //   <form
    //     onSubmit={onSubmit}
    //     className="bg-white xl:px-8 px-5 xl:py-6 py-4 xl:my-5 my-3 rounded-lg"
    //   >
    //     <h1 className="text-lg font-montserrat-bold">New brand</h1>

    //     <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
    //     <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
    //         <ImageUpload
    //           inputData={inputImageData}
    //           setInputData={setImageInputData}
    //           setCropedImage={setNewCropedImage}
    //           label={"Картинка"}
    //         />
    //       </aside>
    //       {/* <TextField
    //         name="logo"
    //         label="Logo"
    //         type="file"
    //         placeholder="Image file"
    //         handleChange={handleChange}
    //       /> */}
    //     </aside>

    //     <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
    //       <TextField
    //         name="name"
    //         label="Label"
    //         required
    //         placeholder="Adyny giriziň"
    //         handleChange={handleChange}
    //       />

    //       <Select
    //         name="category_id"
    //         label="Категория"
    //         placeholder="Выберите категорию"
    //         handleChange={handleChange}
    //         // options={categories.categories?.data?.map((c: ICategoryList) => {
    //         //   return { title: jsonParseToLangs(c.name).tm, value: c.id };
    //         // })}
    //         options={
    //           categories?.categories?.data?.length &&
    //           categories?.categories?.data.length > 0
    //             ? categories.categories.data.map((c: ICategoryList) => {
    //                 return {
    //                   title: jsonParseToLangs(c.name).tm,
    //                   value: c.id,
    //                 };
    //               })
    //             : []
    //         }
    //       />
    //     </aside>

    //     <button type="submit" className="btn">
    //       {t("save")}
    //     </button>

    //     <NavLink to="/brand" className="navlink">
    //       {t("cancel")}
    //     </NavLink>
    //   </form>
    // </AppLayout>
    <></>
  );
};

export default Add;
