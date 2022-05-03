// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import clsx from 'clsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import Account from '../pages/account/Account';
import Distribution from '../pages/distribution/Distribution';
import Home from '../pages/home/Home';
import Registration from '../pages/registration/Registration';
import AppMenu from './appMenu/AppMenu';

type Props = {
  onLogout: () => void;
}

const toAlias = (userId: string): string =>
  userId.charAt(0).toUpperCase() + userId.slice(1);

const PageHome = () => <Home/>
const PageAccount = () => <Account/>
const PageRegistration = () => <Registration/>
const PageDistribution = () => <Distribution/>


/**
 * React component for the main screen of the `App`.
 */
const MainScreen: React.FC<Props> = ({onLogout}) => {
  const classes = useStyles()

    return (
      <>
      <BrowserRouter>
      <div className={clsx('App', classes.root)}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <AppMenu onLogout={onLogout}/>
        </Drawer>
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>

            <Switch>
              <Route exact path="/"  component={PageHome} />
              <Route exact path="/account"  component={PageAccount} />
              <Route path="/registration" component={PageRegistration} />
              <Route path="/distribution" component={PageDistribution} />
              <Route path="/subscription" component={PageDistribution} />
            </Switch>

          </Container>
        </main>
      </div>
    </BrowserRouter>
      </>
    );
};


const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    background:"black"
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: '#222628',
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

export default MainScreen;
