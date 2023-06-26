import { ITranslatable } from "../../common/interfaces/ITranslatable";

export interface INews {
  id: number;
  title: ITranslatable;
  description: ITranslatable;
  image: string;
  title_tm: string;
  title_ru: string;
  description_tm: string;
  description_ru: string;
}
