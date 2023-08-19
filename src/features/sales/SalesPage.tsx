import React, { useState, useMemo } from "react";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import ReactTable from "../../components/tables/ReactTable";
import { Container } from "@mui/material";
import { SalesColumns } from "./SalesColumns";
import { useSalesQuery } from "../../hooks/useSalesQuery";

const SalesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const columns = useMemo(() => SalesColumns, []);

  const { data, isLoading, error } = useSalesQuery(currentPage, rowsPerPage);
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
            <p>Error fetching orders: {error.toString()}</p>
          ) : (
            <ReactTable
              columns={columns}
              data={data?.data}
              onPageChange={onPageChange}
              rowsPerPage={rowsPerPage}
              totalCount={data?.total}
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
