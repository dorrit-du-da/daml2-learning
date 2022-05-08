import React from "react";
import { ICellRendererParams } from "ag-grid-community";

import { CalculatedFundResult } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Model";
import { ContractId } from "@daml/types";
import { Button } from "@mui/material";

import TableGrid from "../../components/tableGrid/TableGrid";
import { userContext } from "../../config";
import FundManagementContext from "../../store/fund-management-context";

let CalculatedFundResultList = () => {
  const fundManagementContext = React.useContext(FundManagementContext);
  const ledger = userContext.useLedger()
  const colDefs = [
    {
      field: "id",
      headerName: "Title",
      cellRenderer: (param: ICellRendererParams) => param.value.label,
    },
    { field: "isinCode" },
    {
      field: "fundManager",
      cellRenderer: (param: ICellRendererParams) =>
        fundManagementContext.idToDisplayName(param.value),
    },
    { field: "newInvestmentTotalAmount" },
    {
      field: "baseCurrency",
      cellRenderer: (param: ICellRendererParams) => param.value.label,
    },
    { field: "newIssueUnit" },
  ];

  const approveCalculationHandler = async (
    cid: ContractId<CalculatedFundResult>
  ) => {
    const result = await ledger
      .exercise(CalculatedFundResult.ApproveCalculation, cid, {});
    console.log(result);
  };

  if (fundManagementContext.fundManagerRole) {
    colDefs.push({
      field: "contractId",
      cellRenderer: (param: ICellRendererParams) => (
        <Button
          variant="contained"
          onClick={() => approveCalculationHandler(param.value)}
        >
          Approve
        </Button>
      ),
    });
  }

  const calculatedResults = userContext
    .useStreamQuery(CalculatedFundResult)
    .contracts.map((result) => {
      return { ...result.payload, contractId: result.contractId };
    });

  return (
    <>
      {(fundManagementContext.fundAdminRole ||
        fundManagementContext.fundManagerRole) && (
        <TableGrid
          title="Calculated Results for Funds"
          rowData={calculatedResults}
          colDefs={colDefs}
        ></TableGrid>
      )}
    </>
  );
};

export default CalculatedFundResultList;
