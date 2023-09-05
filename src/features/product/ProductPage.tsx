// ProductPage.tsx
import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import FilterProduct from "./FilterProduct";
import useDebounce from "hooks/useDebounce";
import ProductTable from "./ProductTable";
import MainCard from "components/cards/MainCard";
import ScrollableModal from "components/common/ScrollableModal";
import AddProduct from "./AddProduct";

// Import statements...

const ProductPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [status, setStatus] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false); // Step 2: Modal visibility state

  // Step 3: Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Step 3: Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Container maxWidth="xl">
        <MainCard
          title="Products"
          modalButton={
            <Button variant="outlined" onClick={openModal}>
              Add Product
            </Button>
          }
        >
          <FilterProduct
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
          />
          <ProductTable
            sortOrder={sortOrder}
            debouncedSearch={debouncedSearch}
            // statusFilter={status}
          />
        </MainCard>
      </Container>

      {/* Step 4: Render the modal component */}
      <ScrollableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add Product"
      >
        <AddProduct onClose={closeModal} />
      </ScrollableModal>
    </>
  );
};

export default ProductPage;
