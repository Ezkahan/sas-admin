import i18n from "../../common/configs/i18n";
import getByLocale from "../../common/helpers/getByLocale";
import { ICategory } from "./ICategory";

const CategoryListDTO = (categories: ICategory[]) => {
  return [
    { label: i18n.t("common:category_placeholder"), value: 0 },
    ...(categories?.map((category) => {
      return {
        label: getByLocale(JSON.parse(category.name)),
        value: category.id,
      };
    }) ?? ""),
  ];
};

export default CategoryListDTO;
