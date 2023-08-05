import { gql } from "@apollo/client";

export const CONFIRM_COUPON = gql`
  mutation ConfirmCoupon($id: ID!) {
    confirmCoupon(id: $id)
  }
`;
