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
import ItemList from "./ItemList";

interface OrderDetailsProps {
  selectedOrder: {
    id: number;
    customerName: string;
    mobileNumber: string;
    currency: string;
    totalAmount: number;
    address: {
      street: string;
      city: string;
      postalCode: string;
    };
    items: Item[];
    // ... other properties
  };
}

const OrderDetailsComponent: React.FC<OrderDetailsProps> = ({
  selectedOrder,
}) => {
  return (
    <Card>
      <DialogContent>
        <Typography variant="h6">Order Details</Typography>
        <Divider />
        <Typography variant="body1">
          Customer Name: {selectedOrder.customerName}
        </Typography>
        <Typography variant="body1">
          Mobile Number: {selectedOrder.mobileNumber}
        </Typography>
        <Typography variant="body1">
          Total Amount: {selectedOrder.currency} {selectedOrder.totalAmount}
        </Typography>
        <Typography variant="body1">
          Address: {selectedOrder.address.street}, {selectedOrder.address.city},{" "}
          {selectedOrder.address.postalCode}
        </Typography>
        <Typography variant="h6">Order Items</Typography>
        <ItemList
          selectedOrderItems={selectedOrder.items}
          onClose={() => console.log("")}
        />
      </DialogContent>
    </Card>
  );
};

export default OrderDetailsComponent;
