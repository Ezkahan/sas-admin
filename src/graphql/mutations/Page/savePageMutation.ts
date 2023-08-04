import { gql } from "@apollo/client";

export const SAVE_PAGE = gql`
  mutation SavePage(
    $id: ID
    $title: JSON!
    $text: JSON!
    $image: Upload
    $position: String!
  ) {
    savePage(
      id: $id
      title: $title
      text: $text
      image: $image
      position: $position
    ) {
      id
      title
      text
    }
  }
`;
