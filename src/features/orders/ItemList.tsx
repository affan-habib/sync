import React from "react";
import {
  DialogContent,
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
import { Item } from "types/order";

interface DialogContentProps {
  selectedOrderItems: Item[];
  onClose: () => void;
}

const ItemList: React.FC<DialogContentProps> = ({
  selectedOrderItems,
  onClose,
}) => {
  return (
    <DialogContent sx={{ width: "100%" }}>
      <Typography gutterBottom variant="subtitle1">
        {selectedOrderItems.length} items found
      </Typography>
      <Divider sx={{ my: 2 }} />
      <TableContainer component={Card} sx={{ width: 600, minHeight: 400 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedOrderItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product_id}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  {item.currency} {item.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DialogContent>
  );
};

export default ItemList;
