import { gql } from "@apollo/client";

export const GET_CATEGORY_LIST = gql`
  query Categories($page: Int) {
    subcategories(page: $page, orderBy: [{ column: ID, order: DESC }]) {
      data {
        id
        name
        icon_url
        image_url
        visited_count
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

export const GET_SHORT_CATEGORY_LIST = gql`
  query Categories($page: Int) {
    categories(page: $page, orderBy: [{ column: ID, order: DESC }]) {
      data {
        id
        name
      }
    }
  }
`;
