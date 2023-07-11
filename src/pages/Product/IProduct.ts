import { ITranslatable } from "../../common/interfaces/ITranslatable";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  code: string;
  brand: string;
  category: string;
  price: string;
  discount_price: number;
  discount_type: string;
  in_stock: boolean;
  status: boolean;
  stock: string;
  preview: number;
  image: string;
}

export interface IProductSave {
  title: ITranslatable;
  description: ITranslatable;
  code: string;
  brand_id: string;
  category_id: string;
  price: string;
  in_stock: boolean;
  status: boolean;
  images: any;
  discount_amount: number;
  discount_type: string;
}
