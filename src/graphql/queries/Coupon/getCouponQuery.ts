import { gql } from "@apollo/client";

export const GET_COUPON = gql`
  query coupon($id: ID!) {
    coupon(id: $id) {
      id
      title
      promo_price
      started_at
      ended_at
    }
  }
`;
