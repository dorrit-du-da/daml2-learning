// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0
import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import RegistrationForm from "./RegistrationForm";

const PageRegistrationForm = () => <RegistrationForm />;

const Registration: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography gutterBottom variant="h4" className={classes.titlepad}>
            Registration
          </Typography>
        </Grid>
        <Grid item>
          <Link to={"/registration/new"}>
            <Button size="large" className={classes.button} variant="contained">New</Button>
          </Link>
        </Grid>
      </Grid>
      <Switch>
        <Route
          exact
          path="/registration/new"
          component={PageRegistrationForm}
        />
      </Switch>
    </>
  );
};

export default Registration;

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
        width: "100%"
      },
    }
  })
);
