import { gql } from "@apollo/client";

export const _LOGIN = gql`
  mutation login($phone: String!, $password: String!) {
    login(phone: $phone, password: $password) {
      token
    }
  }
`;

// id
//             name
//             email
//             token,
//             firstname,
//             lastname,
//             photo,
//             birth_day,
//             email,
//             role_id,
//             gender,
//             device,
//             message
