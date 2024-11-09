import { useState, useEffect } from 'react';

export default function AttendanceModal({ attendanceRecord, onClose, onSave }) {
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (attendanceRecord) {
      setAttendance(attendanceRecord.attendance);
    }
  }, [attendanceRecord]);

  const handleChangeStatus = (date, newStatus) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((entry) =>
        entry.date === date ? { ...entry, status: newStatus } : entry
      )
    );
  };

  const handleSave = () => {
    const updatedRecord = {
      ...attendanceRecord,
      attendance: attendance,
    };
    onSave(updatedRecord);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: '#777' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content bg-dark2 text-dark">
          <div className="modal-header">
            <h5 className="modal-title">Edit Attendance for {attendanceRecord.studentName}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <h6>Select a Date to Update Attendance</h6>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <h6>Current Attendance:</h6>
            {attendance.map((entry) => (
              <div key={entry.date} className="mb-2">
                <span>{entry.date}: </span>
                <span>{entry.status}</span>
                <button
                  className="btn btn-sm btn-primary mx-2"
                  onClick={() => handleChangeStatus(entry.date, 'Present')}
                >
                  Mark Present
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleChangeStatus(entry.date, 'Absent')}
                >
                  Mark Absent
                </button>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
