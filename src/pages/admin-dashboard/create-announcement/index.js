import { useState, useEffect } from 'react';
import AnnouncementModal from '@/components/Modals/AnnouncementModal';

export default function ManageAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const response = await fetch('/api/announcements');
      const data = await response.json();
      setAnnouncements(data);
    };
    fetchAnnouncements();
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleAddAnnouncement = () => { setCurrentAnnouncement(null); setShowModal(true); };
  const handleEditAnnouncement = (announcement) => { setCurrentAnnouncement(announcement); setShowModal(true); };
  const handleDeleteAnnouncement = async (id) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
      setAnnouncements(announcements.filter((announcement) => announcement._id !== id));
    }
  };
  const handleModalClose = () => { setShowModal(false); setCurrentAnnouncement(null); };

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h1>Manage Announcements</h1>
      <div className="mb-3 d-flex justify-content-between">
        <input type="text" className="form-control w-50" placeholder="Search announcements..." value={searchQuery} onChange={handleSearch} />
        <button className="btn btn-primary" onClick={handleAddAnnouncement}>Add New Announcement</button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Message</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAnnouncements.map((announcement, index) => (
            <tr key={announcement._id}>
              <td>{index + 1}</td>
              <td>{announcement.title}</td>
              <td>{announcement.message}</td>
              <td>{new Date(announcement.date).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-warning btn-sm mx-2" onClick={() => handleEditAnnouncement(announcement)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteAnnouncement(announcement._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <AnnouncementModal
          announcement={currentAnnouncement}
          onClose={handleModalClose}
          onSave={(updatedAnnouncement) => {
            if (currentAnnouncement) {
              setAnnouncements(announcements.map((a) => (a._id === updatedAnnouncement._id ? updatedAnnouncement : a)));
            } else {
              setAnnouncements([...announcements, updatedAnnouncement]);
            }
            handleModalClose();
          }}
        />
      )}
    </div>
  );
}
