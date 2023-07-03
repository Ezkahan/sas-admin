import { gql } from "@apollo/client";

export const GET_BRAND = gql`
  query brand($id: ID!) {
    brand(id: $id) {
      id
      name
      logo_url
      category_id
    }
  }
`;
