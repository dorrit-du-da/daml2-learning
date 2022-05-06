import React from "react";

import { AssetDeposit } from "@daml.js/da-marketplace/lib/DA/Finance/Asset";
import { AccountInfo } from "@daml.js/da-marketplace/lib/Marketplace/Custody/Model";
import { Service as SubscriptionService } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Subscription/Service";
import { Party } from "@daml/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { userContext } from "../../config";
import { SubscriptionCommonProps } from "./config";

// todo judy refactor this component with AddDistributorForm
type Props = {
  common: SubscriptionCommonProps;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setSelectedDistributor: React.Dispatch<React.SetStateAction<Party>>;
  selectedDistributor: Party;
  setSelectedAccount: React.Dispatch<React.SetStateAction<string>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  amount: number;
  selectedAccount: string;
  currentIsinCode: string;
  isSubscribing: boolean;
  setIsSubscribing: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubscriptionForm = (props: Props) => {
  const handleClose = () => {
    props.setAmount(0);
    props.setSelectedAccount("");
    props.setOpen(false);
  };

  const handleConfirmation = () => {
    props.setIsSubscribing(true);
    addSubscriptionHandler().then(() => props.setIsSubscribing(false));
    props.setSelectedAccount("");
    props.setAmount(0);
    props.setOpen(false);
  };

  const addSubscriptionHandler = async () => {
    const deposits = await props.common.ledger.query(AssetDeposit);
    const investorAccount = accounts.find(
      (account) => account.id.label === props.selectedAccount
    );
    // todo judy add in currency filter
    const cashDepositCid = deposits.find(
      (deposit) => parseFloat(deposit.payload.asset.quantity) >= props.amount
    )?.contractId;
    // exercise by key subscription service
    if (cashDepositCid && investorAccount) {
      const serviceKey: SubscriptionService.Key = {
        _1: props.selectedDistributor,
        _2: props.common.currentParty,
      };

      let uuid =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      const [result] = await props.common.ledger.exerciseByKey(
        SubscriptionService.Subscribe,
        serviceKey,
        {
          uuid: uuid,
          isinCode: props.currentIsinCode,
          amount: props.amount.toString(),
          cashDepositCid: cashDepositCid,
          investorAccount: investorAccount,
        }
      );
      // todo add error handling
      console.log(result);
    } else {
      // todo judy better error message
      alert("does not have enough cash for current subscription");
    }
  };

  // todo judy maybe put into common?
  const accounts = userContext
    .useStreamQuery(AccountInfo)
    .contracts.map((accountInfo) => accountInfo.payload.account);
  // todo judy refactor this out
  const services = userContext.useStreamQuery(SubscriptionService).contracts;
  const distributorsAvailable = services.map(
    (service) => service.payload.distributor
  );
  const distributorMenuItems = distributorsAvailable.map((distributor) => {
    return (
      <MenuItem key={distributor} value={distributor}>
        {props.common.idToDisplayName(distributor)}
      </MenuItem>
    );
  });

  const accountMenuItems = accounts.map((account) => {
    const accountName = account.id.label;
    return (
      <MenuItem key={accountName} value={accountName}>
        {accountName}
      </MenuItem>
    );
  });

  return (
    // todo judy add form validation for amount
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Fund Subscription</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Indicate the subscription amount, distributor, and account for the
            chosen fund
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item>
              <Select
                labelId="selectedDistributor-select-label"
                id="selectedDistributor-select"
                value={props.selectedDistributor}
                label="selectedDistributor"
                onChange={(event) => {
                  props.setSelectedDistributor(event.target.value);
                }}
                displayEmpty
              >
                {/* todo judy modify default value properly */}
                <MenuItem value="">Choose your distributor...</MenuItem>
                {distributorMenuItems}
              </Select>
            </Grid>
            <Grid item>
              <Select
                labelId="selectedAccount-select-label"
                id="selectedAccount-select"
                value={props.selectedAccount}
                label="selectedAccount"
                onChange={(event) => {
                  props.setSelectedAccount(event.target.value);
                }}
                displayEmpty
              >
                {/* todo judy modify default value properly */}
                <MenuItem value="">
                  Choose your account for holding fund...
                </MenuItem>
                {accountMenuItems}
              </Select>
            </Grid>
            <Grid item>
              <TextField
                type="number"
                label="Amount to Subscribe"
                variant="filled"
                value={props.amount}
                onChange={(event) => {
                  const val = event.target.value;
                  if (val && !isNaN(val as any)) {
                    props.setAmount(parseFloat(val));
                  } else {
                    props.setAmount(NaN);
                  }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmation}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubscriptionForm;
