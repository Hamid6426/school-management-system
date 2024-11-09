import { useState, useEffect } from 'react';

export default function CourseModal({ course, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    instructor: '',
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        duration: course.duration,
        instructor: course.instructor,
      });
    }
  }, [course]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(course ? `/api/courses/${course._id}` : '/api/courses', {
      method: course ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    onSave(data);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "#777" }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content bg-dark2 text-dark">
          <div className="modal-header">
            <h5 className="modal-title">{course ? 'Edit Course' : 'Add Course'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input type="text" name="title" placeholder="Course Title" className="form-control mb-2" value={formData.title} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" className="form-control mb-2" value={formData.description} onChange={handleChange} required />
              <input type="text" name="duration" placeholder="Duration" className="form-control mb-2" value={formData.duration} onChange={handleChange} />
              <input type="text" name="instructor" placeholder="Instructor" className="form-control mb-2" value={formData.instructor} onChange={handleChange} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              <button type="submit" className="btn btn-primary">{course ? 'Save Changes' : 'Add Course'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
