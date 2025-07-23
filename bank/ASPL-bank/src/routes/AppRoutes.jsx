import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Layout from "../layout/Layout";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
// import Accounts from "../pages/Accounts";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import AccountDashboard from "../features/accounts/pages/AccountDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Protect all nested routes with Layout */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {/* Default redirect to dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="accounts" element={<AccountDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Catch-all for 404s */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
