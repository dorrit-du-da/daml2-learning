
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export const ColDef = [
  { field: "operator", flex: 2 },
  { field: "provider", flex: 2 },
  { field: "customer", flex: 2 },
]


// {
//   field: "quantity",
//   filter: "agNumberColumnFilter",
//   valueFormatter: (params: any) =>
//       currencyFormatter.format(params.value),
//   flex: 2,
//   type: "leftAligned",
// },
