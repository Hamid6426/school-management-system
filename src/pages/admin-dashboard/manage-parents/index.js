import { useState, useEffect } from "react";
import ParentModal from "../../../components/Modals/ParentModal";

export default function ManageParents() {
  const [parents, setParents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentParent, setCurrentParent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch parent data from the API
    const fetchParents = async () => {
      const response = await fetch("/api/parents"); // Replace with actual API endpoint
      const data = await response.json();
      setParents(data);
    };
    fetchParents();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

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

  const filteredParents = parents.filter((parent) =>
    parent.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-4 bg-dark2 text-dark">
      <h1>Manage Parents</h1>
      <div className="mb-3 d-flex justify-content-between">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search parents by name..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Add New Parent
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParents.map((parent, index) => (
            <tr key={parent._id}>
              <td>{index + 1}</td>
              <td>{parent.fullName}</td>
              <td>{parent.email}</td>
              <td>{parent.phone}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mx-2"
                  onClick={() => handleEdit(parent)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(parent._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-dark1 text-dark">
      {showModal && (
        <ParentModal
          parent={currentParent}
          onClose={handleModalClose}
          onSave={(updatedParent) => {
            setParents((prev) => {
              if (currentParent) {
                return prev.map((s) =>
                  s._id === updatedParent._id ? updatedParent : s
                );
              } else {
                return [...prev, updatedParent];
              }
            });
            handleModalClose();
          }}
        />
      )}
      </div>
    </div>
  );
}
