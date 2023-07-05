import { gql } from "@apollo/client";

export const SAVE_CATEGORY = gql`
  mutation SaveCategory(
    $id: ID
    $icon: Upload
    $image: Upload
    $parent_id: ID
    $name: JSON!
    $description: JSON
  ) {
    saveCategory(
      id: $id
      icon: $icon
      image: $image
      parent_id: $parent_id
      name: $name
      description: $description
    ) {
      id
      name
      description
      icon_url
      image_url
      parent_id
      visited_count
    }
  }
`;
