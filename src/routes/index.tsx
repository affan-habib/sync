// Routes.tsx
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/common/PrivateRoute";

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
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <OrdersPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

const LazyRoutes: React.FC = () => {
  return (
    <Suspense fallback={<></>}>
      <AppRoutes />
    </Suspense>
  );
};

export default LazyRoutes;
