// Routes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import ProductsPage from "../features/products/ProductsPage";
import PrivateRoute from "../components/common/PrivateRoute";
import OrdersPage from "../features/orders/OrdersPage";
import Dashboard from "../features/dashboard/Dashboard";

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

export default AppRoutes;
