// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useState } from 'react'
import { PublicParty } from '../Credentials';
import { userContext } from '../config';
import clsx from 'clsx'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import {  makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppMenu from './appMenu/AppMenu'
import Account from '../pages/account/Account'
import Home from '../pages/home/Home'
import RegistrationView from '../pages/registration/RegistrationView'
import RegistrationForm from '../pages/registration/RegistrationForm'
import { createTheme } from '@mui/material/styles';

type Props = {
  onLogout: () => void;
  getPublicParty : () => PublicParty;
}

const toAlias = (userId: string): string =>
  userId.charAt(0).toUpperCase() + userId.slice(1);


const PageOrders = () => <Typography variant="h3" component="h1">Orders Page</Typography>
const PageCustomers = () => <Typography variant="h3" component="h1">Distribution Page</Typography>
const PageReports = () => <Typography variant="h3" component="h1">Subscription Page</Typography>


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
              <Route exact path="/"  component={Home} />
              <Route exact path="/account"  component={Account} />
              <Route exact path="/registration/view" component={RegistrationView} />
              <Route exact path="/registration/new" component={RegistrationForm} />
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
const theme = createTheme();

const useStyles = makeStyles((theme:any) => ({
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
    overflow: 'scroll',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

export default MainScreen;
