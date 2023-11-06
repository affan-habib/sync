import React from "react";
import { Container, Typography } from "@mui/material";
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
          <Typography
            variant="subtitle1"
            component="h1"
            align="center"
            gutterBottom
          >
            Currently you can visit below routes
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
