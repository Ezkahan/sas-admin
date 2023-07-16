import { gql } from "@apollo/client";

export const GET_COUPON = gql`
  query coupon($id: ID!) {
    coupon(id: $id) {
      id
      title
      discount
      discount_type
      confirmed
      type
      expires_at
    }
  }
`;
