// FilterProduct.tsx
import React, { useState } from "react";
import {
  OutlinedInput,
  SvgIcon,
  InputAdornment,
  Stack,
  ButtonGroup,
  Button,
} from "@mui/material";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { ImportDialog } from "features/importing/ImportDialog";

interface SearchOrderProps {
  search: string;
  setSearch: (search: string) => void;
}

interface StatusProps {
  status: string | null;
  setStatus: (status: string | null) => void;
}

const FilterProduct: React.FC<SearchOrderProps & StatusProps> = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  // Function to handle status change
  const handleStatusChange = (newStatus: string | null) => {
    setStatus(newStatus);
  };

  const [showImportDialog, setShowImportDialog] = useState(false);

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      justifyContent="space-between"
      mb={3}
    >
      {showImportDialog && (
        <ImportDialog
          show={showImportDialog}
          hide={() => setShowImportDialog(false)}
        />
      )}
      {/* Search Input */}
      <OutlinedInput
        fullWidth
        placeholder="Search Product"
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 500 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button
        style={{ marginLeft: "auto" }}
        startIcon={
          <SvgIcon fontSize="small">
            <ArrowUpOnSquareIcon />
          </SvgIcon>
        }
        onClick={() => setShowImportDialog(true)}
      >
        Import from CSV
      </Button>

      {/* Button Group for Status */}
      <ButtonGroup variant="outlined" color="primary">
        <Button
          onClick={() => handleStatusChange(null)}
          variant={status === null ? "contained" : "outlined"}
        >
          All
        </Button>
        <Button
          onClick={() => handleStatusChange("active")}
          variant={status === "active" ? "contained" : "outlined"}
        >
          Active
        </Button>
        <Button
          onClick={() => handleStatusChange("inactive")}
          variant={status === "inactive" ? "contained" : "outlined"}
        >
          Inactive
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default FilterProduct;
