import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

interface MuiTableProps {
  checkboxSelection: boolean;
  columns: any[]; // Define your column types here
  rows: any[]; // Define your row types here
  getRowId: (row: any) => string | number;
  onCellEditCommit?: (params: any) => void;
  hideFooter?: boolean;
  rowCount?: number;
  onPageinationModelChange?: (params: any) => void;
}

const MuiTable: React.FC<MuiTableProps> = ({
  checkboxSelection,
  columns,
  rows,
  getRowId,
  onCellEditCommit,
  hideFooter,
  rowCount,
  onPageinationModelChange,
}) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        pagination
        paginationMode="server"
        onPaginationModelChange={onPageinationModelChange}
        rowCount={rowCount || 0}
        pageSizeOptions={[10, 20, 30]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        checkboxSelection={checkboxSelection}
        density="compact"
        disableColumnMenu
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        hideFooter={hideFooter}
      />
    </div>
  );
};

export default MuiTable;
