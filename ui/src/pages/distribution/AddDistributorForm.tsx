import React from "react";

import { Role as DistributorRole } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Distribution/Distributor";
import { Fund } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Model";
import { emptyMap, Party } from "@daml/types";
import { MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { userContext } from "../../config";
import FundManagementContext from "../../store/fund-management-context";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  currentIsinCode: string;
};

const AddDistributorForm = (props: Props) => {
  const fundManagementContext = React.useContext(FundManagementContext);
  const currentParty = userContext.useParty();
  const ledger = userContext.useLedger();

  const addDistributorHandler = async (distributorToAdd: Party) => {
    // only fundManager will see add distributor button and execute this handler
    const fundManager = currentParty;
    const fundKey: Fund.Key = {
      _1: { map: emptyMap<string, {}>().set(fundManager, {}) },
      _2: props.currentIsinCode,
    };

    await ledger.exerciseByKey(Fund.ProposeDistributionAgreement, fundKey, {
      distributor: distributorToAdd,
    });
  };

  const handleConfirmation = () => {
    addDistributorHandler(selectedDistributor);
    props.setOpen(false);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const distributorList = userContext.useStreamQuery(DistributorRole).contracts;
  const distributorMenuItems = distributorList.map((distributor) => {
    const currentDistributor = distributor.payload.distributor;
    return (
      <MenuItem key={currentDistributor} value={currentDistributor}>
        {fundManagementContext.idToDisplayName(currentDistributor)}
      </MenuItem>
    );
  });

  const [selectedDistributor, setSelectedDistributor] = React.useState("");

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Add Distributor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose a selectedDistributor for fund distribution
          </DialogContentText>
          <Select
            labelId="selectedDistributor-select-label"
            id="selectedDistributor-select"
            value={selectedDistributor}
            label="selectedDistributor"
            onChange={(event) => {
              setSelectedDistributor(event.target.value);
            }}
            displayEmpty
          >
            {/* todo judy modify default value properly */}
            <MenuItem value="">Choose a distributor...</MenuItem>
            {distributorMenuItems}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmation}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDistributorForm;
