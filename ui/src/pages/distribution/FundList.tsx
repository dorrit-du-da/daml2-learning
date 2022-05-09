import React, { useContext } from "react";
import { ColDef, ICellRendererParams } from "ag-grid-community";

import { Fund } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Model";
import { Button } from "@mui/material";

import { userContext } from "../../config";
import TableGrid from "../../components/tableGrid/TableGrid";
import { DistributionAgreement } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Distribution/Model";
import { FaHandshake, FaHandshakeSlash } from "react-icons/fa";
import FundManagementContext from "../../store/fund-management-context";

type Props = {
  setIsinCode: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FundList: React.FC<Props> = (props: Props) => {
  const fundManagementContext = useContext(FundManagementContext);
  const currentParty = userContext.useParty();

  let funds = userContext
    .useStreamQueries(Fund)
    .contracts.map((createdEvent) => createdEvent.payload);

  let fundColDefs: ColDef[] = [
    { field: "title", filter: true },
    { field: "investmentStrategy" },
    { field: "investmentObjective" },
    { field: "isinCode" },
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
        Add Distributor
      </Button>
    );
  };

  if (fundManagementContext.fundManagerRole) {
    fundColDefs.push({
      field: "isinCode",
      headerName: "Add Distributor",
      cellRenderer: addDistributorButtonRenderer,
    });
  }

  const agreements = userContext.useStreamQueries(
    DistributionAgreement
  ).contracts;

  if (fundManagementContext.distributorRole) {
    fundColDefs.push({
      field: "isinCode",
      headerName: "Agreement Made",
      cellRenderer: (param: ICellRendererParams) => {
        const agreement = agreements.find(
          (agreement) =>
            agreement.payload.isinCode === param.value &&
            agreement.payload.distributor === currentParty
        );
        return agreement ? (
          <FaHandshake size="28" />
        ) : (
          <FaHandshakeSlash size="28" />
        );
      },
    });
  }

  return <TableGrid title="Funds" rowData={funds} colDefs={fundColDefs} />;
};

export default FundList;
