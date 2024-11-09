import { useState } from 'react';
import AttendanceModal from '../../../components/Modals/AttendanceModal';
import attendanceData from "../../../data/attendanceData.js";

export default function AttendanceReport() {
  const [attendanceList, setAttendanceList] = useState(attendanceData);
  const [showModal, setShowModal] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useState(null);

  const handleEditAttendance = (attendanceRecord) => {
    setCurrentAttendance(attendanceRecord);
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleSaveAttendance = (updatedAttendance) => {
    setAttendanceList((prevData) =>
      prevData.map((record) =>
        record._id === updatedAttendance._id ? updatedAttendance : record
      )
    );
    setShowModal(false);
  };

  return (
    <div className="container py-4">
      <h1>Attendance Report</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Student</th>
            <th>Attendance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map((record, index) => ( // Updated to attendanceList
            <tr key={record._id}>
              <td>{index + 1}</td>
              <td>{record.studentName}</td>
              <td>
                {record.attendance.map((entry, i) => (
                  <div key={i}>
                    {entry.date}: {entry.status}
                  </div>
                ))}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm mx-2"
                  onClick={() => handleEditAttendance(record)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <AttendanceModal
          attendanceRecord={currentAttendance}
          onClose={handleModalClose}
          onSave={handleSaveAttendance}
        />
      )}
    </div>
  );
}
