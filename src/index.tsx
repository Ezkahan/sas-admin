import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./common/configs/i18n";
import WebRoutes from "./router/WebRoutes";
import { client } from "./common/configs/apolloClient";
import AuthProvider from "./components/Provider/AuthProvider";
import "../src/assets/css/tailwind.css";

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AuthProvider>
            <WebRoutes />
          </AuthProvider>
        </BrowserRouter>
      </ApolloProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
