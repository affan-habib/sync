import React from "react";
import { DashboardLayout } from "components/layouts/DashboardLayout";
import { Button, Container, Stack, Typography } from "@mui/material";
import { items } from "components/layouts/config";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div>
          <Typography variant="h1" component="h1">
            Home page Coming soon
          </Typography>
          <Typography variant="subtitle1" component="h1" align="center" gutterBottom>
            Currently you can visit below routes
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
            {items.map((item) => (
              <Button
                variant="contained"
                key={item.path}
                onClick={() => navigate(item.path)}
              >
                {item.path}
              </Button>
            ))}
          </Stack>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
