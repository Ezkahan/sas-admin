import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query News($page: Int) {
    products(first: 30, page: $page, orderBy: [{ column: ID, order: DESC }]) {
      data {
        id
        title
        description
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
