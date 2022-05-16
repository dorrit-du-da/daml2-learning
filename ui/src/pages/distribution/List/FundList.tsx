import React, { useContext } from "react";
import { ColDef, ICellRendererParams } from "ag-grid-community";

import { Fund } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Model";
import { Button, CircularProgress } from "@mui/material";

import { userContext } from "../../../config";
import TableGrid from "../../../components/tableGrid/TableGrid";
import { DistributionAgreement } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Distribution/Model";
import { FaHandshake, FaHandshakeSlash } from "react-icons/fa";
import FundManagementContext from "../../../store/fund-management-context";

type Props = {
  setIsinCode: (isinCode: string) => void;
  setOpen: (open: boolean) => void;
};

const FundList: React.FC<Props> = (props: Props) => {
  const fundManagementContext = useContext(FundManagementContext);
  const currentParty = userContext.useParty();

  let funds = userContext
    .useStreamQueries(Fund, () => {
      return [{ isinCode: "" }, {}];
    })
    .contracts.map((createdEvent) => createdEvent.payload);

  let fundColDefs: ColDef[] = [
    { field: "title", filter: true },
    { field: "investmentStrategy" },
    { field: "investmentObjective" },
    { field: "isinCode", filter: true },
  ];

  const addDistributorButtonRenderer = (params: ICellRendererParams) => {
    return fundManagementContext.isLoading ? (
      <CircularProgress size={20} />
    ) : (
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
      sortable: false,
      headerName: "Add Distributor",
      cellRenderer: addDistributorButtonRenderer,
    });
  }

  const agreements = userContext.useStreamQueries(DistributionAgreement, () => [
    { distributor: currentParty },
  ]).contracts;

  if (fundManagementContext.distributorRole) {
    fundColDefs.push({
      field: "isinCode",
      headerName: "Agreement Made",
      cellRenderer: (param: ICellRendererParams) => {
        const agreement = agreements.find(
          (agreement) => agreement.payload.isinCode === param.value
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
