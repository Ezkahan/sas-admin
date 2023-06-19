import { gql } from "@apollo/client";

export const GET_BRANDS = gql`
  query brands($page: Int) {
    brands(first: 30, page: $page, orderBy: [{ column: ID, order: DESC }]) {
      data {
        id
        name
        logo
        category_id
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
