import { ITranslatable } from "../../common/interfaces/ITranslatable";

export interface IPage {
  id: number;
  title: string;
  text: string;
  position: string;
  image?: File | null;
  image_url: string;
}

export interface IPageSave {
  id?: number;
  title?: ITranslatable;
  text?: ITranslatable;
  position: string;
  image?: File | null;
  image_url: string;
}
