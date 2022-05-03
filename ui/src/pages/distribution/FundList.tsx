import React from "react";
import { ColDef, ICellRendererParams } from "ag-grid-community";

import { Fund } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Model";
import { Role as FundManagerRole } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Role";
import { Button } from "@mui/material";

import { userContext } from "../../config";
import TableGrid from "./Common/TableGrid";
import { DistributionCommonProps } from "./config";

type Props = {
  common: DistributionCommonProps;
  setIsinCode: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FundList: React.FC<Props> = (props: Props) => {
  const title = "Funds";

  let funds = userContext
    .useStreamQuery(Fund)
    .contracts.map((createdEvent) => createdEvent.payload);

  let fundColDefs: ColDef[] = [
    { field: "title", filter: true },
    { field: "investmentStrategy" },
    { field: "investmentObjective" },
  ];

  let fundManagerRole = userContext.useStreamFetchByKey(
    FundManagerRole,
    () => {
      return {
        _1: props.common.operator,
        _2: props.common.currentParty,
      };
    },
    [props.common.currentParty, props.common.operator]
  ).contract;

  const addDistributorButtonRenderer = (params: ICellRendererParams) => {
    return (
      <Button
        variant="contained"
        onClick={() => {
          props.setOpen(true);
          props.setIsinCode(params.value);
        }}
      >
        Add Subscriber
      </Button>
    );
  };

  if (fundManagerRole) {
    fundColDefs.push({
      field: "isinCode",
      headerName: "Add Distributor",
      cellRenderer: addDistributorButtonRenderer,
    });
  }

  return <TableGrid title={title} rowData={funds} colDefs={fundColDefs} />;
};

export default FundList;
