import PrivateRoute from "components/common/PrivateRoute";
import { DashboardLayout } from "components/layouts/DashboardLayout";
import Dashboard from "features/dashboard/Dashboard";

const AdminRoutes = {

  path: "/",
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ],
};

export default AdminRoutes;
