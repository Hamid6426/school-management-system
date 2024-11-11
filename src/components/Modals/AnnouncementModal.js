import { useState, useEffect } from 'react';

export default function AnnouncementModal({ announcement, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    date: '',
  });

  useEffect(() => {
    if (announcement) {
      setFormData({
        title: announcement.title,
        message: announcement.message,
        date: announcement.date,
      });
    }
  }, [announcement]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(announcement ? `/api/announcements/${announcement._id}` : '/api/announcements', {
      method: announcement ? 'PUT' : 'POST',
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
            <h5 className="modal-title">{announcement ? 'Edit Announcement' : 'Add Announcement'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input type="text" name="title" placeholder="Announcement Title" className="form-control mb-2" value={formData.title} onChange={handleChange} required />
              <textarea name="message" placeholder="Message" className="form-control mb-2" value={formData.message} onChange={handleChange} required />
              <input type="date" name="date" className="form-control mb-2" value={formData.date} onChange={handleChange} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              <button type="submit" className="btn btn-primary">{announcement ? 'Save Changes' : 'Add Announcement'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
