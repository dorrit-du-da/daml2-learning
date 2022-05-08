import React from "react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { DistributionAgreement } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Distribution/Model";
import TableGrid from "../../components/tableGrid/TableGrid";
import { userContext } from "../../config";
import FundManagementContext from "../../store/fund-management-context";

const AgreementList = () => {
  const fundManagementContext = React.useContext(FundManagementContext)
  const agreements = userContext
    .useStreamQuery(DistributionAgreement)
    .contracts.map((agreement) => agreement.payload);

  const displayNameRenderer = (params: ICellRendererParams) =>
    fundManagementContext.idToDisplayName(params.value);

  let columnDefs: ColDef[] = [
    {
      headerName: "title",
      field: "fundId",
      cellRenderer: (params: ICellRendererParams) => {
        return params.value.label;
      },
    },
    { field: "isinCode" },
    {
      field: "distributor",
      cellRenderer: displayNameRenderer,
    },
  ];

  return (
    <>
      {fundManagementContext.fundManagerRole &&
        agreements &&
        (agreements.length !== 0) && (
          <TableGrid
            title="Agreements"
            rowData={agreements}
            colDefs={columnDefs}
          ></TableGrid>
        )}
    </>
  );
};

export default AgreementList;
