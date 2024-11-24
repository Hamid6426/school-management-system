import { useState, useEffect } from 'react';
import TeacherModal from '@/components/Modals/TeacherModal';

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch teachers data
  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await fetch('/api/teachers');
      const data = await response.json();
      setTeachers(data);
    };
    fetchTeachers();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddTeacher = () => {
    setCurrentTeacher(null); // Clear current teacher for new one
    setShowModal(true); // Show modal
  };

  const handleEditTeacher = (teacher) => {
    setCurrentTeacher(teacher);
    setShowModal(true);
  };

  const handleDeleteTeacher = async (id) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
      await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
      setTeachers(teachers.filter((teacher) => teacher._id !== id));
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentTeacher(null);
  };

  // Filter teachers based on search query
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h1>Manage Teachers</h1>
      <div className="mb-3 d-flex justify-content-between">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search teachers by name..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button className="btn btn-primary" onClick={handleAddTeacher}>
          Add New Teacher
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
          {filteredTeachers.map((teacher, index) => (
            <tr key={teacher._id}>
              <td>{index + 1}</td>
              <td>{teacher.fullName}</td>
              <td>{teacher.email}</td>
              <td>{teacher.phone}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mx-2"
                  onClick={() => handleEditTeacher(teacher)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteTeacher(teacher._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show modal if showModal is true */}
      {showModal && (
        <TeacherModal
          teacher={currentTeacher}
          onClose={handleModalClose}
          onSave={(updatedTeacher) => {
            setTeachers((prevTeachers) => {
              if (currentTeacher) {
                return prevTeachers.map((t) =>
                  t._id === updatedTeacher._id ? updatedTeacher : t
                );
              } else {
                return [...prevTeachers, updatedTeacher];
              }
            });
            handleModalClose();
          }}
        />
      )}
    </div>
  );
}
