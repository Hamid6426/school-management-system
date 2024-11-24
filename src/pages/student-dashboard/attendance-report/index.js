import { verifyToken } from "@/lib/utils/verifyToken";
import Link from "next/link";

// Example Data for Attendance
const exampleAttendance = [
  {
    courseName: "Computer Science 101",
    totalClasses: 20,
    attendedClasses: 18,
    lastUpdated: "2024-11-08",
  },
  {
    courseName: "Mathematics for Computing",
    totalClasses: 15,
    attendedClasses: 14,
    lastUpdated: "2024-11-06",
  },
  {
    courseName: "Physics",
    totalClasses: 10,
    attendedClasses: 9,
    lastUpdated: "2024-11-05",
  },
];

export async function getServerSideProps(context) {
  const token = context.req.cookies.token || "";
  const decodedToken = verifyToken(token);

  if (!decodedToken || decodedToken.role !== "Student") {
    return {
      redirect: {
        destination: "/authentication/login",
        permanent: false,
      },
    };
  }

  // Mock user data for demonstration
  const userData = { fullName: "Student Name", role: "Student" };

  // Use example data for attendance
  const attendanceRecords = exampleAttendance;

  return {
    props: {
      userData,
      attendanceRecords,
    },
  };
}

export default function StudentAttendanceReport({ userData, attendanceRecords }) {
  return (
    <div className="w-100">
      <div
        className="bg-dark1 bg-white py-3 py-md-0 rounded-3 w-100 d-flex flex-md-row flex-column justify-content-between align-items-center px-3"
        style={{ minHeight: "60px" }}
      >
        <h5 className="">Welcome, {userData.fullName}</h5>
        <Link
          href="/student-dashboard"
          className="mt-2 mt-md-0 bg-primary text-white py-1 px-4 border-0 rounded-2 text-decoration-none"
        >
          {userData.role}
        </Link>
      </div>

      {/* Attendance Report List */}
      <div className="row mt-3">
        {attendanceRecords.length > 0 ? (
          attendanceRecords.map((record, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-3">
              <div className="card border-0 shadow-sm bg-light">
                <div className="card-header bg-success text-white">
                  <h6 className="card-title mb-0">{record.courseName}</h6>
                </div>
                <div className="card-body">
                  <p className="mb-1">
                    <strong>Total Classes:</strong> {record.totalClasses}
                  </p>
                  <p className="mb-1">
                    <strong>Classes Attended:</strong> {record.attendedClasses}
                  </p>
                  <p className="mb-1">
                    <strong>Attendance Percentage:</strong>{" "}
                    {((record.attendedClasses / record.totalClasses) * 100).toFixed(2)}%
                  </p>
                  <p className="mb-1">
                    <strong>Last Updated:</strong> {record.lastUpdated}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-end">
                  <Link
                    href={`/student-dashboard/attendance/${record.courseName}`}
                    className="btn btn-outline-success btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning">No attendance records available.</div>
          </div>
        )}
      </div>
    </div>
  );
}
