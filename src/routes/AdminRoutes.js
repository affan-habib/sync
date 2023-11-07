import PrivateRoute from "components/common/PrivateRoute";
import { DashboardLayout } from "components/layouts/DashboardLayout";
import Dashboard from "features/dashboard/Dashboard";

const AdminRoutes = {

  path: "/",
  element: (
    <>
      <DashboardLayout />
    </>
  ),
  children: [
    {
      path: "",
      element: <Dashboard />,
    },
  ],
};

export default AdminRoutes;
