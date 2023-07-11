import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products($page: Int) {
    products(first: 30, page: $page, orderBy: [{ column: ID, order: DESC }]) {
      data {
        id
        title
        image
        code
        price
        discount_price
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
