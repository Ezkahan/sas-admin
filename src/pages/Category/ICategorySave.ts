import { ITranslatable } from "../../common/interfaces/ITranslatable";

export interface ICategorySave {
  id?: number;
  name?: ITranslatable;
  description?: ITranslatable;
  icon?: File | null;
  icon_url?: string;
  image?: File | null;
  image_url?: string;
  parent_id?: number;
}
