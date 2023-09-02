import React from "react";
import { Divider, Grid, TextField, Typography } from "@mui/material";

interface CustomerInfoProps {
  user: any;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ user }) => {
  return (
    <div>
      <Typography variant="subtitle1" my={2}>
        Customer Info
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Full Name"
            value={user.full_name}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Email"
            value={user.email}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Phone Number"
            value={user.phone_number}
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

export default CustomerInfo;
