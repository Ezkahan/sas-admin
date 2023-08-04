import { gql } from "@apollo/client";

export const GET_DOCUMENTATION = gql`
  query DocDetail($id: ID!) {
    docDetail(id: $id) {
      id
      title
      text
      preview
    }
  }
`;
