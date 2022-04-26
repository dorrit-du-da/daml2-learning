import React, {useState} from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import MenuItem from '@mui/material/MenuItem';
import { Party } from '@daml/types'

import { DealingFrequency, DividendPolicy } from '@daml.js/da-marketplace/lib/Marketplace/FundManagement/Registration/Util';
import { Alias } from '@daml.js/da-marketplace/lib/Marketplace/FundManagement/Onboarding/Model';
import { Role as FundManagerRole} from '@daml.js/da-marketplace/lib/Marketplace/FundManagement/Role';
import { Id } from '@daml.js/da-marketplace/lib/DA/Finance/Types';
import { Currency } from '@daml.js/da-marketplace/lib/DA/Finance/Instrument/FX/Currency';

import { dealingFrequencyOptions, dividendPolicyOptions } from "./config";
import { userContext, makeDamlSet } from "../../config";

interface FundDetails {
  id: Id;
  title: string;
  investmentStrategy: string;
  investmentObjective: string;
  dealingFrequency: DealingFrequency;
  dividendPolicy: DividendPolicy;
  baseCurrency: Id;
  minInvestmentAmount: string;
  initialPrice: string;
  allInManagementFee: string;
  investmentManager: Party;
  fundAdmin: Party;
  settlementAgent: Party;
  transferAgent: Party
}

const RegistrationForm: React.FC = () => {
  const username = userContext.useParty();
  const ledger = userContext.useLedger();
  const classes = useStyles();
  const [dealingFrequency, setDealingFrequency] = useState<string|undefined>()
  const [dividendPolicy, setDividendPolicy] = useState<string|undefined>()
  const [fundDetails, setFundDetails] = useState<FundDetails>( 
   {id: {
    signatories: makeDamlSet<string>([username]),
    label: "",
    version: "1"
},
    title: "",
    investmentStrategy: "",
    investmentObjective: "",
    dealingFrequency: DealingFrequency.DAILY,
    dividendPolicy: DividendPolicy.DISTRIBUTION,
    baseCurrency: {
      signatories: makeDamlSet<string>([]),
      label: "",
      version: "1"
  },
    minInvestmentAmount: "",
    initialPrice: "",
    allInManagementFee:  "",
    investmentManager:  "",
    fundAdmin:  "",
    settlementAgent:  "",
    transferAgent:  "",
  }
  )
  console.log("username", username)
  console.log("fundDetails", fundDetails)

  const allUsers = userContext.useStreamQueries(Alias,  () => ([{adminUser: true}]), []).contracts
  const allCurrencies = userContext.useStreamQueries(Currency).contracts
  const fundManagerRole = userContext.useStreamQueries(FundManagerRole).contracts.find(c => c.payload.fundManager == username )

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const  currency = allCurrencies.find(c => c.payload.id.label == value )
    setFundDetails((prevState) => ({ ...prevState, [name]: currency?.payload.id }));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFundDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCreation = async(): Promise<boolean> =>{
    try {
      if (fundManagerRole) {
      await ledger.exercise(FundManagerRole.RequestFundRegistration, fundManagerRole?.contractId, {...fundDetails} )}
      else {
        alert("not able to find fund manager role contract");
      }
      return true
    } catch (error){
      alert(`Unknown error:\n${JSON.stringify(error)}`);
      return false
    }
  }

  return (
    <React.Fragment>
      <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" gutterBottom>
          Fund Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="id"
              name="id"
              onChange={handleChange}
              label="Fund ID"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="title"
              name="title"
              onChange={handleChange}
              label="Title"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="investmentStrategy"
              name="investmentStrategy"
              onChange={handleChange}
              label="Investment Strategy"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="investmentObjective"
              name="investmentObjective"
              onChange={handleChange}
              label="Investment Objective"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="dealingFrequency"
              name="dealingFrequency"
              select
              label="Dealing Frequency"
              value={dealingFrequency}
              onChange={handleChange}
              fullWidth
              variant="standard"
            >
              {dealingFrequencyOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
              id="dividendPolicy"
              name="dividendPolicy"
              select
              label="Dividend Policy"
              value={dividendPolicy}
              onChange={handleChange}
              fullWidth
              variant="standard"
            >
              {dividendPolicyOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="baseCurrency"
              name="baseCurrency"
              onChange={handleChange}
              label="Currency"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="baseCurrency"
              name="baseCurrency"
              select
              label="Currency"
              onChange={handleCurrencyChange}
              // value={dividendPolicy}
              fullWidth
              variant="standard"
            >
              {allCurrencies.map((option) => (
                <MenuItem key={option.payload.id.label} value={option.payload.id.label}>
                  {option.payload.id.label}
                </MenuItem>
              ))}
            </TextField>
            </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="minInvestmentAmount"
              name="minInvestmentAmount"
              onChange={handleChange}
              label="Minimum Investment Amount"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="initialPrice"
              name="initialPrice"
              onChange={handleChange}
              label="Initial Price / Unit"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="allInManagementFee"
              name="allInManagementFee"
              onChange={handleChange}
              label="Management Fee(%)"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom>
              Participants
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="investmentManager"
              name="investmentManager"
              select
              label="Investment Manager"
              onChange={handleChange}
              // value={dividendPolicy}
              fullWidth
              variant="standard"
            >
              {allUsers.map((option) => (
                <MenuItem key={option.payload.username} value={option.payload.username}>
                  {option.payload.username.substring(0, option.payload.username.indexOf(':'))}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
              id="fundAdmin"
              name="fundAdmin"
              select
              label="FundAdmin"
              onChange={handleChange}
              // value={dividendPolicy}
              fullWidth
              variant="standard"
            >
              {allUsers.map((option) => (
                <MenuItem key={option.payload.username} value={option.payload.username}>
                 {option.payload.username.substring(0, option.payload.username.indexOf(':'))}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
              id="settlementAgent"
              name="settlementAgent"
              onChange={handleChange}
              select
              label="Settlement Agent"
              fullWidth
              variant="standard"
            >
              {allUsers.map((option) => (
                <MenuItem key={option.payload.username} value={option.payload.username}>
                   {option.payload.username.substring(0, option.payload.username.indexOf(':'))}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
              id="transferAgent"
              name="transferAgent"
              onChange={handleChange}
              select
              label="Transfer Agent"
              fullWidth
              variant="standard"
            >
              {allUsers.map((option) => (
                <MenuItem key={option.payload.username} value={option.payload.username}>
                  {option.payload.username.substring(0, option.payload.username.indexOf(':'))}
                </MenuItem>
              ))}
            </TextField>
            </Grid>

          <Grid
            container
            item
            xs={12}
            sm={12}
            justifyContent="flex-end"
            spacing={2}
          >
            <Grid item xs={12} sm={2}>
              <Button
                size="large"
                className={classes.button}
                variant="contained"
              >
                CANCEL
              </Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                size="large"
                className={classes.button}
                variant="contained"
              >
                CREATE
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default RegistrationForm;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      "&.MuiButton-contained": {
        backgroundColor: "#fbcd14",
        width: "100%",
      },
    },
  })
);
