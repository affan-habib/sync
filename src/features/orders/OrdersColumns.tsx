import { Button, Chip } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";

export const OrdersColumns: ColumnDef<any, any>[] = [
  {
    header: "Order Number",
    cell: (cell) => cell.row.original.id,
    maxSize: 10,
  },
  {
    header: "Customer Name",
    cell: (cell) => cell.row.original.user.full_name,
  },
  {
    header: "Status",
    cell: (cell) => (
      <Chip
        label={cell.row.original.status.toUpperCase()}
        variant="outlined"
        color={
          cell.row.original.status === "pending"
            ? "warning"
            : cell.row.original.status === "processing"
            ? "info"
            : "default"
        }
      />
    ),
  },
  {
    header: "Payment Method",
    cell: (cell) => (
      <Chip
        label={cell.row.original.payment_method.toUpperCase()}
        variant="filled"
        color={
          cell.row.original.payment_method === "wallet"
            ? "primary"
            : cell.row.original.payment_method === "CreditCard"
            ? "success"
            : cell.row.original.payment_method === "Benefit"
            ? "info"
            : cell.row.original.payment_method === "cash"
            ? "error"
            : "warning"
        }
      />
    ),
  },
  {
    header: "Mobile Num",
    cell: (cell) => cell.row.original.address.phone_number,
  },
  {
    header: "Total Amount",
    cell: (cell) => (
      <div>
        <span>{cell.row.original.currency}</span>
        <span
          style={{ marginLeft: "4px" }}
        >{`${cell.row.original.total_amount}`}</span>
      </div>
    ),
  },
  {
    header: "Total Items", // New column for total number of items
    cell: (cell) => (
      <Button
        style={{ marginLeft: "4px" }}
      >{`${cell.row.original.items.length} items`}</Button>
    ),
  },
];
