import { gql } from "@apollo/client";

export const SAVE_BRAND = gql`
  mutation SaveBrand(
    $id: ID
    $logo: Upload
    $name: String!
    $category_id: ID!
  ) {
    saveBrand(id: $id, name: $name, logo: $logo, category_id: $category_id) {
      id
      name
      logo_url
      category_id
    }
  }
`;
