import { Chip } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";

export const SalesColumns: ColumnDef<any, any>[] = [
  {
    header: "Order Number",
    cell: (cell) => cell.row.original.id,
  },
  {
    header: "Customer Name",
    cell: (cell) => cell.row.original.user.full_name,
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
    header: "Status",
    cell: (cell) => (
      <Chip
        label={cell.row.original.status}
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
    cell: (cell) => cell.row.original.payment_method,
  },
  // ... other columns
];
