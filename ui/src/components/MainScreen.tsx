// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import clsx from "clsx";
import React, { useCallback, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

import { PublicParty } from "../Credentials";
import Account from "../pages/account/Account";
import Home from "../pages/home/Home";
import RegistrationForm from "../pages/registration/RegistrationForm";
import RegistrationView from "../pages/registration/RegistrationView";
import AppMenu from "./appMenu/AppMenu";

type Props = {
  onLogout: () => void;
  getPublicParty: () => PublicParty;
};

const PageCustomers = () => (
  <Typography variant="h3" component="h1">
    Distribution Page
  </Typography>
);
const PageReports = () => (
  <Typography variant="h3" component="h1">
    Subscription Page
  </Typography>
);

/**
 * React component for the main screen of the `App`.
 */
const MainScreen: React.FC<Props> = ({ onLogout, getPublicParty }) => {
  const classes = useStyles();
  const { setup } = getPublicParty();
  const setupMemo = useCallback(setup, [setup]);
  useEffect(setupMemo);

  return (
    <>
      <BrowserRouter>
        <div className={clsx("App", classes.root)}>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <AppMenu onLogout={onLogout} />
          </Drawer>
          <main className={classes.content}>
            <Container maxWidth="lg" className={classes.container}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/account" component={Account} />
                <Route
                  exact
                  path="/registration/view"
                  component={RegistrationView}
                />
                <Route
                  exact
                  path="/registration/new"
                  component={RegistrationForm}
                />
                <Route path="/distribution" component={PageCustomers} />
                <Route path="/subscription" component={PageReports} />
              </Switch>
            </Container>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
    background: "black",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: "#222628",
    color: "#fff",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "scroll",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default MainScreen;
