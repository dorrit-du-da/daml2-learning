// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0
import React, {useState} from "react";
import { makeStyles, createStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { RowClickedEvent } from "ag-grid-community";

import { AssetDeposit } from "@daml.js/da-marketplace/lib/DA/Finance/Asset";
import { AccountInfo } from "@daml.js/da-marketplace/lib/Marketplace/Custody/Model";
import { Account as AccountType } from  "@daml.js/da-marketplace/lib/DA/Finance/Types";


import { DataGrid } from "../../components/datagrid/Grid";
import { userContext } from "../../config";
import { colDef, assetDepositColDef } from "./config";

// assetDepositColDef
const Account: React.FC = () => {
  // const username = userContext.useParty();
  const classes = useStyles();
  const [account, setAccount]= useState<string>()
  console.log(account)

  const allAssetDeposits = userContext.useStreamQueries(
    AssetDeposit,() => [], [account]
  ).contracts.filter(c => c.payload.account.id.label == account)

  const depositsRowData: any[] = [];
  allAssetDeposits.map((i) => {
    let prefix = i.payload.account.id.label.split("@")[0];
    let subfix = i.payload.account.id.label.split("@")[1];
    let obj = {
      providerId: i.payload.account.provider,
      ownerId: i.payload.account.owner,
      provider: i.payload.account.provider.split(":")[0],
      owner: i.payload.account.owner.split(":")[0],
      accountNameId: i.payload.account.id.label,
      accountName: prefix.split(":")[0].concat("@", subfix.split(":")[0]),
      asset: i.payload.asset.id.label,
      assetId: i.payload.asset,
      quantity: i.payload.asset.quantity,
    }
    depositsRowData.push(obj);
  })

  const allAccountInfos = userContext.useStreamQueries(AccountInfo).contracts;
  const rowData: any[] = [];
  allAccountInfos.map((i) => {
      let prefix = i.payload.account.id.label.split("@")[0];
      let subfix = i.payload.account.id.label.split("@")[1];
      let obj = {
        account: i.payload.account,
        accountNameId: i.payload.account.id.label,
        accountName: prefix.split(":")[0].concat("@", subfix.split(":")[0]),
        providerId: i.payload.account.provider,
        ownerId: i.payload.account.owner,
        owner: i.payload.account.owner.split(":")[0],
        provider: i.payload.account.provider.split(":")[0],
      };
    rowData.push(obj);
  });

  const rowClickHandler = (event: RowClickedEvent) => {
    setAccount(event.data.accountNameId)
  };


  return (
    <Grid
      item
      xs={16}
      container
      direction="column"
      className={classes.maincontent}
    >
      <Grid item />
      <Grid item>
        <Typography gutterBottom variant="h4" className={classes.titlepad}>
          Account
        </Typography>
      </Grid>
      <DataGrid
        gridData={rowData || []}
        colDef={colDef}
        size={{ width: "100%", height: 250 }}
        rowClickHandler={rowClickHandler}
      />
       <DataGrid
        gridData={depositsRowData || []}
        colDef={assetDepositColDef}
        size={{ width: "100%", height: 250 }}
      />
    </Grid>
  );
};

export default Account;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    fixed: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: "240px",
    },
    maincontent: {
      flexGrow: 1,
      padding: 20,
    },
    titlepad: {
      paddingLeft: 8,
      paddingBottom: 20,
      color: "#fbcd14",
      fontWeight: "bold",
    },
  })
);
