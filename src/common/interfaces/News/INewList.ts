import { ITranslatable } from "../ITranslatable";

export interface INewList {
  id: number;
  title: ITranslatable;
  description: ITranslatable;
  image: string;
}
