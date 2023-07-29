import { gql } from "@apollo/client";

export const SAVE_NEWS = gql`
  mutation SaveNews($title: JSON!, $description: JSON!, $image: Upload) {
    saveNews(title: $title, description: $description, image: $image) {
      id
      title
      description
      image_url
    }
  }
`;
