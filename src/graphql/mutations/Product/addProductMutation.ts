import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $title: JSON!
    $description: JSON
    $code: String!
    $brand_id: ID!
    $category_id: ID!
    $price: String!
    $discount_type: String
    $discount_amount: Int
    $images: [Upload!]!
  ) {
    addProduct(
      title: $title
      description: $description
      code: $code
      brand_id: $brand_id
      category_id: $category_id
      price: $price
      discount_type: $discount_type
      discount_amount: $discount_amount
      images: $images
    ) {
      id
      title
      code
      price
    }
  }
`;
