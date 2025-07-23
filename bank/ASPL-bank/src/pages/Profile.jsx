// src/pages/Profile.jsx
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user, updateProfile, loading } = useAuth();
  const [form, setForm] = useState(user || {});
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState(""); // For success/error messages
  const [submitting, setSubmitting] = useState(false);

  // Update local form on user context changes (if profile refreshed)
  React.useEffect(() => {
    setForm(user || {});
  }, [user]);

  if (loading) return <div className="container py-5">Loading your profile...</div>;
  if (!user) return <div className="container py-5 text-danger">No profile found.</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("");
    try {
      await updateProfile(form);
      setStatus("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      setStatus(err?.message || "Update failed.");
    }
    setSubmitting(false);
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: 620 }}>
        <div className="card-body">
          <h3 className="mb-3 text-center">Your Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className="row gy-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  className="form-control"
                  name="firstName"
                  disabled={!editing}
                  value={form.firstName || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  className="form-control"
                  name="lastName"
                  disabled={!editing}
                  value={form.lastName || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Username</label>
                <input
                  className="form-control"
                  name="username"
                  disabled
                  value={form.username || ""}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  name="email"
                  disabled={!editing}
                  value={form.email || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Mobile Number</label>
                <input
                  className="form-control"
                  name="mobileNumber"
                  disabled={!editing}
                  value={form.mobileNumber || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input
                  className="form-control"
                  name="dateOfBirth"
                  type="date"
                  disabled={!editing}
                  value={form.dateOfBirth || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Aadhaar Number</label>
                <input
                  className="form-control"
                  name="aadhaarNumber"
                  disabled={!editing}
                  value={form.aadhaarNumber || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">PAN Number</label>
                <input
                  className="form-control"
                  name="panNumber"
                  disabled={!editing}
                  value={form.panNumber || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  disabled={!editing}
                  value={form.gender || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Role</label>
                <input
                  className="form-control"
                  name="role"
                  disabled
                  value={form.role || ""}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Address</label>
                <input
                  className="form-control"
                  name="addressLine1"
                  disabled={!editing}
                  value={form.addressLine1 || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {status && (
              <div className={`alert mt-3 ${status.startsWith("Profile updated") ? "alert-success" : "alert-danger"}`}>
                {status}
              </div>
            )}
            <div className="d-flex justify-content-end gap-2 mt-4">
              {!editing ? (
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setEditing(false);
                      setForm(user); // reset changes
                    }}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Saving..." : "Save Changes"}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
