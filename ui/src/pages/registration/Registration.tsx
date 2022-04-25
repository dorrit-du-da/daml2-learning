// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import RegDialog from "./RegDialog"

const Registration: React.FC = () => {
  const classes = useStyles();

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
          Registration
        </Typography>
        <RegDialog/>
      </Grid>
    </Grid>
  );
};

export default Registration;

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
