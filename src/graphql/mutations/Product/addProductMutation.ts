import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct($title: JSON!, $description: JSON!, $image: Upload) {
    addProduct(title: $title, description: $description, image: $image) {
      id
      title
      description
      image
    }
  }
`;
