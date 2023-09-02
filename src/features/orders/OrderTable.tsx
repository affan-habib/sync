import MuiTable from "components/tables/MuiTable";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useOrdersQuery } from "hooks/useOrdersQuery";
import { Chip, IconButton, Button } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import moment from "moment";
import { useState } from "react";
import StatusCell from "./StatusCell";
import ScrollableModal from "components/common/ScrollableModal";
import OrderDetails from "../order-details";
import TableSkeleton from "components/common/TableSkeleton";

interface OrdersTableProps {
  debouncedSearch: string;
  handleOpenModal: (items: any) => void;
  sortOrder: string;
}

const OrderTable: React.FC<OrdersTableProps> = ({
  handleOpenModal,
  debouncedSearch,
  sortOrder,
}) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenViewModal = (order: any) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    // setSelectedOrder(null);
  };
  const OrdersColumns: GridColDef[] = [
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      valueGetter: (params) =>
        moment(params.row.created_at).format("MMM DD, YYYY"),
    },
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
      field: "reference",
      headerName: "Reference",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params: GridRenderCellParams) => (
        <StatusCell row={params.row} />
      ),
      width: 150,
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <IconButton onClick={() => handleOpenViewModal(params.row)}>
            <Visibility />
          </IconButton>
        </div>
      ),
    },
  ];

  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 15,
  });

  const { data, isLoading, error } = useOrdersQuery(
    pagination.page,
    pagination.pageSize,
    debouncedSearch,
    sortOrder
  );

  const handlePageinationModelChange = (model: any) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: model.page,
      pageSize: model.pageSize,
    }));
  };

  return (
    <div>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <MuiTable
          columns={OrdersColumns}
          rows={data?.data || []}
          getRowId={(row) => row.id}
          onPageinationModelChange={handlePageinationModelChange}
          rowCount={data?.total || 0}
          paginationModel={{
            page: pagination.page,
            pageSize: pagination.pageSize,
            rowCount: data?.total || 0,
          }}
        />
      )}
      <ScrollableModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        title="Order details"
      >
        <div>
          {selectedOrder && <OrderDetails selectedOrder={selectedOrder} />}
        </div>
      </ScrollableModal>
    </div>
  );
};

export default OrderTable;
