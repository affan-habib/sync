import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import ReactTable from "../../components/tables/ReactTable";
import { ColumnDef } from "@tanstack/react-table";
import { Container } from "@mui/material";
import axios from "axios"; // Import Axios for API calls

const SalesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState<any[]>([]); // Using 'any' type for orders

  useEffect(() => {
    axios.get("https://apps.syyn.shop/api/admin/orders/list")
      .then(response => {
        setOrders(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const totalCount = orders.length;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleOrders = orders.slice(startIndex, startIndex + rowsPerPage);

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
      cell: (cell) => `$${cell.row.original.total_amount}`,
    },
    // You can add more columns for other details if needed
  ];

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <div>
          <h1 style={{ marginBottom: 20 }}>List of Orders</h1>
          <ReactTable
            columns={columns}
            data={visibleOrders}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            totalCount={totalCount}
            currentPage={currentPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </div>
      </Container>
    </DashboardLayout>
  );
};

export default SalesPage;
