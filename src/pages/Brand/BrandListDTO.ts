import i18n from "../../common/configs/i18n";
import { IBrand } from "./IBrand";

const BrandListDTO = (brands: IBrand[]) => {
  return [
    { label: i18n.t("common:brand_placeholder"), value: 0 },
    ...(brands?.map((brand) => {
      return {
        label: brand.name,
        value: brand.id,
      };
    }) ?? ""),
  ];
};

export default BrandListDTO;
