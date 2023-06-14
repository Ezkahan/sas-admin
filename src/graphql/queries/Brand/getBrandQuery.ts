import { gql } from "@apollo/client";

export const GET_BRAND = gql`
  query brand($id: ID!) {
    brand(id: $id) {
      id
      name
      category_id
    }
  }
`;
