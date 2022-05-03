import React from 'react';

import { ColDef, ICellRendererParams } from 'ag-grid-community';

import {
    DistributionAgreementProposal
} from '@daml.js/da-marketplace/lib/Marketplace/FundManagement/Distribution/Model';
import { Button } from '@mui/material';

import { userContext } from '../../config';
import TableGrid from './Common/TableGrid';
import { DistributionCommonProps } from './config';

type Props = {
  common: DistributionCommonProps;
};

const AgreementProposalList = (props: Props) => {
  const acceptAgreementHandler = async (isinCode: string) => {
    const currentKey = {
      _1: props.common.fundManager,
      _2: props.common.currentParty,
      _3: isinCode,
    };
    await props.common.ledger.exerciseByKey(
      DistributionAgreementProposal.AcceptProposal,
      currentKey,
      []
    );
  };

  // ColDefs START

  const displayNameRenderer = (params: ICellRendererParams) =>
    props.common.idToDisplayName(params.value);
  
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
      field: "fundManager",
      cellRenderer: displayNameRenderer,
    },
  ];

  if (props.common.fundManagerRole) {
    columnDefs.push({
      field: "distributor",
      cellRenderer: displayNameRenderer,
    });
  }

  if (props.common.distributorRole) {
    // todo might need to set this as a state
    columnDefs.push({
      headerName: "Accept Agreement",
      field: "isinCode",
      cellRenderer: (params: ICellRendererParams) => {
        const isinCode = params.value;
        return (
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
    .useStreamQueries(DistributionAgreementProposal)
    .contracts.map((createdEvent) => createdEvent.payload);

  return (
    <>
      {proposals && proposals.length && (
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
