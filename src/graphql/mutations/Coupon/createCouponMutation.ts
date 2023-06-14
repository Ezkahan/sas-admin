import { gql } from "@apollo/client";

export const CREATE_COUPON = gql`
  mutation CreateCoupon(
    $title: JSON!
    $promo_price: Int!
    $started_at: DateTime!
    $ended_at: DateTime!
  ) {
    createCoupon(
      title: $title
      promo_price: $promo_price
      started_at: $started_at
      ended_at: $ended_at
    ) {
      id
      title
      promo_price
      started_at
      ended_at

    }
  }
`;
