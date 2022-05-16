// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from "react";

import clsx from "clsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";

import Account from "../pages/account/Account";
import Distribution from "../pages/distribution/Distribution";
import Home from "../pages/home/Home";
import RegistrationForm from "../pages/registration/RegistrationForm";
import RegistrationView from "../pages/registration/RegistrationView";
import Subscription from "../pages/subscription/Subscription";
import FundManagementContext from "../store/fund-management-context";
import AppMenu from "./appMenu/AppMenu";

type Props = {
  onLogout: () => void;
};
/**
 * React component for the main screen of the `App`.
 */
const MainScreen: React.FC<Props> = ({ onLogout }) => {
  const classes = useStyles();
  const fundManagementContext = useContext(FundManagementContext);
  return (
    <>
      <BrowserRouter>
        <div className={clsx("App", classes.root)}>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            sx={{
              '& .MuiDrawer-root': {
                  position: 'relative'
              },
              '& .MuiPaper-root': {
                  position: 'relative'
              },
            }}
          >
            <AppMenu onLogout={onLogout} />
          </Drawer>
          <main className={classes.content}>
            {!fundManagementContext.streamLoading && (
              <>
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
                    <Route path="/distribution" component={Distribution} />
                    <Route path="/subscription" component={Subscription} />
                  </Switch>
                </Container>
              </>
            )}
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
