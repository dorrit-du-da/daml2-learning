// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

import { DamlHubLogin as DamlHubLoginBtn } from "@daml/hub-react";
import Ledger from "@daml/ledger";

import { authConfig, Insecure } from "../../config";
import Credentials from "../../Credentials";
import logoSVG from "../../image/header_logo.jpeg";
import { createStyles, makeStyles } from "@mui/styles";

type Props = {
  onLogin: (credentials: Credentials) => void;
};

/**
 * React component for the login screen of the `App`.
 */
const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  const classes = useStyles();
  const login = useCallback(
    async (credentials: Credentials) => {
      onLogin(credentials);
    },
    [onLogin]
  );

  const wrap: (c: JSX.Element) => JSX.Element = (component) => (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 550, background: "#fff" }}>
        <img className={classes.img} src={logoSVG} alt="logo" />
        <Header
          as="h1"
          textAlign="center"
          size="huge"
          style={{ backgroundColor: "white", color: "black" }}
        >
          <Header.Content>
            {"Fund Management & Distribution Demo"}
          </Header.Content>
        </Header>
        <Form size="large" className="test-select-login-screen">
          <Segment>{component}</Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );

  const InsecureLogin: React.FC<{ auth: Insecure }> = ({ auth }) => {
    const [username, setUsername] = React.useState("");

    const handleLogin = async (event: React.FormEvent) => {
      event.preventDefault();
      const token = auth.makeToken(username);
      const ledger = new Ledger({ token: token });
      const primaryParty: string = await auth.userManagement
        .primaryParty(username, ledger)
        .catch((error) => {
          const errorMsg =
            error instanceof Error ? error.toString() : JSON.stringify(error);
          alert(`Failed to login as '${username}':\n${errorMsg}`);
          throw error;
        });
      await login({
        user: { userId: username, primaryParty: primaryParty },
        party: primaryParty,
        token: auth.makeToken(username),
      });
    };

    return wrap(
      <>
        {/* FORM_BEGIN */}
        <Form.Input
          fluid
          placeholder="Username"
          value={username}
          className="test-select-username-field"
          onChange={(e, { value }) => setUsername(value?.toString() ?? "")}
        />
        <Button onClick={handleLogin} variant="contained">
          Login
        </Button>

        {/* FORM_END */}
      </>
    );
  };

  const DamlHubLogin: React.FC = () =>
    wrap(
      <DamlHubLoginBtn
        onLogin={(creds) => {
          if (creds) {
            login({
              party: creds.party,
              user: { userId: creds.partyName, primaryParty: creds.party },
              token: creds.token,
            });
          }
        }}
        options={{
          method: {
            button: {
              render: () => <Button variant="contained">Contained</Button>,
            },
          },
        }}
      />
    );

  return authConfig.provider === "none" ? (
    <InsecureLogin auth={authConfig} />
  ) : authConfig.provider === "daml-hub" ? (
    <DamlHubLogin />
  ) : (
    <div>Invalid configuation.</div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    divider: {
      background: "white",
    },
    img: {
      maxWidth: "50%",
      height: "auto",
      padding: "10px",
    },
    root: {
      minWidth: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    card: {
      minWidth: "40%",
      minHeight: "40vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff!important",
    },
  })
);

export default LoginScreen;
