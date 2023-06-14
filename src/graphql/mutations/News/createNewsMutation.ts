import { gql } from "@apollo/client";

export const CREATE_NEWS = gql`
  mutation AddNews(
    $title:JSON!
    $description: JSON!
    $image: Upload
  ) {
    addNews(
      title: $title
      description: $description
      image: $image
    ) {
      id
      title
      description
      image
    }
  }
`;
