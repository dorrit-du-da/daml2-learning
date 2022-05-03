import React from 'react';

import {
    Role as DistributorRole
} from '@daml.js/da-marketplace/lib/Marketplace/FundManagement/Distribution/Distributor';
import { Alias } from '@daml.js/da-marketplace/lib/Tests/FundManagement/Setup';
import { emptyMap, Party } from '@daml/types';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { userContext } from '../../config';
import { DistributionCommonProps } from './config';
import { Fund } from '@daml.js/da-marketplace/lib/Marketplace/FundManagement/Model';

type Props = {
  common: DistributionCommonProps,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean
  currentIsinCode: string;
}

const AddDistributorForm = (props: Props) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  const addDistributorHandler = async (
    distributorToAdd: Party
  ) => {
    // only fundManager will see add distributor button and execute this handler
    const fundManager = props.common.currentParty;
    const fundKey: Fund.Key = {
      _1: { map: emptyMap<string, {}>().set(fundManager, {}) },
      _2: props.currentIsinCode,
    };

    await props.common.ledger.exerciseByKey(
      Fund.ProposeDistributionAgreement,
      fundKey,
      { distributor: distributorToAdd }
    );
  };

  const handleConfirmation = () => {
    console.log("send add distributor agreement choice here", selectedDistributor, props.currentIsinCode)
    addDistributorHandler(selectedDistributor)
    props.setOpen(false)
  }

  const aliases = userContext.useStreamQueries(Alias).contracts;

  const distributorList = userContext.useStreamQuery(DistributorRole).contracts;
  const distributorMenuItems = distributorList.map((distributor, i) => {
    const currentDistributor = distributor.payload.distributor;
    const currentAlias = aliases.filter(
      (alias) => alias.key === currentDistributor
    );
    const displayName =
      currentAlias.length != 0 ? currentAlias[0].payload.displayName : "";
    return (
      <MenuItem key={currentDistributor} value={currentDistributor}>
        {displayName}
      </MenuItem>
    );
  });

  const [selectedDistributor, setSelectedDistributor] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    setSelectedDistributor(event.target.value as string);
  };

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
            onChange={handleChange}
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
