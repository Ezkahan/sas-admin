import { gql } from "@apollo/client";

export const SAVE_SETTING = gql`
  mutation AddSetting($key: String!, $value: JSON!) {
    addSetting(key: $key, value: $value) {
      id
      key
      value
    }
  }
`;
