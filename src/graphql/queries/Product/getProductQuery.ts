import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query oneNews($id: ID!) {
    product(id: $id) {
      id
      title
      description
      image
    }
  }
`;
