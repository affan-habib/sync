import React, { useState } from "react";
import { Container, Button, Chip, Dialog, Skeleton } from "@mui/material";
import { useSalesQuery } from "hooks/useSalesQuery";
import { DashboardLayout } from "components/layouts/DashboardLayout";
import ReactTable from "components/tables/ReactTable";
import type { ColumnDef } from "@tanstack/react-table";
import ItemList from "./ItemList";

const OrdersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]); // State to hold selected order items

  const { data, isLoading, error } = useSalesQuery(currentPage, rowsPerPage);

  const handleOpenModal = (items: any) => {
    setSelectedOrderItems(items);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          color={
            cell.row.original.payment_method === "wallet"
              ? "primary"
              : cell.row.original.payment_method === "CreditCard"
              ? "success"
              : cell.row.original.payment_method === "Benefit"
              ? "info"
              : cell.row.original.payment_method === "cash"
              ? "error"
              : "warning"
          }
        />
      ),
    },
  ];

  const columns: ColumnDef<any, any>[] = OrdersColumns;

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <div>
          <h1 style={{ marginTop: 60, marginBottom: 20 }}>Orders</h1>
          {isLoading ? (
            // Display Skeleton rows while loading
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} height={100} style={{ marginBottom: 5 }} />
            ))
          ) : error ? (
            <p>Error fetching orders: {error.toString()}</p>
          ) : data ? (
            <ReactTable
              columns={columns}
              data={data.data}
              onPageChange={setCurrentPage}
              rowsPerPage={rowsPerPage}
              totalCount={data.total}
              currentPage={currentPage}
              onChangeRowsPerPage={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setCurrentPage(1);
              }}
            />
          ) : null}
        </div>
        <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="lg">
          <ItemList
            selectedOrderItems={selectedOrderItems}
            onClose={handleCloseModal}
          />
        </Dialog>
      </Container>
    </DashboardLayout>
  );
};

export default OrdersPage;
