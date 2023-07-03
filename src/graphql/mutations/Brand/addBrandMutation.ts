import { gql } from "@apollo/client";

export const ADD_BRAND = gql`
  mutation AddBrand($logo: Upload!, $name: String!, $category_id: ID!) {
    addBrand(name: $name, logo: $logo, category_id: $category_id) {
      id
      name
      logo_url
      category_id
    }
  }
`;
