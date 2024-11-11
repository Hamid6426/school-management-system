import { useState, useEffect } from "react";
import AdminModal from "@/components/Modals/AdminModal";

export default function AdminSettings() {
  const [adminData, setAdminData] = useState({ fullName: "", email: "" });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch current admin data from the API
    const fetchAdminData = async () => {
      const response = await fetch("/api/admin-settings");
      const data = await response.json();
      setAdminData({ fullName: data.fullName, email: data.email });
    };
    fetchAdminData();
  }, []);

  const handleEdit = () => setShowModal(true);

  const handleModalClose = () => setShowModal(false);

  const handleSave = (updatedAdmin) => {
    setAdminData(updatedAdmin);
    setShowModal(false);
  };

  return (
    <div className="container py-4 bg-dark2 text-dark">
      <h1>Admin Settings</h1>
      <div className="card bg-dark1 text-dark p-4">
        <div>
          <strong>Full Name:</strong> {adminData.fullName}
        </div>
        <div>
          <strong>Email:</strong> {adminData.email}
        </div>
        <button className="btn btn-primary mt-3" onClick={handleEdit}>
          Edit Profile
        </button>
      </div>
      {showModal && (
        <AdminModal
          adminData={adminData}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
