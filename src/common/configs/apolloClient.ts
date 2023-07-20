import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import i18next from "i18next";
import Cookies from "js-cookie";

const token = Cookies.get("access_token");

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: "http://93.171.223.16/gql",
    // uri: "http://localhost:8000/gql",
    headers: {
      "Accept-Language": i18next.language,
      Authorization: token ? `Bearer ${token}` : "",
    },
  }),
});
