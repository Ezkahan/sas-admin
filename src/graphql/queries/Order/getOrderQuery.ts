import { gql } from "@apollo/client";

export const GET_ORDER = gql`
  query order($id: ID!) {
    order(id: $id) {
      id
      status
      products_count
      user {
        id
        phone
      }
      delivery_type
      pay_type
      products {
        product {
          id
          title
          code
          image
        }
        price
        discount_price
        quantity
      }
    }
  }
`;
