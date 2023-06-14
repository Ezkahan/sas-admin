// import { ITranslatable } from "../ITranslatable";


export interface ICategoryList {
  id: number;
  // name: ITranslatable;
  name: string;
  // description?: ITranslatable;
  description?: string;
  icon: any;
  image: any;
  parent_id: number;
  visited_count: number;
  // category: ICategoryList;
}
