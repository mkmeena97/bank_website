// src/routes/PrivateRoute.jsx

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * PrivateRoute component:
 * - Wraps any route that requires authentication.
 * - Uses AuthContext (via useAuth) to check auth state.
 * - Redirects to /login if not authenticated, preserving destination.
 * - Shows loading UI if auth state is being resolved.
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Auth status still being resolved (token/profile load)
    return <div>Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    // Not authenticated: send user to login with post-login redirect to original page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated: show protected content
  return children;
};

export default PrivateRoute;
