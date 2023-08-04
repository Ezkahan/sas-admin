import { ITranslatable } from "../../common/interfaces/ITranslatable";

export interface INews {
  id: number;
  title: string;
  description: string;
  image?: File | null;
  image_url: string;
}

export interface INewsSave {
  id?: number;
  title?: ITranslatable;
  description?: ITranslatable;
  image?: File | null;
  image_url?: string;
}
