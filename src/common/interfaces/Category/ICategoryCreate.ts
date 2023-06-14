export interface ICategoryCreate {
  name_tm: string;
  name_ru: string;
  description_tm?: string;
  description_ru?: string;
  icon?: any;
  image?: any;
  parent_id?: number|null;
}
