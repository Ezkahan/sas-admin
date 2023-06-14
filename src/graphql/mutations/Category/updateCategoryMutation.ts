import { gql } from "@apollo/client";

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $id: ID!
    $name: JSON!
    $description: JSON
    $parent_id: ID
  ) {
    updateCategory(
      id: $id
      name: $name
      description: $description
      parent_id: $parent_id
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
