// src/routes/PrivateRoute.jsx
import { useKeycloak } from "@react-keycloak/web";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();
  const location = useLocation();

  // Wait until Keycloak is definitely initialized
  if (!initialized) {
    return <div>Loading authentication...</div>;
  }

  // Keycloak loaded, but auth status unknown: wait for token to load
  if (initialized && typeof keycloak.authenticated === "undefined") {
    // Defensive—shouldn't trigger often, but protects against potential race
    return <div>Checking session...</div>;
  }

  // Only if fully loaded and NOT authenticated, then redirect
  if (initialized && keycloak.authenticated === false) {
    keycloak.login({ redirectUri: window.location.origin + location.pathname });
    return <div>Redirecting to login...</div>;
  }

  // Authenticated: render protected route
  return children;
};


export default PrivateRoute;
