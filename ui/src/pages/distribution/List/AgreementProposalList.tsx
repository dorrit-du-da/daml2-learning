import React, { useContext } from "react";
import { ColDef, ICellRendererParams } from "ag-grid-community";

import { DistributionAgreementProposal } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Distribution/Model";
import { Button, CircularProgress } from "@mui/material";

import TableGrid from "../../../components/tableGrid/TableGrid";
import { userContext } from "../../../config";
import FundManagementContext from "../../../store/fund-management-context";

const AgreementProposalList = () => {
  const fundManagementContext = useContext(FundManagementContext);
  const currentParty = userContext.useParty();
  const ledger = userContext.useLedger();

  const acceptAgreementHandler = async (isinCode: string) => {
    const currentKey = {
      _1: fundManagementContext.fundManager,
      _2: currentParty,
      _3: isinCode,
    };
    fundManagementContext.startLoading();
    await ledger
      .exerciseByKey(
        DistributionAgreementProposal.AcceptProposal,
        currentKey,
        []
      )
      .catch((error) => fundManagementContext.logError(error))
      .then(() => fundManagementContext.finishLoading());
  };

  // ColDefs START

  const displayNameRenderer = (params: ICellRendererParams) =>
    fundManagementContext.idToDisplayName(params.value);

  let columnDefs: ColDef[] = [
    {
      headerName: "title",
      filter: true,
      field: "fundId",
      cellRenderer: (params: ICellRendererParams) => {
        return params.value.label;
      },
    },
    { field: "isinCode", filter: true },
    {
      field: "fundManager",
      cellRenderer: displayNameRenderer,
    },
  ];

  if (fundManagementContext.fundManagerRole) {
    columnDefs.push({
      field: "distributor",
      filter: true,
      cellRenderer: displayNameRenderer,
    });
  }

  if (fundManagementContext.distributorRole) {
    columnDefs.push({
      headerName: "Accept Agreement",
      field: "isinCode",
      sortable: false,
      cellRenderer: (params: ICellRendererParams) => {
        const isinCode = params.value;
        return fundManagementContext.isLoading ? (
          <CircularProgress size={20} />
        ) : (
          <Button
            variant="contained"
            onClick={() => acceptAgreementHandler(isinCode)}
          >
            Accept
          </Button>
        );
      },
    });
  }

  // ColDefs END

  const proposals = userContext
    .useStreamQuery(DistributionAgreementProposal)
    .contracts.map((createdEvent) => createdEvent.payload);

  return (
    <>
      {proposals && proposals.length !== 0 && (
        <TableGrid
          title="Agreement Proposals"
          rowData={proposals}
          colDefs={columnDefs}
        ></TableGrid>
      )}
    </>
  );
};

export default AgreementProposalList;
