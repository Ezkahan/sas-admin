import { gql } from "@apollo/client";

export const DELETE_DOCUMENTATION = gql`
  mutation DeleteDoc($id: ID!) {
    deleteDoc(id: $id)
  }
`;
