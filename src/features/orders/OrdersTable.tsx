import React, { useState } from "react";
import { useOrdersQuery } from "hooks/useOrdersQuery";
import ReactTable from "components/tables/ReactTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Skeleton, Button, Chip, IconButton, Checkbox } from "@mui/material";
import OrderDetails from "./OrderDetails";
import { Visibility } from "@mui/icons-material";
import ScrollableModal from "components/common/ScrollableModal";
import moment from "moment";

interface OrdersTableProps {
  currentPage: number;
  rowsPerPage: number;
  debouncedSearch: string;
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (perPage: number) => void;
  handleOpenModal: (items: any) => void; // Define the prop
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  currentPage,
  rowsPerPage,
  debouncedSearch,
  setCurrentPage,
  setRowsPerPage,
  handleOpenModal, // Destructure the prop
}) => {
  const { data, isLoading, error } = useOrdersQuery(
    currentPage,
    rowsPerPage,
    debouncedSearch
  );

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

  const OrdersColumns: ColumnDef<any, any>[] = [
    {
      header: "Customer Name",
      cell: (cell) => cell.row.original.user.full_name,
    },
    {
      header: "Mobile Num",
      cell: (cell) => cell.row.original.address.phone_number,
    },
    {
      header: "Total Amount",
      cell: (cell) => (
        <div>
          <span>{cell.row.original.currency}</span>
          <span style={{ marginLeft: "4px" }}>
            {`${cell.row.original.total_amount}`}
          </span>
        </div>
      ),
    },
    {
      header: "Total Items",
      cell: (cell) => (
        <Button
          style={{ marginLeft: "4px" }}
          onClick={() => handleOpenModal(cell.row.original.items)}
        >
          {`${cell.row.original.items.length} items`}
        </Button>
      ),
    },
    {
      header: "Status",
      cell: (cell) => (
        <Chip
          label={cell.row.original.status.toUpperCase()}
          size="small"
          variant="outlined"
          color={
            cell.row.original.status === "pending"
              ? "warning"
              : cell.row.original.status === "processing"
              ? "info"
              : "default"
          }
        />
      ),
    },
    {
      header: "Payment Method",
      cell: (cell) => (
        <Chip
          size="small"
          label={cell.row.original.payment_method.toUpperCase()}
          variant="filled"
          color="primary"
        />
      ),
    },
    {
      header: "Created At", // Add the Created At column
      cell: (cell) => (
        <span>
          {moment(cell.row.original.created_at).format("MMM DD, YYYY")}
        </span>
      ),
    },
    {
      header: "Actions", // Add the Actions column
      cell: (cell) => (
        <div>
          <IconButton onClick={() => handleOpenViewModal(cell.row.original)}>
            <Visibility />
          </IconButton>
          <IconButton>
            <Checkbox checked={cell.row.original.status === "fulfilled"} />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div>
      {isLoading ? (
        // Display Skeleton rows while loading
        Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} height={100} style={{ marginBottom: 5 }} />
        ))
      ) : error ? (
        <p>Error fetching orders: {error.toString()}</p>
      ) : data ? (
        <>
          <ReactTable
            columns={OrdersColumns}
            data={data.data}
            onPageChange={setCurrentPage}
            rowsPerPage={rowsPerPage}
            totalCount={data.total}
            currentPage={currentPage}
            onChangeRowsPerPage={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setCurrentPage(1);
            }}
            rowsPerPageOptions={[10, 15, 30]}
          />

          <ScrollableModal
            isOpen={isViewModalOpen}
            onClose={handleCloseViewModal}
            title="Order details"
          >
            <div>
              {selectedOrder && <OrderDetails selectedOrder={selectedOrder} />}
            </div>
          </ScrollableModal>
        </>
      ) : null}
    </div>
  );
};

export default OrdersTable;
