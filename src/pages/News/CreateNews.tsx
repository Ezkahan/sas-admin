import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import TextField from "../../components/common/Form/TextField";
import ImageUpload from "../../components/common/Form/imageUpload";
import { INewsCreate } from "../../common/interfaces/News/INewsCreate";
import { CREATE_NEWS } from "../../graphql/mutations/News/createNewsMutation";
import { GET_NEWS } from "../../graphql/queries/News/getNewsQuery";
import TextEditor from "../../components/common/Form/TextEditor";

const CreateNews: React.FC = () => {
  const { t } = useTranslation();
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

  const [createNews] = useMutation(CREATE_NEWS, {
    onCompleted,
    onError: () => toast.error(t("error_not_saved"), { duration: 2000 }),
    refetchQueries: [
      {
        query: GET_NEWS,
        variables: { page: 1 },
      },
    ],
  });

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    createNews({
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
      <section className="xl:p-5 p-1">
        <form
          onSubmit={(e) => onSubmit(e)}
          className="bg-white xl:px-8 px-5 xl:py-6 py-4 xl:my-5 my-3 rounded-lg"
        >
          <h1 className="text-lg font-montserrat-bold">Add news</h1>

          <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
            <ImageUpload
              inputData={inputImageData}
              setInputData={setImageInputData}
              setCropedImage={setNewCropedImage}
              label={"Картинка"}
            />
          </aside>
          <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
            <TextField
              name="title_tm"
              withLocale
              lang="tm"
              label="Label"
              required
              placeholder="Input title"
              handleChange={handleChange}
            />
            <TextField
              name="title_ru"
              withLocale
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
                withLocale
                required
                lang="tm"
                onChange={(text: string) => {
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
                withLocale
                required
                onChange={(text: string) => {
                  setNews({
                    ...news,
                    description_ru: text,
                  });
                }}
              />
            </div>
          </aside>

          <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-montserrat-bold px-6 py-2.5 border border-indigo-600 duration-300 rounded-lg">
            {t("save")}
          </button>
          <NavLink
            to={RouteNames.category}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 font-montserrat-bold px-6 py-3 duration-300 rounded-lg ml-10"
          >
            {t("cancel")}
          </NavLink>
        </form>
      </section>
    </AppLayout>
  );
};

export default CreateNews;
