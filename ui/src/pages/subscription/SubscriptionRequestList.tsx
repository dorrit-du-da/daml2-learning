import React from "react";
import { ICellRendererParams } from "ag-grid-community";

import { Fund } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Model";
import {
  SubscriptionRequest,
  SubscriptionStatus,
} from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Subscription/Service";
import { Button } from "@mui/material";

import TableGrid from "../../components/tableGrid/TableGrid";
import { userContext } from "../../config";
import FundManagementContext from "../../store/fund-management-context";

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

const pendingStatus: SubscriptionStatus = "Pending";

const SubscriptionRequestList = () => {
  const fundManagementContext = React.useContext(FundManagementContext);
  const ledger = userContext.useLedger();

  const subscriptionRequests = userContext
    .useStreamQuery(SubscriptionRequest, () => {
      return { status: pendingStatus };
    })
    .contracts.map((req) => {
      return { ...req.payload, contractId: req.contractId };
    });

  let colDefs = [
    { field: "isinCode" },
    { field: "amount" },
    {
      field: "distributor",
      cellRenderer: (param: ICellRendererParams) =>
        fundManagementContext.idToDisplayName(param.value),
    },
    {
      field: "status",
    },
  ];

  const funds = userContext.useStreamQuery(Fund).contracts;

  const CalculationHandler = () => {
    // exercise Calculate with all the subscription request cid visible/available
    const groups = groupBy(subscriptionRequests, ({ isinCode }) => isinCode);

    Object.entries(groups).forEach(async ([isinCode, requests]) => {
      const cids = requests.map((req) => req.contractId);
      const currentFund = funds.find(
        (fund) => fund.payload.isinCode === isinCode
      );

      if (currentFund) {
        const result = await ledger.exercise(
          Fund.Calculate,
          currentFund.contractId,
          {
            subscriptionRequestCids: cids,
          }
        );

        console.log(result);
      }
    });
  };

  return (
    <>
      {subscriptionRequests && subscriptionRequests.length !== 0 && (
        <div>
          <TableGrid
            title="Pending Subscription Requests"
            colDefs={colDefs}
            rowData={subscriptionRequests}
          ></TableGrid>
          {fundManagementContext.fundAdminRole && (
            <Button variant="contained" onClick={CalculationHandler}>
              Calculate
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default SubscriptionRequestList;
