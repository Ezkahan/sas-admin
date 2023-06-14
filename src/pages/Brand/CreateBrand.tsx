import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RouteNames } from "../../router/routing";
import { IBrandCreate } from "../../common/interfaces/Brand/IBrandCreate";
import { CREATE_BRAND } from "../../graphql/mutations/Brand/createBrandMutation";
import { GET_BRANDS } from "../../graphql/queries/Brand/getBrandsQuery";
import Create from "../../components/Brand/Create";
import { GET_SHORT_CATEGORY_LIST } from "../../graphql/queries/Categories/getCategoriesQuery";

const CreateBrand: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: categories } = useQuery(GET_SHORT_CATEGORY_LIST);
  const [brand, setBrand] = useState<IBrandCreate>({} as IBrandCreate);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, value } = e.target;

    setBrand({
      ...brand,
      [e.target.name]: files?.length ? files[0] : value,
    });
  };

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate(RouteNames.brand), 2000);
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
        logo: brand.logo as File,
        name: brand.name,
        category_id: brand.category_id,
      },
    });
  };

  return (
    <Create
      onSubmit={onSubmit}
      handleChange={handleChange}
      categories={categories}
    />
  );
};

export default CreateBrand;
