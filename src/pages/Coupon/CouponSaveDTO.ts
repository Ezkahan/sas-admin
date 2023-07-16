import { ICoupon, ICouponAdd } from "./ICoupon";

const CouponSaveDTO = (coupon?: ICoupon) => {
  return {
    id: coupon?.id,
    title: {
      tm: coupon?.title && (JSON.parse(coupon?.title)?.tm ?? ""),
      ru: coupon?.title && (JSON.parse(coupon?.title)?.ru ?? ""),
    },
    discount: coupon?.discount,
    discount_type: coupon?.discount_type,
    type: coupon?.type,
    expires_at: coupon?.expires_at,
  } as ICouponAdd;
};

export default CouponSaveDTO;
