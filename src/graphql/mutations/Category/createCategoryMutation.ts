import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation AddCategory(
    $icon: String
    $image: String
    $parent_id: ID
    $name: JSON!
    $description: JSON
  ) {
    addCategory(
      icon: $icon
      image: $image
      parent_id: $parent_id
      name: $name
      description: $description
    ) {
      id
      name
      description
      icon
      image
      parent_id
      visited_count
    }
  }
`;
