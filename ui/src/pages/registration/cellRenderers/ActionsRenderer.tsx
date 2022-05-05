import React, { useState } from "react";
import { ICellRendererParams } from "ag-grid-community";
import { userContext, damlSetValues } from "../../../config";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useSnackbar } from "notistack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { FundRegistrationRequest } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Registration/Model";
import { Holdings } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Holdings";
import { Role as FundManagerRole } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Role";
import { Role as FundAdminRole } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/FundAdmin/Role";
import { Role as TransferAgentRole } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/TransferAgent/Role";
import { Role as InvestmentManagerRole } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Investment/Role";

function ActionsRenderer(params: ICellRendererParams) {
  const username = userContext.useParty();
  const ledger = userContext.useLedger();
  const [selected, setSelected] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const checkSelectCondition = () => {
    const fundManagerRole = userContext
      .useStreamQueries(FundManagerRole)
      .contracts.find((c) => c.payload.fundManager == username);
    const fundAdminRole = userContext
      .useStreamQueries(FundAdminRole)
      .contracts.find((c) => c.payload.provider == username);
    const transferAgentRole = userContext
      .useStreamQueries(TransferAgentRole)
      .contracts.find((c) => c.payload.provider == username);
    const investmentManagerRole = userContext
      .useStreamQueries(InvestmentManagerRole)
      .contracts.find((c) => c.payload.provider == username);

    if (fundManagerRole && damlSetValues(params.data.signed).length == 3)
      return [{ value: "finalize", label: "FINALIZE" }];
    else if (damlSetValues(params.data.signed).includes(username)) return [];
    else if (fundAdminRole || investmentManagerRole) return [{ value: "approve", label: "APPORVE" }];
    else if (transferAgentRole)
      return [{ value: "assignAccount", label: "ASSIGN ACCOUNT" }];
    return [];
  };

  const actionHandler = async (event: SelectChangeEvent<string>) => {
    let contractId = params.data.contractId;
    try {
      switch (event.target.value) {
        case "approve":
          await ledger.exercise(FundRegistrationRequest.Sign, contractId, {
            ctrl: username,
          });
          enqueueSnackbar("Approved successfully", { variant: "success" });
          break;
        case "assignAccount":
          await ledger.exercise(
            FundRegistrationRequest.CreateAndAssignAccount,
            contractId,
            {}
          );
          enqueueSnackbar("Assigned account successfully", {
            variant: "success",
          });
          break;
        case "finalize":
          let isinCode = "LU" + Math.floor(Math.random() * 10000000000);
          const output = await ledger.exercise(
            FundRegistrationRequest.Finalize,
            contractId,
            { isinCode }
          );
          enqueueSnackbar("Finalized successfully", { variant: "success" });
          break;
        default:
          console.log(`not support for: ${event.target.value}.`);
      }
    } catch (error) {
      enqueueSnackbar(`Unknown error:\n${JSON.stringify(error)}`, {
        variant: "error",
      });
    }
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={selected}
        onChange={actionHandler}
      >
        {checkSelectCondition().map((menu) => (
          <MenuItem value={menu.value}>{menu.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ActionsRenderer;

{
  /* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
<Select
  labelId="demo-simple-select-standard-label"
  id="demo-simple-select-standard"
  value={selected}
  onChange={actionHandler}
  disabled={disabled}
>
  {checkSelectCondition().map(menu =>   <MenuItem value={menu.value}>{menu.label}</MenuItem>)}
</Select>
</FormControl> */
}
