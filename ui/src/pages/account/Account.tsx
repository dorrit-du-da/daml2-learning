// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Service } from '@daml.js/da-marketplace/lib/Marketplace/Custody/Service';

import { DataGrid } from "../../components/datagrid/Grid"
import { userContext } from "../../config";
import { ColDef } from "./config"

const Account: React.FC = () => {
  // const username = userContext.useParty();
  const classes = useStyles();

  const allAssetDeposits = userContext.useStreamQueries(Service).contracts;
  const rowData: any[] =[]
  allAssetDeposits.map(( i )=>( rowData.push(i.payload) ))

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
        <Typography gutterBottom variant="h4"  className={classes.titlepad}>
          Account
        </Typography>
      </Grid>
      <DataGrid
        gridData={ rowData || []}
        colDef={ColDef}
        size={{ width: "100%", height: 300 }}
      />
        <DataGrid
        gridData={ rowData || []}
        colDef={ColDef}
        size={{ width: "100%", height: 300 }}
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
      fontWeight: "bold"
    },
  })
);
