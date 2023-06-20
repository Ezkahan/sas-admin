import { gql } from "@apollo/client";

export const DELETE_NEWS = gql`
  mutation DeleteNews($id: ID!) {
    deleteNews(id: $id)
  }
`;
