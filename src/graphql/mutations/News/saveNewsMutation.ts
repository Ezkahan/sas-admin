import { gql } from "@apollo/client";

export const SAVE_NEWS = gql`
  mutation SaveNews(
    $id: ID
    $title: JSON!
    $description: JSON!
    $image: Upload
  ) {
    saveNews(id: $id, title: $title, description: $description, image: $image) {
      id
      title
      description
      image_url
    }
  }
`;
