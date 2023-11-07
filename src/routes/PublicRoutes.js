
import { Box } from "@mui/material";
import NotFoundPage from "components/common/NotFoundPage";
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
      element: <NotFoundPage/>,
    },

  ],
};

export default PublicRoutes;
