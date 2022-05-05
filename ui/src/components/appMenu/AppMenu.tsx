import React from "react";
import { createStyles, makeStyles } from '@mui/styles';

import  List  from "@mui/material/List";
import { ListItemText, Typography } from "@mui/material";
import ListItemIcon from '@mui/material//ListItemIcon'
import ListIcon from '@mui/icons-material/List';
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ShareIcon from '@mui/icons-material/Share';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

import { userContext } from '../../config';
import AppMenuItem from "./AppMenuItem";
import AppMenuItemComponent from './AppMenuItemComponent'
import logoSVG from  "../../image/header_logo.jpeg"

const appMenuItems = [
  {
    name: "Home",
    link: "/",
    Icon: HomeIcon,
  },
  {
    name: "Account",
    link: "/account",
    Icon: AccountBalanceWalletIcon,
  },
  {
    name: "Registration",
    link: "/registration/view",
    Icon: AppRegistrationIcon,
  },
  {
    name: "Distribution",
    link: "/distribution",
    Icon: ShareIcon,
  },
  {
    name: "Subscription",
    link: "/subscription",
    Icon: SubscriptionsIcon,
  },
  {
    name: "Placehoder",
    Icon: RocketLaunchIcon,
    items: [
      {
        name: "Level 2",
      },
      {
        name: "Level 2",
        items: [
          {
            name: "Level 3",
          },
          {
            name: "Level 3",
          },
        ],
      },
    ],
  },
];

type Props = {
  onLogout: () => void;
};

const AppMenu: React.FC<Props> = ({ onLogout }) => {
  const classes = useStyles();
  const user = userContext.useUser();

  return (
    <>
    <img className={classes.img}  src={logoSVG} alt="logo" />
    <List component="nav" className={classes.appMenu} disablePadding>
  
      <Typography align={'center'} gutterBottom={true} variant ='h6'>User: {user.userId}.</Typography>
      {appMenuItems.map((item, index) => (
        <AppMenuItem {...item} key={index} />
      ))}
      <Divider variant="middle" className={classes.divider} />

      <AppMenuItemComponent className={classes.menuItem} link={"/#"} onClick={onLogout}>
        <ListItemIcon >
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </AppMenuItemComponent>

    </List>
    </>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    appMenu: {
      width: "100%",
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      '& .MuiListItemIcon-root': {
        color: "#fbcd14",
      },
      '&.active': {
        background: 'rgba(0, 0, 0, 0.08)',
        color: "#fbcd14",
        '& .MuiListItemIcon-root': {
          color: '#fff',
        },
      },
    },
    divider: {
      background: "white",
    },
    img: {
      maxWidth: "100%",
      height: "auto",
      padding: "10px"
    }
  })
);

export default AppMenu;
