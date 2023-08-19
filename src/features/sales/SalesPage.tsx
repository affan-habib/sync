import React, { useState, useEffect, useMemo } from "react";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import ReactTable from "../../components/tables/ReactTable";
import { Container } from "@mui/material";
import axios from "axios";
import { SalesColumns } from "./SalesColumns";
import { useSalesQuery } from "../../hooks/useSalesQuery";

const SalesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(0);
  const [orders, setOrders] = useState<any[]>([]);
  const columns = useMemo(() => SalesColumns, []);

  useEffect(() => {
    fetchOrders(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const fetchOrders = (page: number, perPage: number) => {
    axios
      .get(
        `https://apps.syyn.shop/api/admin/orders/list?page=${page}&per_page=${perPage}`
      )
      .then((response) => {
        setOrders(response.data.data);
        setTotalPages(response.data.total);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };
  const { data, isLoading, error, isFetching } = useSalesQuery(
    currentPage,
    rowsPerPage
  );
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <div>
          <h1 style={{ marginBottom: 20 }}>List of Orders</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error fetching orders: {error.message}</p>
          ) : (
            <ReactTable
              columns={columns}
              data={data}
              onPageChange={onPageChange}
              rowsPerPage={rowsPerPage}
              totalCount={data?.length || 0}
              currentPage={currentPage}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
          )}
        </div>
      </Container>
    </DashboardLayout>
  );
};

export default SalesPage;
