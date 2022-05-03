import { Grid, Typography } from "@mui/material";
import { ColDef } from "ag-grid-community";
import React from "react";
import { DataGrid } from "../../../components/datagrid/Grid";
import styles from "./TableGrid.module.css";

type Props<T> = {
  title: string;
  rowData: T[];
  colDefs: ColDef[];
};

const TableGrid = <T,>(props: Props<T>) => {
  return (
    <Grid
      item
      xs={16}
      container
      direction="column"
      className={styles.maincontent}
    >
      <Grid item>
        <Typography gutterBottom variant="h4" className={styles.titlepad}>
          {props.title}
        </Typography>
      </Grid>
      <DataGrid
        gridData={props.rowData}
        colDef={props.colDefs}
        size={{ width: "100%", height: 300 }}
      />
    </Grid>
  );
};

export default TableGrid;