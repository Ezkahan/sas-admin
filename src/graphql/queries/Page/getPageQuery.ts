import { gql } from "@apollo/client";

export const GET_PAGE = gql`
  query GetPage($id: ID!) {
    pageDetail(id: $id) {
      id
      title
      text
      image_url
      position
    }
  }
`;
