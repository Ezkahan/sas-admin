// import { ITranslatable } from "../ITranslatable";

export interface ICoupon {
  id: number;
  // title: ITranslatable;
  title: string;
  promo_price: number;
  started_at: string;
  ended_at: string;
}
