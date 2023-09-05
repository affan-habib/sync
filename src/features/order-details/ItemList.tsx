import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Typography,
  Divider,
} from "@mui/material";

interface ItemListProps {
  selectedOrderItems: any[];
}

const ItemList: React.FC<ItemListProps> = ({ selectedOrderItems }) => {
  return (
    <>
      <Typography variant="subtitle1" my={2}>
        {selectedOrderItems.length} items
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <TableContainer component={Card} sx={{ minHeight: 200 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedOrderItems.map((item) => {
              return item.product ? (
                <TableRow key={item.id}>
                  <TableCell>{item.product_id}</TableCell>
                  <TableCell>
                    {item.product.skus.length > 0
                      ? item.product.skus[0].sku
                      : ""}
                  </TableCell>
                  <TableCell>{item.product.product_name || ""}</TableCell>
                  <TableCell>{item.product.brand || ""}</TableCell>
                  <TableCell>{item.quantity || ""}</TableCell>
                  <TableCell>
                    {item.currency} {item.price}
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={item.id}>
                  <TableCell colSpan={6}>
                    This Product has been deleted
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ItemList;
