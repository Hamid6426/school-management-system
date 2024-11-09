import { useState, useEffect } from "react";
import ParentModal from "../../../components/Modals/ParentModal"; // Modal component for parent details

export default function ManageParents() {
  const [parents, setParents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentParent, setCurrentParent] = useState(null);

  useEffect(() => {
    // Fetch parents from the API
    const fetchParents = async () => {
      const response = await fetch("/api/parents");
      const data = await response.json();
      setParents(data);
    };
    fetchParents();
  }, []);

  const handleEdit = (parent) => {
    setCurrentParent(parent);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this parent?")) {
      await fetch(`/api/parents/${id}`, { method: "DELETE" });
      setParents(parents.filter((parent) => parent._id !== id));
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentParent(null);
  };

  return (
    <div className="container py-4">
      <h1>Manage Parents</h1>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Add New Parent
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parents.map((parent, index) => (
            <tr key={parent._id}>
              <td>{index + 1}</td>
              <td>{parent.fullName}</td>
              <td>{parent.email}</td>
              <td>{parent.phone}</td>
              <td>
                <button className="btn btn-warning btn-sm mx-2" onClick={() => handleEdit(parent)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(parent._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <ParentModal
          parent={currentParent}
          onClose={handleModalClose}
          onSave={(updatedParent) => {
            setParents((prev) => {
              if (currentParent) {
                return prev.map((p) => (p._id === updatedParent._id ? updatedParent : p));
              } else {
                return [...prev, updatedParent];
              }
            });
            handleModalClose();
          }}
        />
      )}
    </div>
  );
}
