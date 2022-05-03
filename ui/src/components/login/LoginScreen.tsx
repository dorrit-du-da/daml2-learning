// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from "react";
import { Grid, Form,  Header, Image, Segment } from "semantic-ui-react";
import { createStyles, makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Credentials, { PublicParty } from "../../Credentials";
import Ledger from "@daml/ledger";
import {
  DamlHubLogin as DamlHubLoginBtn,
  usePublicParty,
} from "@daml/hub-react";
import logoSVG from "../../image/header_logo.jpeg";
import { authConfig, Insecure } from "../../config";
import Typography from "@mui/material/Typography";
import { experimentalStyled as styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";

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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const wrap: (c: JSX.Element) => JSX.Element = (component) => (
    <>
   {/* <Grid
      container
      className={classes.root}
      alignItems="center"
      justifyContent="center"
    >
      <Card className={classes.card}>
      <Grid container spacing={2}>

      <Grid item xs={12}>
      <img className={classes.img}  src={logoSVG} alt="logo" />
        </Grid>
        </Grid>
        <Grid item xs={12}>
        <Form size="large" className="test-select-login-screen">
          <Segment>{component}</Segment>
        </Form>
        </Grid>
     <img className={classes.img}  src={logoSVG} alt="logo" />
        <Button variant="contained" color="primary">
          Hello World
        </Button> 
      </Card>
    </Grid> */}
<Grid textAlign="center" style={{ height: "100vh"}} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 550 ,  background: "#fff" }}>
      <img className={classes.img}  src={logoSVG} alt="logo" />
        <Header
          as="h1"
          textAlign="center"
          size="huge"
          style={{ backgroundColor:"white", color: "black" }}>
          <Header.Content>
            Fund Management & Distribution Demo
          </Header.Content>
        </Header>
        <Form  size="large" className="test-select-login-screen">
          <Segment>{component}</Segment>
        </Form>
      </Grid.Column>
    </Grid> 
    </>
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

      const useGetPublicParty = (): PublicParty => {
        const [publicParty, setPublicParty] = useState<string | undefined>(
          undefined
        );
        const setup = () => {
          const fn = async () => {
            const publicParty = await auth.userManagement
              .publicParty(username, ledger)
              .catch((error) => {
                const errorMsg =
                  error instanceof Error
                    ? error.toString()
                    : JSON.stringify(error);
                alert(
                  `Failed to find primary party for user '${username}':\n${errorMsg}`
                );
                throw error;
              });
            // todo stop yolowing error handling
            setPublicParty(publicParty);
          };
          fn();
        };
        return { usePublicParty: () => publicParty, setup: setup };
      };
      await login({
        user: { userId: username, primaryParty: primaryParty },
        party: primaryParty,
        token: auth.makeToken(username),
        getPublicParty: useGetPublicParty,
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
              getPublicParty: () => ({
                usePublicParty: () => usePublicParty(),
                setup: () => {},
              }),
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

export default LoginScreen;

const useStyles = makeStyles((theme) =>
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
      justifyContent: "center"
    },
    card: {
      minWidth: "40%",
      minHeight: "40vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff!important"
    }
  })
);
