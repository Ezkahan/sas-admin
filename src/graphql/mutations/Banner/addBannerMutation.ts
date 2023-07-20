import { gql } from "@apollo/client";

export const ADD_BANNER = gql`
  mutation AddBanner(
    $link: String
    $image: Upload!
    $category_id: ID
    $position: String!
    $type: String!
  ) {
    addBanner(
      link: $link
      image: $image
      category_id: $category_id
      position: $position
      type: $type
    ) {
      id
      link
      image_url
      visited_count
      category_id
      position
      type
    }
  }
`;
