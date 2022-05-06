// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import LoginScreen from "./login/LoginScreen";
import MainScreen from "./MainScreen";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DamlHub, {
  damlHubLogout,
  isRunningOnHub,
  usePublicParty,
  usePublicToken,
} from "@daml/hub-react";
import { SnackbarProvider } from "notistack";
import Credentials from "../Credentials";
import { authConfig, userContext, publicContext } from "../config";

/**
 * React component for the entry point into the application.
 */
// APP_BEGIN
const App: React.FC = () => {
  const [credentials, setCredentials] = React.useState<Credentials | undefined>(
    () => {
      const savedCredentials = localStorage.getItem("credentials");
      return savedCredentials ? JSON.parse(savedCredentials) : undefined;
    }
  );

  if (credentials) {
    const PublicPartyLedger: React.FC = ({ children }) => {
      const publicToken = usePublicToken();
      const publicParty = usePublicParty();
      if (publicToken && publicParty) {
        return (
          <publicContext.DamlLedger
            token={publicToken.token}
            party={publicParty}
          >
            {children}
          </publicContext.DamlLedger>
        );
      } else {
        return <h1>Loading ...</h1>;
      }
    };
    const Wrap: React.FC = ({ children }) =>
      isRunningOnHub() ? (
        <DamlHub token={credentials.token}>
          <PublicPartyLedger>{children}</PublicPartyLedger>
        </DamlHub>
      ) : (
        <div>{children}</div>
      );
    return (
      <Wrap>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <userContext.DamlLedger
            token={credentials.token}
            party={credentials.party}
            user={credentials.user}
          >
            <SnackbarProvider>
              <MainScreen
                onLogout={() => {
                  if (authConfig.provider === "daml-hub") {
                    damlHubLogout();
                  }
                  setCredentials(undefined);
                  localStorage.removeItem("credentials");
                }}
              />
            </SnackbarProvider>
          </userContext.DamlLedger>
        </ThemeProvider>
      </Wrap>
    );
  } else {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <LoginScreen
          onLogin={(credentials) => {
            setCredentials(credentials);
            localStorage.setItem("credentials", JSON.stringify(credentials));
          }}
        />
      </ThemeProvider>
    );
  }
};
// APP_END

export default App;

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#222628",
    },
    primary: {
      main: "#fbcd14",
    },
    mode: "dark",
  },
});
