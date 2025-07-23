// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const initialForm = {
  username: "",
  email: "",
  password: "",
  mobileNumber: "",
  aadhaarNumber: "",
  panNumber: "",
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  addressLine1: "",
  role: "USER"
};

const Register = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setError(
        err?.message?.includes("already") ? "User already exists." :
        err?.message || "Registration failed."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="col-md-7 col-lg-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="mb-2 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-control" name="firstName" value={form.firstName} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-control" name="lastName" value={form.lastName} onChange={handleChange} required />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Username</label>
                  <input type="text" className="form-control" name="username" value={form.username} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input type="text" className="form-control" name="mobileNumber" value={form.mobileNumber} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input type="date" className="form-control" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Aadhaar Number</label>
                  <input type="text" className="form-control" name="aadhaarNumber" value={form.aadhaarNumber} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">PAN Number</label>
                  <input type="text" className="form-control" name="panNumber" value={form.panNumber} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select className="form-select" name="gender" value={form.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" name="addressLine1" value={form.addressLine1} onChange={handleChange} required />
              </div>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              {success && <div className="alert alert-success py-2">Registration successful. Redirecting to login...</div>}
              <button className="btn btn-success w-100 mt-2" type="submit" disabled={submitting}>
                {submitting ? "Registering..." : "Register"}
              </button>
            </form>
            <div className="text-center mt-3">
              Already have an account? <Link to="/login">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
