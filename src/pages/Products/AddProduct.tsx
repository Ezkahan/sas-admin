import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IBannerCreate } from "../../common/interfaces/Banner/IBannerCreate";
import { GET_BANNERS } from "../../graphql/queries/Banner/getBannersQuery";
import { CREATE_BANNER } from "../../graphql/mutations/Banner/createBannerMutation";
import TextField from "../../components/common/Form/TextField";
import Select from "../../components/common/Form/Select";
import ImageUpload from "../../components/common/Form/imageUpload";
import Button from "../../components/Button/Button";
import { RouteNames } from "../../router/routing";

const AddProduct: React.FC = () => {
  const { t } = useTranslation(["common", "product"]);
  const navigate = useNavigate();

  const [inputImageData, setImageInputData] = useState({
    select_image: t("common:select_image"),
    image: "",
  });
  const [newCropedImage, setNewCropedImage] = useState();

  const [banner, setBanner] = useState<IBannerCreate>({
    category_id: 1,
    image: "",
    position: "",
    link: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setBanner({
      ...banner,
      [e.target.name]: e.target.value,
    });
  };

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate("/banner"), 2000);
  };

  const [createBanner] = useMutation(CREATE_BANNER, {
    onCompleted,
    onError: () => toast.error(t("error_not_saved"), { duration: 2000 }),
    refetchQueries: [
      {
        query: GET_BANNERS,
        variables: { page: 1 },
      },
    ],
  });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createBanner({
      variables: {
        image: newCropedImage,
        link: banner.link,
        position: banner.position,
        category_id: banner.category_id,
      },
    });
  };

  return (
    <AppLayout>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="bg-white px-5 py-3 rounded-lg"
      >
        <h1 className="text-lg font-montserrat-bold">{t("product:add")}</h1>

        <aside className="mt-3">
          <ImageUpload
            inputData={inputImageData}
            setInputData={setImageInputData}
            setCropedImage={setNewCropedImage}
            label={t("banner:select_image")}
          />
        </aside>

        <aside className="flex gap-5 mt-5 mb-8">
          <TextField
            name="description_tm"
            required
            label={t("product:product_tm")}
            placeholder={t("category:description_tm")}
            handleChange={handleChange}
          />

          <TextField
            name="description_ru"
            required
            label={t("product:product_ru")}
            placeholder={t("category:description_ru")}
            handleChange={handleChange}
          />
        </aside>
        <aside className="flex gap-5 mt-5 mb-8">
          <TextField
            name="description_tm"
            required
            label={t("category:description_tm")}
            placeholder={t("category:description_tm")}
            handleChange={handleChange}
          />

          <TextField
            name="description_ru"
            required
            label={t("category:description_ru")}
            placeholder={t("category:description_ru")}
            handleChange={handleChange}
          />
        </aside>

        <aside className="grid grid-cols-12 gap-5 mt-3 mb-8">
          <TextField
            name="link"
            label={t("banner:url")}
            placeholder={t("banner:url_placeholder")}
            handleChange={handleChange}
          />
          <Select
            name="position"
            label={t("banner:position")}
            placeholder={t("banner:position_placeholder")}
            handleChange={handleChange}
            options={[
              { title: "TOP", value: "TOP" },
              { title: "MAIN", value: "MAIN" },
              { title: "BOTTOM", value: "BOTTOM" },
            ]}
          />
        </aside>

        <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
          <Select
            name="category_id"
            label={t("banner:category")}
            placeholder={t("banner:category_placeholder")}
            handleChange={handleChange}
            options={[
              { title: "1", value: 1 },
              { title: "2", value: 2 },
            ]}
          />
        </aside>

        <footer className="flex items-center justify-end gap-3">
          <Button bg="secondary" link={RouteNames.banner}>
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
