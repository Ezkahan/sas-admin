import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query orders {
    orders {
      data {
        id
        user {
          phone
        }
        products_count
        pay_type
        delivery_type
        status
      }
      paginatorInfo {
        count
        currentPage
        firstItem
        lastItem
        lastPage
        perPage
        total
        hasMorePages
      }
    }
  }
`;
