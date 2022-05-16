import { ICellRendererParams } from "ag-grid-community";
import React, { useContext } from "react";

import { ConfirmedFundResult } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Model";

import TableGrid from "../../../components/tableGrid/TableGrid";
import { userContext } from "../../../config";
import FundManagementContext from "../../../store/fund-management-context";

let ConfirmedFundResultList = () => {
  const fundManagementContext = useContext(FundManagementContext);
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
    { field: "status" },
  ];

  const confirmedResults = userContext
    .useStreamQuery(ConfirmedFundResult)
    .contracts.map((result) => {
      return { ...result.payload, contractId: result.contractId };
    });

  return (
    <>
      {((confirmedResults && confirmedResults.length !== 0) ||
        fundManagementContext.fundManagerRole) && (
        <TableGrid
          title="Confirmed Results for Funds"
          rowData={confirmedResults}
          colDefs={colDefs}
        ></TableGrid>
      )}
    </>
  );
};

export default ConfirmedFundResultList;
