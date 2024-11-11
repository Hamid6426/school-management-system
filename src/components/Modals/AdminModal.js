import { useState, useEffect } from "react";

export default function AdminModal({ adminData, onClose, onSave }) {
  const [formData, setFormData] = useState({ fullName: "", email: "" });

  useEffect(() => {
    if (adminData) {
      setFormData({ fullName: adminData.fullName, email: adminData.email });
    }
  }, [adminData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/admin-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const updatedAdmin = await response.json();
    onSave(updatedAdmin);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "#777" }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content bg-dark2 text-dark">
          <div className="modal-header">
            <h5 className="modal-title">Edit Admin Profile</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
