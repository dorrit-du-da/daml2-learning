import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material";
import { ColDef, GridApi, RowClickedEvent, GetContextMenuItemsParams, MenuItemDef} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";


const GridStyledWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(2, 1),
  justifyContent: "center",
}));

interface DataGridProps<T> {
  showNoRowsOverlay?: boolean;
  size: { height: number | string; width: number | string };
  gridData: T[];
  colDef: ColDef[];
  frameworkComponents?:any;
  getRowStyle?: any;
  rowClickHandler?: (event: RowClickedEvent) => void ;
}


export const DataGrid2 = <T,>({
  showNoRowsOverlay,
  size,
  gridData,
  frameworkComponents,
  colDef,
  getRowStyle = undefined,
  rowClickHandler = undefined,
}: DataGridProps<T>): JSX.Element => {
  const [gridApi, setGridApi] = useState<GridApi>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const { palette } = useTheme();
  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };



  // const getContextMenuItems =  function getContextMenuItems(params:any) {
  //   return contextMenu
  // }

  useEffect(() => {
    if (showNoRowsOverlay) {
      gridApi?.showNoRowsOverlay();
    }
  }, [gridApi, showNoRowsOverlay]);

  const rowClassRules =  {
    "ag-green": "data.title != 'abc'",
    "ag-amber": "data.amount > 100 && data.amount <= 200",
    "ag-red": "data.amount <= 100",
  }

  return (

    <GridStyledWrapper>
      <div
        className="ag-theme-alpine-dark"
        style={{ ...size }}
      >
        <AgGridReact
          rowData={gridData}
          onGridReady={onGridReady}
          rowSelection={"single"}
          columnDefs={colDef}
          frameworkComponents={frameworkComponents}
          defaultColDef={{
            flex: 1,
            editable: false,
            sortable: true,
            resizable: true,
          }}
          rowClassRules={rowClassRules}
          onRowClicked={event => rowClickHandler?rowClickHandler(event):console.log("no handler")}
        ></AgGridReact>
      </div>
    </GridStyledWrapper>
  );
};
