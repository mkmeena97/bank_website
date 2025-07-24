import React from "react";
import useAuth from "../hooks/useAuth";
import { useTheme, Typography, Button, Box, Stack, Divider, Paper } from "@mui/material";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="container py-5 text-danger text-center">
        <h5>No profile data found.</h5>
      </div>
    );

  const renderCol = (label, value) => (
    <div className="col-md-6 mb-4 text-start">
      <strong>{label}:</strong> <span className="ms-1">{value || "-"}</span>
    </div>
  );

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <div className="container py-4">
          <div className="card shadow-sm" style={{ maxWidth: "900px", width: "100%" }}>
            <div className="card-body">
              <h4 className="text-center mb-4">👤 User Profile</h4>

              <div className="row">
                {renderCol("First Name", user.firstName)}
                {renderCol("Last Name", user.lastName)}
                {renderCol("Username", user.username)}
                {renderCol("Email", user.email)}
                {renderCol("Mobile Number", user.mobileNumber)}
                {renderCol("Date of Birth", user.dateOfBirth)}
                {renderCol("Aadhaar Number", user.aadhaarNumber)}
                {renderCol("PAN Number", user.panNumber)}
                {renderCol("Gender", user.gender)}
                {renderCol("Role", user.role)}
                {renderCol("Address", user.addressLine1)}
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </Box>

  );
};

export default Profile;
