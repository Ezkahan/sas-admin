export interface INews {
  id: number;
  title: string;
  description: string;
  image: File | null;
  image_url: string;
  title_tm: string;
  title_ru: string;
  description_tm: string;
  description_ru: string;
}
