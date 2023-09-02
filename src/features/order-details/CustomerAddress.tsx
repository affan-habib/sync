import React from "react";
import { Divider, Grid, TextField, Typography } from "@mui/material";

interface AddressProps {
  address: {
    address_line_1: string | null;
    address_line_2: string | null;
    type: string;
    region: string | null;
    city: string | null;
    area: string;
    block: string;
    house: string;
    apartment: string | null;
    floor: string | null;
    street: string;
    additional_directions: string | null;
    uuid: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    address_name: string | null;
    phone_number: string;
  };
}

const CustomerAddress: React.FC<AddressProps> = ({ address }) => {
  return (
    <div>
      <Typography variant="subtitle1" my={2}>
        Customer Address
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Address Line 1"
            value={address.address_line_1 || ""}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Address Line 2"
            value={address.address_line_2 || ""}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Type"
            value={address.type}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Region"
            value={address.region || ""}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="City"
            value={address.city || ""}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Area"
            value={address.area}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Block"
            value={address.block}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="House"
            value={address.house}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Apartment"
            value={address.apartment || ""}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Floor"
            value={address.floor || ""}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Street"
            value={address.street}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerAddress;
