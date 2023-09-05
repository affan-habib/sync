import { useState } from "react";
import MuiTable from "components/tables/MuiTable";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableSkeleton from "components/common/TableSkeleton";
import { useProductsQuery } from "hooks/useProductsQuery";
import { Avatar, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useQueryClient } from "react-query";
import { apiBaseUrl } from "config";
import ConfirmModal from "components/common/ConfirmModal";

interface OrdersTableProps {
  debouncedSearch: string;
  sortOrder: string;
}

const ProductTable: React.FC<OrdersTableProps> = ({
  debouncedSearch,
  sortOrder,
}) => {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // State to manage modal open/close
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null
  ); // State to store the product ID to delete

  const deleteProduct = async (productId: number) => {
    try {
      await axios.delete(`${apiBaseUrl}/products/${productId}`);
      queryClient.invalidateQueries("products");
      // Close the modal after successful deletion
      setDeleteModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Event handler for opening the delete confirmation modal
  const handleOpenDeleteModal = (productId: number) => {
    setProductIdToDelete(productId);
    setDeleteModalOpen(true);
  };

  // Event handler for closing the delete confirmation modal
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // Event handler for confirming the delete action in the modal
  const handleConfirmDelete = () => {
    if (productIdToDelete !== null) {
      deleteProduct(productIdToDelete);
    }
  };

  const OrdersColumns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 190,
      renderCell: (params: GridRenderCellParams) => (
        <Stack alignItems="center" direction="row" spacing={2}>
          <Avatar
            src={
              params.value ? params.value : "https://via.placeholder.com/150"
            }
            alt={params.row.name}
            variant="square"
            sx={{
              width: 50,
              height: 50,
            }}
          />
          <Typography variant="subtitle2">
            {params.row.SKUs.join(", ")}
          </Typography>
        </Stack>
      ),
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 120,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
    },
    {
      field: "vendor",
      headerName: "Vendor",
      width: 100,
    },
    {
      field: "video",
      headerName: "Video",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Stack>
          <Avatar
            src="https://via.placeholder.com/150"
            alt={params.row.name}
            variant="square"
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </Stack>
      ),
    },
    {
      field: "stock_quantity",
      headerName: "Stock",
      width: 80,
    },
    {
      field: "previous_price",
      headerName: "Previous Price",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      valueGetter: (params) =>
        moment(params.row.created_at).format("MMM DD, YYYY"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => (
        <Stack spacing={2} direction="row" alignItems="center">
          <VisibilityIcon /> {/* View Icon */}
          <EditIcon /> {/* Edit Icon */}
          <DeleteIcon
            // Open the delete confirmation modal when clicked
            onClick={() => handleOpenDeleteModal(params.row.id)}
          />
        </Stack>
      ),
    },
    // Add more columns here as needed
  ];

  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 15,
  });

  const { data, isLoading, error } = useProductsQuery(
    pagination.page,
    pagination.pageSize,
    debouncedSearch
  );

  const handlePageinationModelChange = (model: any) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: model.page,
      pageSize: model.pageSize,
    }));
  };

  return (
    <div>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <MuiTable
          columns={OrdersColumns}
          rows={data?.data || []}
          getRowId={(row) => row.id}
          onPageinationModelChange={handlePageinationModelChange}
          rowCount={data?.meta?.total || 0}
          paginationModel={{
            page: pagination.page,
            pageSize: pagination.pageSize,
            rowCount: data?.meta?.total || 0,
          }}
        />
      )}

      {/* Render the ConfirmModal */}
      <ConfirmModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default ProductTable;
