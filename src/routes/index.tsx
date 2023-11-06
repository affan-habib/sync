// Routes.tsx
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/common/PrivateRoute";
import { DashboardLayout } from "components/layouts/DashboardLayout";

const LoginPage = lazy(() => import("features/auth/LoginPage"));
const Dashboard = lazy(() => import("features/dashboard/Dashboard"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={<></>}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/"
        element={
          <>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </>
        }
      />
    </Routes>
  );
};

const LazyRoutes: React.FC = () => {
  return <AppRoutes />;
};

export default LazyRoutes;
