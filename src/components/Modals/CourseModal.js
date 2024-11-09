import { useState, useEffect } from "react";

export default function CourseModal({ course, onClose, onSave }) {
  const [title, setTitle] = useState(course ? course.title : "");
  const [description, setDescription] = useState(course ? course.description : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(course ? `/api/courses/${course._id}` : "/api/courses", {
      method: course ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    const updatedCourse = await response.json();
    onSave(updatedCourse);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>{course ? "Edit Course" : "Add New Course"}</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
    