import React, { useState } from "react";
import { Container, Dialog } from "@mui/material";
import { DashboardLayout } from "components/layouts/DashboardLayout";
import ItemList from "./ItemList";
import SearchOrder from "./SearchOrder";
import OrdersTable from "./OrdersTable";
import useDebounce from "hooks/useDebounce";
import { Item } from "types/order";

const OrdersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState<Item[]>([]);
  const debouncedSearch = useDebounce(search, 500);

  const handleOpenModal = (items: any) => {
    setSelectedOrderItems(items);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <div>
          <h1 style={{ marginTop: 60, marginBottom: 20 }}>Orders</h1>
          <SearchOrder search={search} setSearch={setSearch} />
          <OrdersTable
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            debouncedSearch={debouncedSearch}
            setCurrentPage={setCurrentPage}
            setRowsPerPage={setRowsPerPage}
            handleOpenModal={handleOpenModal}
           
          />
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