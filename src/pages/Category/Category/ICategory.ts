import { ITranslatable } from "../../../common/interfaces/ITranslatable";

export interface ICategory {
  id: number;
  name: string;
  description?: ITranslatable;
  icon: string;
  image: string;
  parent_id: number;
  visited_count: number;
  category: ICategory;
}
