import { ICategory } from "./ICategory";
import { ICategorySave } from "./ICategorySave";

const CategorySaveDTO = (category?: ICategory) => {
  return {
    id: category?.id,
    name: {
      tm: category?.name && (JSON.parse(category?.name)?.tm ?? ""),
      ru: category?.name && (JSON.parse(category?.name)?.ru ?? ""),
    },
    description: {
      tm:
        category?.description && (JSON.parse(category?.description)?.tm ?? ""),
      ru:
        category?.description && (JSON.parse(category?.description)?.ru ?? ""),
    },
    icon: category?.icon,
    icon_url: category?.icon_url,
    image: category?.image,
    image_url: category?.image_url,
    parent_id: category?.parent_id,
  } as ICategorySave;
};

export default CategorySaveDTO;
