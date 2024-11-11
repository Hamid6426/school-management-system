// components/AdminSettings.js
import { useState, useEffect } from 'react';

export default function AdminSettings() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage("You need to be logged in.");
        return;
      }

      const response = await fetch('/api/admin-settings', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({
          fullName: data.fullName,
          email: data.email,
          password: '',
          confirmPassword: ''
        });
      } else {
        setErrorMessage('Failed to load user data');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setErrorMessage('');
    const token = localStorage.getItem('token');
    const response = await fetch('/api/admin-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setSuccessMessage('Settings updated successfully');
    } else {
      setErrorMessage('Error updating settings');
    }
  };

  return (
    <div className="container py-4">
      <h1>Admin Account Settings</h1>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Full Name</label>
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
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <h3>Update Password</h3>
        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}
