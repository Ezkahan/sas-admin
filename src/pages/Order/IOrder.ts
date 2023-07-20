import { ICoupon } from "../Coupon/ICoupon";
import { IProduct } from "../Product/IProduct";
import { IUser } from "../User/IUser";

export interface IOrder {
  id: number;
  user: IUser;
  products: IOrderProduct[];
  products_count: number;
  coupons: ICoupon;
  summary: any;
  note: string;
  pay_type: PayTypeEnum;
  delivery_type: DeliveryTypeEnum;
  status: StatusTypeEnum;
}

export interface IOrderProduct {
  product: IProduct;
  quantity: number;
  price: number;
  discount_price: number;
}

enum PayTypeEnum {
  CASH,
  CARD,
}

enum DeliveryTypeEnum {
  DEFAULT,
  EXPRESS,
}

enum StatusTypeEnum {
  WAITING,
  IN_PROGRESS,
  IN_DELIVERY,
  DELIVERED,
  CANCELED,
}
