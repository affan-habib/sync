import MuiTable from "components/tables/MuiTable";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useOrdersQuery } from "hooks/useOrdersQuery";
import { Chip, IconButton, Button, Checkbox } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import moment from "moment";
import { useState } from "react";

interface OrdersTableProps {
  debouncedSearch: string;
  handleOpenModal: (items: any) => void;
}

const OrderTable: React.FC<OrdersTableProps> = ({
  handleOpenModal,
  debouncedSearch,
}) => {
  const OrdersColumns: GridColDef[] = [
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 1,
      valueGetter: (params) => params.row.user.full_name,
    },
    {
      field: "mobileNum",
      headerName: "Mobile Num",
      width: 150,
      valueGetter: (params) => params.row.address.phone_number,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 150,
      valueGetter: (params) =>
        `${params.row.currency} ${params.row.total_amount}`,
    },
    {
      field: "totalItems",
      headerName: "Total Items",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          style={{ marginLeft: "4px" }}
          onClick={() => handleOpenModal(params.row.items)}
        >
          {`${params.row.items.length} items`}
        </Button>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.row.status.toUpperCase()}
          size="small"
          variant="outlined"
          color={
            params.row.status === "pending"
              ? "warning"
              : params.row.status === "processing"
              ? "info"
              : "default"
          }
        />
      ),
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          size="small"
          label={params.row.payment_method.toUpperCase()}
          variant="filled"
          color="primary"
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      valueGetter: (params) =>
        moment(params.row.created_at).format("MMM DD, YYYY"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <IconButton onClick={() => handleOpenModal(params.row)}>
            <Visibility />
          </IconButton>
          <IconButton>
            <Checkbox checked={params.row.status === "fulfilled"} />
          </IconButton>
        </div>
      ),
    },
  ];

  const [pageSize, setPageSize] = useState<number>(15);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const { data, isLoading, error } = useOrdersQuery(
    pageIndex + 1,
    pageSize,
    debouncedSearch
  );

  const handlePageinationModelChange = (model: any) => {
    setPageIndex(model.page + 1);
    setPageSize(model.pageSize);
  };

  return (
    <div>
      <MuiTable
        checkboxSelection={false}
        columns={OrdersColumns}
        rows={data?.data || []}
        getRowId={(row) => row.id}
        onPageinationModelChange={handlePageinationModelChange}
        rowCount={data?.total || 0}
      />
    </div>
  );
};

export default OrderTable;
