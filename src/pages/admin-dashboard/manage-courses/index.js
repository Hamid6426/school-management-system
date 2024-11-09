import { useState, useEffect } from "react";
import CourseModal from "../../../components/Modals/CourseModal"; // Modal component for course details

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    // Fetch courses from the API
    const fetchCourses = async () => {
      const response = await fetch("/api/courses");
      const data = await response.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  const handleEdit = (course) => {
    setCurrentCourse(course);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this course?")) {
      await fetch(`/api/courses/${id}`, { method: "DELETE" });
      setCourses(courses.filter((course) => course._id !== id));
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentCourse(null);
  };

  return (
    <div className="container py-4">
      <h1>Manage Courses</h1>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Add New Course
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course._id}>
              <td>{index + 1}</td>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>
                <button className="btn btn-warning btn-sm mx-2" onClick={() => handleEdit(course)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(course._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <CourseModal
          course={currentCourse}
          onClose={handleModalClose}
          onSave={(updatedCourse) => {
            setCourses((prev) => {
              if (currentCourse) {
                return prev.map((c) => (c._id === updatedCourse._id ? updatedCourse : c));
              } else {
                return [...prev, updatedCourse];
              }
            });
            handleModalClose();
          }}
        />
      )}
    </div>
  );
}
