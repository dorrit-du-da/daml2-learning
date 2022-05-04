
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export const colDef = [
  { field: "providerId", flex: 2, hide:true },
  { field: "ownerId", flex: 2 , hide: true},
  { field: "provider", flex: 2 },
  { field: "owner", flex: 2 },
  { field: "accountNameId", flex: 2,  hide:true  },
  { field: "accountName", flex: 2 },
  { field: "account", flex: 2, hide:true  },
]


export const assetDepositColDef = [
  { field: "providerId", flex: 2, hide:true },
  { field: "ownerId", flex: 2 , hide: true},
  { field: "provider", flex: 2 ,  hide: true},
  { field: "owner", flex: 2 ,  hide: true},
  { field: "accountNameId", flex: 2,  hide:true  },
  { field: "accountName", flex: 2 },
  { field: "assetId", flex: 2, hide:true },
  { field: "asset", flex: 2 },
  { field: "quantity", flex: 2 },
]
