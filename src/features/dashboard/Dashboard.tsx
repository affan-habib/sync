import React from "react";
import { DashboardLayout } from "components/layouts/DashboardLayout";
import { Container, Typography } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography variant="h1" component="h1">
          Coming Soon
        </Typography>
      </Container>
    </DashboardLayout>
  );
};

export default Dashboard;
