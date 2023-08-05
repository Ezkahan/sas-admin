import { gql } from "@apollo/client";

export const GET_SUPPORT_LIST = gql`
  query Support($page: Int) {
    supportList(
      first: 30
      page: $page
      orderBy: [{ column: ID, order: DESC }]
    ) {
      data {
        id
        title
        email
        subject
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
