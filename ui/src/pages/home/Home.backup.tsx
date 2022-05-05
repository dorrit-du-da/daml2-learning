import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Module from "../../components/module/Module";
import logoSVG from "../../image/wallet.jpeg";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item />
      <Grid item>
        <Typography gutterBottom variant="h4" className={classes.titlepad}>
          Home
        </Typography>
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={6}>
          <Module
            link="account"
            title="Account"
            description="Manage multiple assets"
            logo={logoSVG}
          />
        </Grid>
        <Grid item xs={6}>
          <Module
            link="registration/view"
            title="Registration"
            description="Register your fund"
            logo={logoSVG}
          />
        </Grid>
        <Grid item xs={6}>
          <Module
            link="distribution"
            title="Distribution"
            description="Distribute fund with distributors"
            logo={logoSVG}
          />
        </Grid>
        <Grid item xs={6}>
          <Module
            link="subscription"
            title="Subscription"
            description="Subscribe funds"
            logo={logoSVG}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;

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
