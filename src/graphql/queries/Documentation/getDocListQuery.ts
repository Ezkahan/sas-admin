import { gql } from "@apollo/client";

export const GET_DOCUMENTATION_LIST = gql`
  query Documentation($page: Int) {
    docList(first: 30, page: $page, orderBy: [{ column: ID, order: DESC }]) {
      data {
        id
        title
        text
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
