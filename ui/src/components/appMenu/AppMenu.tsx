import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { List,  } from "@material-ui/core";
import { ListItemText, Typography } from "@mui/material";
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from "@mui/material/Divider";
import IconLibraryBooks from "@material-ui/icons/LibraryBooks";
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
    link: "/registration",
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
  
      <Typography align={'center'} gutterBottom={true} variant ='h6'>You are logged in as {user.userId}.</Typography>
      {appMenuItems.map((item, index) => (
        <AppMenuItem {...item} key={index} />
      ))}
      <Divider variant="middle" className={classes.divider} />

      <AppMenuItemComponent className={classes.menuItem} link={"/#"}onClick={onLogout}>
        <ListItemIcon className={classes.menuItemIcon}>
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
      '&.active': {
        background: 'rgba(0, 0, 0, 0.08)',
        '& .MuiListItemIcon-root': {
          color: '#fff',
        },
      },
    },
    menuItemIcon: {
      color: "#fbcd14",
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
