// import { ITranslatable } from "../ITranslatable";

export interface ICategoryList {
  id: number;
  // name: ITranslatable;
  name: string;
  // description?: ITranslatable;
  description?: string;
  icon: string;
  image: string;
  parent_id: number;
  visited_count: number;
  // category: ICategoryList;
}
