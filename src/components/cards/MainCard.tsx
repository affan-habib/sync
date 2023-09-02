import React from "react";
import { Card, CardContent, Container, Typography } from "@mui/material";

interface MainCardProps {
  title: string;
  children: React.ReactNode;
}

const MainCard: React.FC<MainCardProps> = ({ title, children }) => {
  return (
    <Container maxWidth='xl'>
      <h1 style={{ marginBottom: 20, marginTop: 40 }}>
        {title}
      </h1>
      {children}

    </Container>
  );
};

export default MainCard;
