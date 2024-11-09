import { useState, useEffect } from "react";
import Link from "next/link";
import StudentModal from "./../../../components/StudentModal";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch student data from the API
    const fetchStudents = async () => {
      const response = await fetch("/api/students"); // Replace with actual API endpoint
      const data = await response.json();
      setStudents(data);
    };
    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      await fetch(`/api/students/${id}`, { method: "DELETE" });
      setStudents(students.filter((student) => student._id !== id));
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentStudent(null);
  };

  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h1>Manage Students</h1>
      <div className="mb-3 d-flex justify-content-between">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search students by name..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Add New Student
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
          {filteredStudents.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.fullName}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mx-2"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(student._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <StudentModal
          student={currentStudent}
          onClose={handleModalClose}
          onSave={(updatedStudent) => {
            setStudents((prev) => {
              if (currentStudent) {
                return prev.map((s) =>
                  s._id === updatedStudent._id ? updatedStudent : s
                );
              } else {
                return [...prev, updatedStudent];
              }
            });
            handleModalClose();
          }}
        />
      )}
    </div>
  );
}
