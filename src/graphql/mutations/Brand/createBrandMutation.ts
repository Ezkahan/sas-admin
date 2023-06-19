import { gql } from "@apollo/client";

export const CREATE_BRAND = gql`
  mutation AddBrand($logo: String!, $name: String!, $category_id: ID!) {
    addBrand(name: $name, logo: $logo, category_id: $category_id) {
      id
      name
      category_id
    }
  }
`;
