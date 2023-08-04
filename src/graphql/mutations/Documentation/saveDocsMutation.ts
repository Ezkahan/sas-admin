import { gql } from "@apollo/client";

export const SAVE_DOCUMENTATION = gql`
  mutation SaveDoc($id: ID, $title: JSON!, $text: JSON!) {
    saveDoc(id: $id, title: $title, text: $text) {
      id
      title
      text
    }
  }
`;
