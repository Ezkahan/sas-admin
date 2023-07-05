import { gql } from "@apollo/client";

export const GET_CATEGORY = gql`
  query category($id: ID!) {
    category(id: $id) {
      id
      name
      description
      icon_url
      image_url
      visited_count
      parent_id
    }
  }
`;
