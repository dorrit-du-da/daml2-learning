import { DealingFrequency, DividendPolicy } from '@daml.js/da-marketplace/lib/Marketplace/FundManagement/Registration/Util';
import ActionsRenderer from './cellRenderers/ActionsRenderer'
import { ICellRendererParams } from "ag-grid-community";

export const dealingFrequencyOptions = [
  {
    value: DealingFrequency.DAILY,
    label: DealingFrequency.DAILY,
  },
  {
    value: DealingFrequency.WEEKLY,
    label: DealingFrequency.WEEKLY,
  },
  {
    value: DealingFrequency.MONTHLY,
    label: DealingFrequency.MONTHLY,
  }
];


export const dividendPolicyOptions = [
  {
    value: DividendPolicy.DISTRIBUTION,
    label: DividendPolicy.DISTRIBUTION,
  },
  {
    value: DividendPolicy.ACCUMULATION,
    label: DividendPolicy.ACCUMULATION,
  }
];

export interface SignedParties {
  fundAdmin: boolean;
  transferAgent: boolean;
  settlementAgent: boolean;
  investmentManager: boolean
}



export const fundRegistrationRequestsColDef = [
  {field: "contractId", flex: 2, hide: true},
  { field: "operator", flex: 2,  hide: true},
  { field: "investmentManager", flex: 2,hide: true },
  { field: "fundAdmin", flex: 2 , hide: true},
  { field: "transferAgent", flex: 2 , hide: true},
  { field: "settlementAgent", flex: 2 , hide: true},
  { field: "openAccountStatus", flex: 2, hide: true},
  { field: "title",flex: 3 , cellStyle: {color: 'red'} },
  { field: "investmentStrategy", flex: 3 },
  { field: "investmentObjective", flex: 3 },
  { field: "dealingFrequency", flex: 2 },
  { field: "minInvestmentAmount",  flex: 3},
  { field: "allInManagementFee", flex: 2 },
  { field: "initialPrice", flex: 2 },
]

export const fundRegistrationRequestsWithActionColDef = [
  ...fundRegistrationRequestsColDef,
  { field: "action", cellRenderer: 'actionsRenderer',flex: 3 },
]

export const frameworkComponents = {
  actionsRenderer: ActionsRenderer
}




export const rowClassRules = {
  // row style function
  'sick-days-warning': function (params:ICellRendererParams) {
    var dealingFrequency = params.data.dealingFrequency;
    return dealingFrequency === "DAILY"
  },
}