import { gql } from "@apollo/client";

export const SAVE_COUPON = gql`
  mutation SaveCoupon(
    $id: ID
    $title: JSON!
    $discount: Int!
    $discount_type: String!
    $expires_at: String!
    $type: String!
  ) {
    saveCoupon(
      id: $id
      title: $title
      discount: $discount
      discount_type: $discount_type
      expires_at: $expires_at
      type: $type
    ) {
      id
      title
    }
  }
`;
