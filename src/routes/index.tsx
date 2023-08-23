// Routes.tsx
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/common/PrivateRoute";
import { DashboardLayout } from "components/layouts/DashboardLayout";

const LoginPage = lazy(() => import("features/auth/LoginPage"));
const ProductsPage = lazy(() => import("features/products/ProductsPage"));
const OrdersPage = lazy(() => import("features/orders/OrdersPage"));
const Dashboard = lazy(() => import("features/dashboard/Dashboard"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Suspense fallback={<></>}>
                <ProductsPage />
              </Suspense>
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <DashboardLayout>
            <PrivateRoute>
              <Suspense fallback={<div></div>}>
                <OrdersPage />
              </Suspense>
            </PrivateRoute>
          </DashboardLayout>
        }
      />
    </Routes>
  );
};

const LazyRoutes: React.FC = () => {
  return <AppRoutes />;
};

export default LazyRoutes;
