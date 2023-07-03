import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $title: JSON!
    $description: JSON!
    $code: String
    $brand_id: ID
    $category_id: ID
    $price: String
    $percent: String
    $images: [Upload!]!
  ) {
    addProduct(
      title: $title
      description: $description
      code: $code
      brand_id: $brand_id
      category_id: $category_id
      price: $price
      percent: $percent
      images: $images
    ) {
      id
      title
      description
      code
      price
      brand_id
      category_id
    }
  }
`;
