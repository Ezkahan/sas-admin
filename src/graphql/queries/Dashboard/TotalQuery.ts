import { gql } from "@apollo/client";

export const GET_TOTALS = gql`
  query getAll {
    banners {
      paginatorInfo {
        total
      }
    }

    brands {
      paginatorInfo {
        total
      }
    }

    categories {
      paginatorInfo {
        total
      }
    }

    coupons {
      paginatorInfo {
        total
      }
    }

    news {
      paginatorInfo {
        total
      }
    }
  }
`;
