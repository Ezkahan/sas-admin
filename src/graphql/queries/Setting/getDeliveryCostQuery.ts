import { gql } from "@apollo/client";

export const GET_DELIVERY_COST = gql`
  query getDeliveryCosts {
    getDeliveryCosts {
      id
      key
      value
    }
  }
`;
