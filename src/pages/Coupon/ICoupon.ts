import { ITranslatable } from "../../common/interfaces/ITranslatable";

export interface ICoupon {
  id: number;
  title: string;
  discount: number;
  discount_type: string;
  confirmed: boolean;
  type: string;
  expires_at: string;
}

export interface ICouponAdd {
  id?: number;
  title: ITranslatable;
  discount: number;
  discount_type: string;
  type: string;
  expires_at: string;
}
