import React from "react";
import { Divider, Grid, TextField, Typography } from "@mui/material";

interface PaymentInfoProps {
  paymentData: {
    status: string;
    total_amount: string;
    payment_method: string;
    currency: string;
    reference: string;
    // Add more payment-related properties here if needed
  };
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ paymentData }) => {
  return (
    <div>
      <Typography variant="subtitle1" my={2}>
        Payment Details
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Status"
            value={paymentData.status}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Total Amount"
            value={`${paymentData.currency} ${paymentData.total_amount}`}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Payment Method"
            value={paymentData.payment_method}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12} md={3}>
          <TextField
            label="Currency"
            value={paymentData.currency}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid> */}
        <Grid item xs={12} md={3}>
          <TextField
            label="Reference"
            value={paymentData.reference}
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

export default PaymentInfo;
