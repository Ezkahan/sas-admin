import { gql } from "@apollo/client";

export const GET_PAGES = gql`
  query GetPages($page: Int) {
    pages(first: 30, page: $page, orderBy: [{ column: ID, order: DESC }]) {
      data {
        id
        title
        text
        image_url
        position
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
