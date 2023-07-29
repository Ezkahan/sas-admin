import { gql } from "@apollo/client";

export const GET_DOCUMENTATION = gql`
  query Documentation($page: Int) {
    documentation(
      first: 30
      page: $page
      orderBy: [{ column: ID, order: DESC }]
    ) {
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
