import React from "react";
import { ColDef, ICellRendererParams } from "ag-grid-community";

import { Fund } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Model";
import { Button } from "@mui/material";

import { userContext } from "../../config";
import TableGrid from "./Common/TableGrid";
import { DistributionCommonProps } from "./config";
import { DistributionAgreement } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Distribution/Model";
import { FaHandshake, FaHandshakeSlash } from "react-icons/fa";

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

  if (props.common.fundManagerRole) {
    fundColDefs.push({
      field: "isinCode",
      headerName: "Add Distributor",
      cellRenderer: addDistributorButtonRenderer,
    });
  }

  // todo judy why can't put it into below
  const agreements = userContext.useStreamQuery(
    DistributionAgreement
  ).contracts;

  if (props.common.distributorRole) {
    fundColDefs.push({
      field: "isinCode",
      headerName: "Agreement Made",
      cellRenderer: (param: ICellRendererParams) => {
        const agreement = agreements.find(
          (agreement) =>
            agreement.payload.isinCode == param.value &&
            agreement.payload.distributor == props.common.currentParty
        );
        return agreement ? (
          <FaHandshake size="28" />
        ) : (
          <FaHandshakeSlash size="28" />
        );
      },
    });
  }

  return <TableGrid title={title} rowData={funds} colDefs={fundColDefs} />;
};

export default FundList;
