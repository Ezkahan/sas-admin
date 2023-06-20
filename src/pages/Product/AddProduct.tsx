import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import TextField from "../../components/common/Form/TextField";
import ImageUpload from "../../components/common/Form/imageUpload";
import { INewsCreate } from "../../common/interfaces/News/INewsCreate";
import TextEditor from "../../components/common/Form/TextEditor";
import Button from "../../components/Button/Button";
import { GET_PRODUCTS } from "../../graphql/queries/Product/getProductsQuery";
import { ADD_PRODUCT } from "../../graphql/mutations/Product/addProductMutation";

const AddProduct: React.FC = () => {
  const { t } = useTranslation(["common", "product"]);
  const navigate = useNavigate();
  const [inputImageData, setImageInputData] = useState({
    select_image: "Выберите",
    image: "",
  });
  const [newCropedImage, setNewCropedImage] = useState();

  const [news, setNews] = useState<INewsCreate>({
    title_tm: "",
    title_ru: "",
    description_tm: "",
    description_ru: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNews({
      ...news,
      [e.target.name]: e.target.value,
    });
  };

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate(RouteNames.news), 2000);
  };

  const [mutate] = useMutation(ADD_PRODUCT, {
    onCompleted,
    onError: () => toast.error(t("error_not_saved"), { duration: 2000 }),
    refetchQueries: [
      {
        query: GET_PRODUCTS,
        variables: { page: 1 },
      },
    ],
  });

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutate({
      variables: {
        image: newCropedImage,
        title: JSON.stringify({
          tm: news.title_tm,
          ru: news.title_ru || news.title_tm,
        }),
        description: JSON.stringify({
          tm: news.description_tm,
          ru: news.description_ru || news.description_tm,
        }),
      },
    });
  };

  return (
    <AppLayout>
      <form onSubmit={onSubmit} className="bg-white px-5 py-3 my-3 rounded-lg">
        <h1 className="text-lg font-montserrat-bold">{t("product:add")}</h1>

        <aside className="mt-5 mb-8">
          <ImageUpload
            inputData={inputImageData}
            setInputData={setImageInputData}
            setCropedImage={setNewCropedImage}
            label={t("product:select_image")}
          />
        </aside>
        <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
          <TextField
            name="title_tm"
            lang="tm"
            label="Label"
            required
            placeholder="Input title"
            handleChange={handleChange}
          />
          <TextField
            name="title_ru"
            label="Label"
            required
            placeholder="Input title"
            handleChange={handleChange}
          />
        </aside>
        <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
          <div className="col-span-6">
            <TextEditor
              label="Description"
              required
              lang="tm"
              handleChange={(text: string) => {
                setNews({
                  ...news,
                  description_tm: text,
                });
              }}
            />
          </div>
          <div className="col-span-6">
            <TextEditor
              label="Description"
              required
              handleChange={(text: string) => {
                setNews({
                  ...news,
                  description_ru: text,
                });
              }}
            />
          </div>
        </aside>

        <footer className="flex items-center justify-end gap-3">
          <Button bg="secondary" link={RouteNames.category}>
            <p>{t("common:cancel")}</p>
          </Button>

          <Button type="submit">
            <p>{t("common:save")}</p>
          </Button>
        </footer>
      </form>
    </AppLayout>
  );
};

export default AddProduct;
