import { gql } from "@apollo/client";

export const GET_NEWS_DETAIL = gql`
  query getNewsById($id: ID!) {
    newsDetail(id: $id) {
      id
      title
      description
      image_url
    }
  }
`;
