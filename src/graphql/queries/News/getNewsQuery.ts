import { gql } from "@apollo/client";

export const GET_NEWS = gql`
  query News($page: Int) {
    news(first: 30, page: $page, orderBy: [{ column: ID, order: DESC }]) {
      data {
        id
        title
        description
        image_url
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
