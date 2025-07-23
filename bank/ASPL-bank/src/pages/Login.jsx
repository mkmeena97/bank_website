import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // For feedback/UI state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err?.message?.includes("Invalid") ? "Invalid username or password." : (err?.message || "Login failed")
      );
    }
    setSubmitting(false);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="col-md-5 col-lg-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="mb-4 text-center">Sign In</h2>
            <form onSubmit={handleSubmit} autoComplete="username">
              <div className="mb-3">
                <label htmlFor="login-username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="login-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  required
                  autoComplete="username"
                  disabled={submitting}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="login-password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="login-password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={submitting}
                />
              </div>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={submitting}
              >
                {submitting ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <div className="text-center mt-3">
              <span>Don't have an account? </span>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
