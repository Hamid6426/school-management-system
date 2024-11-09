import { useState, useEffect } from 'react';
import CourseModal from '../../../components/Modals/CourseModal';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleAddCourse = () => { setCurrentCourse(null); setShowModal(true); };
  const handleEditCourse = (course) => { setCurrentCourse(course); setShowModal(true); };
  const handleDeleteCourse = async (id) => {
    if (confirm('Are you sure you want to delete this course?')) {
      await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      setCourses(courses.filter((course) => course._id !== id));
    }
  };
  const handleModalClose = () => { setShowModal(false); setCurrentCourse(null); };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h1>Manage Courses</h1>
      <div className="mb-3 d-flex justify-content-between">
        <input type="text" className="form-control w-50" placeholder="Search courses by title..." value={searchQuery} onChange={handleSearch} />
        <button className="btn btn-primary" onClick={handleAddCourse}>Add New Course</button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Instructor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course, index) => (
            <tr key={course._id}>
              <td>{index + 1}</td>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.duration}</td>
              <td>{course.instructor}</td>
              <td>
                <button className="btn btn-warning btn-sm mx-2" onClick={() => handleEditCourse(course)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCourse(course._id)}>Delete</button>
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
            if (currentCourse) {
              setCourses(courses.map((c) => (c._id === updatedCourse._id ? updatedCourse : c)));
            } else {
              setCourses([...courses, updatedCourse]);
            }
            handleModalClose();
          }}
        />
      )}
    </div>
  );
}
