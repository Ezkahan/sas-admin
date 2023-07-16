import { gql } from "@apollo/client";

export const GET_COUPONS = gql`
  query Coupons($page: Int) {
    coupons(first: 30, page: $page, orderBy: [{ column: ID, order: DESC }]) {
      data {
        id
        title
        discount
        discount_type
        confirmed
        type
        expires_at
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
