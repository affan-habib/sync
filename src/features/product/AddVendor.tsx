// AddVendor.tsx

import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Button, Grid, Snackbar } from "@mui/material";
import InputField from "components/form/InputField";
import axios from "axios";
import * as Yup from "yup";

import { useMutation, useQueryClient } from "react-query";
import { apiBaseUrl } from "config";

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required("Full Name is required"),
  display_name: Yup.string().required("Display Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const AddVendor = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const createVendorMutation = useMutation(async (values: any) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/vendor/create`, values);

      queryClient.invalidateQueries("vendors");
      setSnackbarOpen(true); // Show the Snackbar on success
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          full_name: "",
          display_name: "",
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          createVendorMutation.mutate(values);
        }}
      >
        {() => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputField label="Full Name" name="full_name" type="text" />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  label="Display Name"
                  name="display_name"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <InputField label="Email" name="email" type="text" />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Vendor created successfully"
      />
    </>
  );
};

export default AddVendor;
