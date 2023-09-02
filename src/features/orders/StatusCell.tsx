import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { apiBaseUrl } from "config";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import ConfirmModal from "components/common/ConfirmModal";

interface StatusCellProps {
  row: any; // Define the appropriate type for your row data
}

const StatusCell: React.FC<StatusCellProps> = ({ row }) => {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState(row.status);
  const [originalStatus, setOriginalStatus] = useState(row.status);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#FF9800"; // Orange
      case "processing":
        return "#2196F3"; // Blue
      case "delivered":
        return "#4CAF50"; // Green
      case "canceled":
        return "#F44336"; // Red
      default:
        return "#000000"; // Black (fallback)
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus);
    setOriginalStatus(selectedStatus); // Save the original status before the change
    setIsConfirmModalOpen(true);
  };

  const confirmStatusChange = async () => {
    if (selectedStatus === "canceled") {
      setSelectedStatus(originalStatus); // Revert to the original status if canceled
    } else {
      try {
        await fetch(`${apiBaseUrl}/orders/${row.id}/status`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: selectedStatus }),
        });

        queryClient.invalidateQueries("sales");
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }

    setIsConfirmModalOpen(false);
  };

  const statusColor = getStatusColor(selectedStatus);

  return (
    <div>
      <Select
        value={selectedStatus}
        onChange={(event) => handleStatusChange(event.target.value)}
        style={{ color: statusColor }} // Apply color based on status
        size="small"
      >
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="processing">Processing</MenuItem>
        <MenuItem value="delivered">Delivered</MenuItem>
        <MenuItem value="canceled">Canceled</MenuItem>
      </Select>
      <ConfirmModal
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmStatusChange}
        onCancel={() => setSelectedStatus(originalStatus)} // Handle canceling the confirmation modal
        message="Are you sure you want to change the status?"
      />
    </div>
  );
};

export default StatusCell;
