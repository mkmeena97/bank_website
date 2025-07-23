// src/pages/Dashboard.jsx
import React from "react";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) {
    // Should not happen due to PrivateRoute, but just in case
    return <div>Loading your information...</div>;
  }

  return (
    <div className="container">
      <div className="py-4">
        <h1 className="mb-3">Welcome, {user.firstName || user.username}!</h1>
        <p>This is your dashboard. Here you can manage your account and view your details.</p>
        <button className="btn btn-outline-danger mt-3" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
