import { useState, useEffect } from "react";

export default function RoleModal({ role, onClose, onSave }) {
  const [name, setName] = useState(role ? role.name : "");
  const [description, setDescription] = useState(role ? role.description : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(role ? `/api/roles/${role._id}` : "/api/roles", {
      method: role ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    const updatedRole = await response.json();
    onSave(updatedRole);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>{role ? "Edit Role" : "Add New Role"}</h2>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Role Name" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
    