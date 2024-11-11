import { verifyToken } from "../../../lib/utils/verifyToken";
import Link from "next/link";
import { useState } from "react";

// Example user data for initial state
const exampleUserData = {
  fullName: "Student Name",
  email: "student@example.com",
  phoneNumber: "123-456-7890",
  password: "********",
  notificationPreferences: {
    emailNotifications: true,
    smsNotifications: false,
  },
};

export async function getServerSideProps(context) {
  const token = context.req.cookies.token || "";
  const decodedToken = verifyToken(token);

  if (!decodedToken || decodedToken.role !== "Student") {
    return {
      redirect: {
        destination: "/authentication/login",
        permanent: false,
      },
    };
  }

  // Mock user data for demonstration
  const userData = exampleUserData;

  return {
    props: {
      userData,
    },
  };
}

export default function StudentSettings({ userData }) {
  const [formData, setFormData] = useState(userData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, save to backend (if necessary)
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-100">
      <div
        className="bg-dark1 bg-white py-3 py-md-0 rounded-3 w-100 d-flex flex-md-row flex-column justify-content-between align-items-center px-3"
        style={{ minHeight: "60px" }}
      >
        <h5 className="">Settings</h5>
        <Link
          href="/student-dashboard"
          className="mt-2 mt-md-0 bg-primary text-white py-1 px-4 border-0 rounded-2 text-decoration-none"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Personal Information Section */}
      <div className="card mt-3 shadow-sm border-0">
        <div className="card-header bg-primary text-white">
          <h6>Personal Information</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Security Settings Section */}
      <div className="card mt-3 shadow-sm border-0">
        <div className="card-header bg-secondary text-white">
          <h6>Security Settings</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-control"
              />
              <div className="form-text">
                Update your password for account security.
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Notification Preferences Section */}
      <div className="card mt-3 shadow-sm border-0">
        <div className="card-header bg-info text-white">
          <h6>Notification Preferences</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="emailNotifications"
                name="notificationPreferences.emailNotifications"
                checked={formData.notificationPreferences.emailNotifications}
                onChange={handleInputChange}
                className="form-check-input"
              />
              <label htmlFor="emailNotifications" className="form-check-label">
                Receive Email Notifications
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="smsNotifications"
                name="notificationPreferences.smsNotifications"
                checked={formData.notificationPreferences.smsNotifications}
                onChange={handleInputChange}
                className="form-check-input"
              />
              <label htmlFor="smsNotifications" className="form-check-label">
                Receive SMS Notifications
              </label>
            </div>
          </form>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="d-flex justify-content-end mt-3">
        <button onClick={handleSubmit} className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
}
