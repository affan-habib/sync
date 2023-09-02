import React, { useState } from "react";
import { Card, Container, MenuItem, Select, Stack } from "@mui/material";
import ItemList from "../order-details/ItemList";
import SearchOrder from "./SearchOrder";
import useDebounce from "hooks/useDebounce";
import { Item } from "types/order";
import ScrollableModal from "components/common/ScrollableModal";
import OrderTable from "./OrderTable";

const OrdersPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState<Item[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const debouncedSearch = useDebounce(search, 500);

  const handleOpenModal = (items: any) => {
    setSelectedOrderItems(items);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Container maxWidth="xl">
        <div>
          <h1 style={{ marginTop: 60, marginBottom: 20 }}>Orders</h1>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            component={Card}
            sx={{ p: 2, mb: 4 }}
          >
            <SearchOrder search={search} setSearch={setSearch} />
            <Select
              value={sortOrder}
              onChange={(event) => {
                setSortOrder(event.target.value);
              }}
              sx={{ alignSelf: "center" }}
            >
              <MenuItem value="asc">asc</MenuItem>
              <MenuItem value="desc">desc</MenuItem>
            </Select>
          </Stack>
          <OrderTable
            sortOrder={sortOrder}
            debouncedSearch={debouncedSearch}
            handleOpenModal={handleOpenModal}
          />
        </div>
        <ScrollableModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Order Details"
        >
          <ItemList selectedOrderItems={selectedOrderItems} />
        </ScrollableModal>
      </Container>
    </>
  );
};

export default OrdersPage;
