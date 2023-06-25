import { gql } from "@apollo/client";

export const ADD_BANNER = gql`
  mutation AddBanner(
    $link: String
    $image: String!
    $category_id: ID!
    $position: String!
  ) {
    addBanner(
      link: $link
      image: $image
      category_id: $category_id
      position: $position
    ) {
      id
      link
      image
      visited_count
      category_id
      position
    }
  }
`;
