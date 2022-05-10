import React from "react";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ShareIcon from "@mui/icons-material/Share";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { ListItemText, Typography } from "@mui/material";
import ListItemIcon from "@mui/material//ListItemIcon";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { createStyles, makeStyles } from "@mui/styles";

import { userContext } from "../../config";
import logoSVG from "../../image/header_logo.jpeg";
import FundManagementContext from "../../store/fund-management-context";
import AppMenuItem from "./AppMenuItem";
import AppMenuItemComponent from "./AppMenuItemComponent";

const registration = {
  name: "Registration",
  link: "/registration/view",
  Icon: AppRegistrationIcon,
};

const distribution = {
  name: "Distribution",
  link: "/distribution",
  Icon: ShareIcon,
};

const subscription = {
  name: "Subscription",
  link: "/subscription",
  Icon: SubscriptionsIcon,
};

type Props = {
  onLogout: () => void;
};

const AppMenu: React.FC<Props> = ({ onLogout }) => {
  const classes = useStyles();
  const user = userContext.useUser();
  const fundManagementContext = React.useContext(FundManagementContext);

  const appMenuItemList = React.useMemo(() => {
    // todo judy what if update comes at different times?
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
    ];
    if (
      fundManagementContext.fundManagerRole ||
      fundManagementContext.fundAdminRole ||
      fundManagementContext.investmentManagerRole ||
      fundManagementContext.transferAgentRole
    ) {
      appMenuItems.push(registration);
    }

    if (
      fundManagementContext.fundManagerRole ||
      fundManagementContext.distributorRole
    ) {
      appMenuItems.push(distribution);
    }

    if (
      !fundManagementContext.investmentManagerRole &&
      !fundManagementContext.transferAgentRole &&
      !fundManagementContext.distributorRole
    ) {
      appMenuItems.push(subscription);
    }

    return appMenuItems;
  }, [fundManagementContext]);

  return (
    <>
      <img className={classes.img} src={logoSVG} alt="logo" />
      <List component="nav" className={classes.appMenu} disablePadding>
        <Typography align={"center"} gutterBottom={true} variant="h6">
          User: {user.userId}
        </Typography>
        {appMenuItemList.map((item) => (
          <AppMenuItem {...item} key={item.name} />
        ))}
        <Divider variant="middle" className={classes.divider} />

        <AppMenuItemComponent
          className={classes.menuItem}
          link={"/#"}
          onClick={onLogout}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </AppMenuItemComponent>
      </List>
    </>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles(() =>
  createStyles({
    appMenu: {
      width: "100%",
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      "& .MuiListItemIcon-root": {
        color: "#fbcd14",
      },
      "&.active": {
        background: "rgba(0, 0, 0, 0.08)",
        color: "#fbcd14",
        "& .MuiListItemIcon-root": {
          color: "#fff",
        },
      },
    },
    divider: {
      background: "white",
    },
    img: {
      maxWidth: "100%",
      height: "auto",
      padding: "10px",
    },
  })
);

export default AppMenu;
