// ProductPage.tsx
import React, { useState } from "react";
import { Container } from "@mui/material";
import FilterProduct from "./FilterProduct";
import useDebounce from "hooks/useDebounce";
import OrderTable from "./ProductTable";
import MainCard from "components/cards/MainCard";

const ProductPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [status, setStatus] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  return (
    <>
      <Container maxWidth="xl">
        <MainCard title="Products">
          <FilterProduct
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
          />
          <OrderTable
            sortOrder={sortOrder}
            debouncedSearch={debouncedSearch}
          // statusFilter={status} 
          />
        </MainCard>
      </Container>
    </>
  );
};

export default ProductPage;
