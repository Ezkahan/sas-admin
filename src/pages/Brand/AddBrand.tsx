import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IBrandCreate } from "../../common/interfaces/Brand/IBrandCreate";
import { CREATE_BRAND } from "../../graphql/mutations/Brand/createBrandMutation";
import { GET_BRANDS } from "../../graphql/queries/Brand/getBrandsQuery";
import Add from "../../components/Brand/Add";
import { GET_SHORT_CATEGORY_LIST } from "../../graphql/queries/Categories/getCategoriesQuery";
import AppLayout from "../../layouts/AppLayout";
import ImageUpload from "../../components/common/Form/imageUpload";
import TextField from "../../components/common/Form/TextField";
import Select from "../../components/common/Form/Select";
import { jsonParseToLangs } from "../../common/helpers/jsonParseToLangs";
import { ICategoryList } from "../../common/interfaces/Category/ICategoryList";
import { NavLink } from "react-router-dom";

const AddBrand: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: categories } = useQuery(GET_SHORT_CATEGORY_LIST);
  const [brand, setBrand] = useState<IBrandCreate>({
    name: "",
    category_id: 1,
  } as IBrandCreate);
  const [inputImageData, setImageInputData] = useState({
    select_image: "Выберите",
    image: "",
  });

  console.log(categories);
  const [newCropedImage, setNewCropedImage] = useState();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // @ts-ignore
    const { files, value, name } = e.target;
    console.log("onchacnge");

    setBrand({
      ...brand,
      [name]: files?.length ? files[0] : value,
    });
  };

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate("/brand"), 2000);
  };

  const onError = (e: ApolloError) =>
    toast.error(`${t("error_not_saved")} ${e.message}`, { duration: 2000 });

  const [mutate] = useMutation(CREATE_BRAND, {
    onCompleted,
    onError,
    refetchQueries: [
      {
        query: GET_BRANDS,
        variables: { page: 1 },
      },
    ],
  });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutate({
      variables: {
        logo: newCropedImage,
        name: brand.name,
        category_id: brand.category_id,
      },
    });
  };

  console.log(brand);

  return (
    <AppLayout>
      <form
        onSubmit={onSubmit}
        className="bg-white xl:px-8 px-5 xl:py-6 py-4 xl:my-5 my-3 rounded-lg"
      >
        <h1 className="text-lg font-montserrat-bold">New brand</h1>

        <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
          <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
            <ImageUpload
              inputData={inputImageData}
              setInputData={setImageInputData}
              setCropedImage={setNewCropedImage}
              label={"Картинка"}
            />
          </aside>
          {/* <TextField
            name="logo"
            label="Logo"
            type="file"
            placeholder="Image file"
            handleChange={handleChange}
          /> */}
        </aside>

        <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
          <TextField
            name="name"
            label="Label"
            required
            placeholder="Adyny giriziň"
            handleChange={handleChange}
          />

          <Select
            name="category_id"
            label="Категория"
            placeholder="Выберите категорию"
            handleChange={handleChange}
            // options={categories.categories?.data?.map((c: ICategoryList) => {
            //   return { title: jsonParseToLangs(c.name).tm, value: c.id };
            // })}
            options={
              categories?.categories?.data?.length &&
              categories?.categories?.data.length > 0
                ? categories.categories.data.map((c: ICategoryList) => {
                    return {
                      title: jsonParseToLangs(c.name).tm,
                      value: c.id,
                    };
                  })
                : []
            }
          />
        </aside>

        <button type="submit" className="btn">
          {t("save")}
        </button>

        <NavLink to="/brand" className="navlink">
          {t("cancel")}
        </NavLink>
      </form>
    </AppLayout>
  );
  //   <Add
  //     onSubmit={onSubmit}
  //     handleChange={handleChange}
  //     categories={categories}
  //   />
  // );
};

export default AddBrand;
