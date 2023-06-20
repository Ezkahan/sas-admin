import { gql } from "@apollo/client";

export const GET_ONE_NEWS = gql`
  query oneNews($id: ID!) {
    newsById(id: $id) {
      id
      title
      description
      image
    }
  }
`;
