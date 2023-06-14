export interface ICouponCreate {
  title_tm: string;
  title_ru?: string;
  promo_price: number;
  started_at: string;
  ended_at: string;
}
