import { gql } from "@apollo/client";

export const ORDER_CHANGE_STATUS = gql`
  mutation changeStatus($id: ID!, $status: String!) {
    changeStatus(id: $id, status: $status)
  }
`;
