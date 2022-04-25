// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useState } from 'react'
import { Image, Menu } from 'semantic-ui-react'
// import MainView from './MainView';
// import { User } from '@daml.js/daml2-learning';
import { PublicParty } from '../Credentials';
import { userContext } from '../config';
import clsx from 'clsx'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import AppMenu from './appmenu/AppMenu'
import Account from '../pages/account/Account'
import Home from '../pages/home/Home'
import Registration from '../pages/registration/Registration'


type Props = {
  onLogout: () => void;
  getPublicParty : () => PublicParty;
}

const toAlias = (userId: string): string =>
  userId.charAt(0).toUpperCase() + userId.slice(1);

const PageHome = () => <Home/>
const PageAccount = () => <Account/>
const PageRegistration = () => <Registration/>
const PageOrders = () => <Typography variant="h3" component="h1">Orders Page</Typography>
const PageCustomers = () => <Typography variant="h3" component="h1">Customers Page</Typography>
const PageReports = () => <Typography variant="h3" component="h1">Reports Page</Typography>


/**
 * React component for the main screen of the `App`.
 */
const MainScreen: React.FC<Props> = ({onLogout, getPublicParty}) => {
  const classes = useStyles()
  const user = userContext.useUser();
  const party = userContext.useParty();
  const {usePublicParty, setup} = getPublicParty();
  const setupMemo = useCallback(setup, [setup]);
  useEffect(setupMemo);
  const publicParty = usePublicParty();

  const ledger = userContext.useLedger();

  const [createdUser, setCreatedUser] = useState(false);
  const [createdAlias, setCreatedAlias] = useState(false);

  // const createUserMemo = useCallback(async () => {
  //   try {
  //     let userContract = await ledger.fetchByKey(User.User, party);
  //     if (userContract === null) {
  //       const user = {username: party, following: []};
  //       userContract = await ledger.create(User.User, user);
  //     }
  //     setCreatedUser(true);
  //   } catch(error) {
  //     alert(`Unknown error:\n${JSON.stringify(error)}`);
  //   }
  // }, [ledger, party]);

  // const createAliasMemo = useCallback(async () => {
  //   if (publicParty) {
  //     try {
  //       let userAlias = await ledger.fetchByKey(User.Alias, {_1: party, _2: publicParty});
  //       if (userAlias === null) {
  //          await ledger.create(User.Alias, {username: party, alias: toAlias(user.userId), public: publicParty});
  //       }
  //     } catch(error) {
  //       alert(`Unknown error:\n${JSON.stringify(error)}`);
  //     }
  //     setCreatedAlias(true);
  //   }
  // }, [ledger, user, publicParty, party]);

  // useEffect(() => {createUserMemo();} , [createUserMemo])
  // useEffect(() => {createAliasMemo();} , [createAliasMemo])


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
              <Route path="/distribution" component={PageCustomers} />
              <Route path="/subscription" component={PageReports} />
            </Switch>

          </Container>
        </main>
      </div>
    </BrowserRouter>
        {/* <Menu icon borderless>
          <Menu.Item>
            <Image
              as='a'
              href='https://www.daml.com/'
              target='_blank'
              src='/daml.svg'
              alt='Daml Logo'
              size='mini'
            />
          </Menu.Item>
          <Menu.Menu position='right' className='test-select-main-menu'>
            <Menu.Item position='right'>
              You are logged in as {user.userId}.
            </Menu.Item>
            <Menu.Item
              position='right'
              active={false}
              className='test-select-log-out'
              onClick={onLogout}
              icon='log out'
            />
          </Menu.Menu>
        </Menu>
        <MainView /> */}
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
