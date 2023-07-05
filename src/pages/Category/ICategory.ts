import { ITranslatable } from "../../common/interfaces/ITranslatable";

export interface ICategory {
  id: number;
  name: string;
  description?: string;
  icon: File | null;
  icon_url: string;
  image: File | null;
  image_url: string;
  parent_id: number;
  visited_count: number;
  category: ICategory;
}
