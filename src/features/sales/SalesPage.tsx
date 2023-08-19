import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import ReactTable from "../../components/tables/ReactTable";
import { ColumnDef } from "@tanstack/react-table";
import { Container, Chip } from "@mui/material"; // Import Chip component
import axios from "axios";

const SalesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(0);
  const [orders, setOrders] = useState<any[]>([]); // Using 'any' type for orders

  useEffect(() => {
    fetchOrders(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const fetchOrders = (page: number, perPage: number) => {
    axios
      .get(`https://apps.syyn.shop/api/admin/orders/list?page=${page}&per_page=${perPage}`)
      .then(response => {
        setOrders(response.data.data);
        setTotalPages(response.data.last_page);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const columns: ColumnDef<any, any>[] = [
    {
      header: "Order Number",
      cell: (cell) => cell.row.original.id,
    },
    {
      header: "Customer Name",
      cell: (cell) => cell.row.original.user.full_name,
    },
    {
      header: "Total Amount",
      cell: (cell) => (
        <div>
          <span>{cell.row.original.currency}</span>
          <span style={{ marginLeft: "4px" }}>{`${cell.row.original.total_amount}`}</span>
        </div>
      ),
    },
    {
      header: "Status",
      cell: (cell) => (
        <Chip
          label={cell.row.original.status}
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
      cell: (cell) => cell.row.original.payment_method,
    },
    // ... other columns
  ];

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <div>
          <h1 style={{ marginBottom: 20 }}>List of Orders</h1>
          <ReactTable
            columns={columns}
            data={orders}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            totalCount={totalPages * rowsPerPage}
            currentPage={currentPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </div>
      </Container>
    </DashboardLayout>
  );
};

export default SalesPage;
