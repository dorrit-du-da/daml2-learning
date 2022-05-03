import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import { createStyles, makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { SignedParties } from "./config";
import { userContext } from "../../config";

interface Props {
  signedParties: SignedParties;
  activeStep: number;
}

const ProgressStatus: React.FC<Props> = ({ signedParties, activeStep }) => {
  const classes = useStyles();

  const buttonStyled = {
    color: "#fbcd14",
    "&.Mui-checked": {
      color: "#fbcd14",
    },
    "& .MuiSvgIcon-root": { fontSize: 28 },
  };

  const steps = ["Account request sent", "Account creation completed"];

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <Paper
          className={classes.paper}
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography variant="h6" gutterBottom>
            Progress
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Divider variant="middle" className={classes.divider}>
                Approval Status
              </Divider>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            xs={12}
            sm={12}
          >
            <FormControlLabel
              control={
                <Checkbox checked={signedParties.fundAdmin} sx={buttonStyled} />
              }
              label="Fund Admin"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={signedParties.investmentManager}
                  sx={buttonStyled}
                />
              }
              label="Investment Manager"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={signedParties.transferAgent}
                  sx={buttonStyled}
                />
              }
              label="Transfer Agent"
            />
          </Grid>
          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider}>
              Open Account Status
            </Divider>
          </Grid>

          <Grid
            item
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            xs={12}
            sm={12}
          >
            {" "}
            <Box sx={{ width: "150%" }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconProps={{
                        classes: {
                          root: classes.stepIcon,
                          active: classes.activeStepIcon,
                          completed: classes.activeStepIcon,
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid>
        </Paper>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default ProgressStatus;

const darkTheme = createTheme({ palette: { mode: "dark" } });

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      backgroundColor: "#181d1f",
      color: "white",
    },
    divider: {
      color: "#fbcd14",
      fontSize: "15px",
      padding: "15px",
    },
    button: {
      color: "#fbcd14",
      "&.Mui-checked": {
        color: "#fbcd14",
      },
      "& .MuiSvgIcon-root": { fontSize: 28 },
    },
    stepIcon: {
      color: "#aaaaaa",
    },
    activeStepIcon: {
      color: "#fbcd14 !important",
    },
  })
);
