// SearchOrder.tsx
import React from "react";
import { OutlinedInput, SvgIcon, InputAdornment, Card } from "@mui/material";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";

interface SearchOrderProps {
  search: string;
  setSearch: (search: string) => void;
}

const SearchOrder: React.FC<SearchOrderProps> = ({ search, setSearch }) => {
  return (
    <Card sx={{ p: 2, mb: 4 }}>
      <OutlinedInput
        fullWidth
        placeholder="Search Order"
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
    </Card>
  );
};

export default SearchOrder;
