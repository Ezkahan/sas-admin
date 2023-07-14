import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Users($page: Int) {
    users(first: 30, page: $page, orderBy: [{ column: ID, order: DESC }]) {
      data {
        id
        fullname
        photo
        birth_day
        phone
        email
        gender
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
