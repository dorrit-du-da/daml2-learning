import React, { useState } from "react";
import { ICellRendererParams } from 'ag-grid-community';
import { userContext , damlSetValues} from "../../../config";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useSnackbar } from 'notistack';

import { FundRegistrationRequest} from '@daml.js/da-marketplace/lib/Marketplace/FundManagement/Registration/Model';
import { Holdings} from '@daml.js/da-marketplace/lib/Marketplace/FundManagement/Holdings';


function ActionsRenderer(params: ICellRendererParams){
    const username = userContext.useParty();
    const ledger = userContext.useLedger();
    const [ selected, setSelected ] = useState()
    const { enqueueSnackbar } = useSnackbar();

    const actionHandler = async(event: React.ChangeEvent<HTMLSelectElement>) => {
        let contractId = params.data.contractId
        try {
            switch (event.target.value) {
              case "approve":
                await ledger.exercise(FundRegistrationRequest.Sign, contractId, { ctrl:username } )
                enqueueSnackbar('Approved successfully', { variant: "success" })
                break;
              case "assignAccount":
                await ledger.exercise(FundRegistrationRequest.CreateAndAssignAccount, contractId, {})
                enqueueSnackbar('Assigned account successfully', { variant: "success" })
                break;
              case "finalize":
                let isinCode = "LU" + Math.floor(Math.random() * 10000000000);
                const output = await ledger.exercise(FundRegistrationRequest.Finalize, contractId, {isinCode})
                let holdingsCid = output[0]._1
                // await ledger.exercise(Holdings.AddObserver, holdingsCid, {})
                enqueueSnackbar('Finalized successfully', { variant: "success" }) 
                break;
              default: 
                console.log(`not support for: ${event.target.value}.`);
            }
        } catch (error) {
            enqueueSnackbar(`Unknown error:\n${JSON.stringify(error)}`, { variant: "error" }) 
        }
    }

  return (
    <div>
      <select value={selected} onChange={actionHandler} >
        <option value="select"> SELECT </option>
        <option value="approve"> APPROVE </option>
        <option value="assignAccount"> ASSIGN ACCOUNT </option>
        <option value="finalize"> FINALIZE</option>
      </select>
    </div>
  );
};

export default ActionsRenderer;
