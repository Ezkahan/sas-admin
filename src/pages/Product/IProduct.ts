import { ITranslatable } from "../../common/interfaces/ITranslatable";

export interface IProduct {
  id: number;
  title: ITranslatable;
  description: ITranslatable;
  code: string;
  brand_id: number;
  brand: string;
  category_id: number;
  category: string;
  price: string;
  percent: string;
  in_stock: boolean;
  status: boolean;
  stock: string;
  preview: number;
  image: string;
}
