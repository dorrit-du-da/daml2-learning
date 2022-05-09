import { ColDef, ICellRendererParams } from "ag-grid-community";
import React from "react";

import { ProductList } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Distribution/Model";
import { Fund } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Model";
import { Service as SubscriptionService } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Subscription/Service";
import { Party } from "@daml/types";
import { Button, CircularProgress } from "@mui/material";

import TableGrid from "../../../components/tableGrid/TableGrid";
import { userContext } from "../../../config";
import FundManagementContext from "../../../store/fund-management-context";

type Props = {
  selectedDistributor: Party;
  selectedAccount: string;
  amount: number;
  setIsinCode: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FundSubscriptionList = (props: Props) => {
  const fundManagementContext = React.useContext(FundManagementContext);
  const currentParty = userContext.useParty()
  const services = userContext.useStreamQuery(SubscriptionService).contracts;
  const distributorsAvailable = services.map(
    (service) => service.payload.distributor
  );
  const isinCodes = userContext
    .useStreamQuery(ProductList)
    .contracts.filter((productList) =>
      distributorsAvailable.includes(productList.payload.distributor)
    )
    .flatMap((productList) => productList.payload.isinCodes);
  const isinCodesUniq = new Set(isinCodes);

  const funds = userContext
    .useStreamQuery(Fund)
    .contracts.filter((fund) => isinCodesUniq.has(fund.payload.isinCode))
    .map((fund) => fund.payload);

  let fundColDefs: ColDef[] = [
    { field: "title" },
    { field: "isinCode" },
    { field: "investmentStrategy" },
    { field: "investmentObjective" },
    {
      field: "isinCode",
      headerName: "Subscribe",
      cellRenderer: (param: ICellRendererParams) => {
        return fundManagementContext.isLoading ? (
          <CircularProgress size={20} />
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              props.setOpen(true);
              props.setIsinCode(param.value);
            }}
          >
            Subscribe
          </Button>
        );
      },
    },
  ];

  return (
    <>
      {fundManagementContext.streamLoaded &&
        !fundManagementContext.fundAdminRole &&
        !fundManagementContext.fundManagerRole &&
        currentParty !== fundManagementContext.operator && (
          <TableGrid
            title={"Funds Available For Subscription"}
            rowData={funds}
            colDefs={fundColDefs}
          />
        )}
    </>
  );
};

export default FundSubscriptionList;
