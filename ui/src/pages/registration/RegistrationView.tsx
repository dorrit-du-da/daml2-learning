// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RowClickedEvent } from "ag-grid-community";
import { createStyles, makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";

import { FundRegistrationRequest } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Registration/Model";

import { DataGrid } from "../../components/datagrid/Grid";
import { DataGrid2 } from "../../components/datagrid/GridTest";
import ProgressStatus from "./ProgressStatus";
import { userContext, damlSetValues } from "../../config";
import {
  fundRegistrationRequestsWithActionColDef,
  frameworkComponents,
  SignedParties,
  // changeRowColor,
} from "./config";

const RegistrationView: React.FC = () => {
  const classes = useStyles();
  const [signedParties, setSignedParties] = useState<SignedParties>({
    fundAdmin: false,
    transferAgent: false,
    settlementAgent: false,
    investmentManager: false,
  });
  const [activeStep, setActiveStep] = useState<number>(-1);

  const allFundRegistrationRequests = userContext.useStreamQueries(
    FundRegistrationRequest
  ).contracts;

  const rowData: any[] = [];
  allFundRegistrationRequests.map((i) => {
    let obj = { contractId: i.contractId, ...i.payload };
    rowData.push(obj);
  });

  const rowClickHandler = (event: RowClickedEvent) => {
    const signed = damlSetValues(event.data.signed);
    const parties = {
      fundAdmin: event.data.fundAdmin,
      transferAgent: event.data.transferAgent,
      settlementAgent: event.data.settlementAgent,
      investmentManager: event.data.investmentManager,
    };
    for (const [name, value] of Object.entries(parties)) {
      setSignedParties((prevState) => ({
        ...prevState,
        [name]: signed.includes(value),
      }));
    }
    const accountStatus = event.data.openAccountStatus.tag;
    switch (accountStatus) {
      case "REQUESTED":
        setActiveStep(1);
        break;
      case "COMPLETED":
        setActiveStep(2);
        break;
      default:
        console.log(`not support status: ${accountStatus}.`);
    }
  };

  return (
    <Grid container sx={{ minWidth: "130vh" }} spacing={1}>
      <Grid item />
      <Grid item xs={12}>
        <ProgressStatus signedParties={signedParties} activeStep={activeStep} />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography gutterBottom variant="h4" className={classes.titlepad}>
            Registration - Request
          </Typography>
        </Grid>
        <Grid item>
          <Link to={"/registration/new"}>
            <Button size="large" className={classes.button} variant="contained">
              New
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Grid item container>
        <DataGrid
          gridData={rowData || []}
          colDef={fundRegistrationRequestsWithActionColDef}
          size={{ width: "100%", height: 300 }}
          frameworkComponents={frameworkComponents}
          rowClickHandler={rowClickHandler}
        />
      </Grid>
    </Grid>
  );
};

export default RegistrationView;

const darkTheme = createTheme({ palette: { mode: "dark" } });

const useStyles = makeStyles(() =>
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
    button: {
      "&.MuiButton-contained": {
        backgroundColor: "#fbcd14",
        width: "100%",
      },
    },
  })
);
