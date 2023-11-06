
import { Box } from "@mui/material";
import { DashboardLayout } from "components/layouts/DashboardLayout";
import LoginPage from "features/auth/LoginPage";


const PublicRoutes = {
  path: "/",
  children: [
    {
      path: "login",
      element: <LoginPage />,
    },

    {
      path: "*",
      element: <h2>not Fount page</h2>,
    },

  ],
};

export default PublicRoutes;
