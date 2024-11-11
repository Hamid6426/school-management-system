import { verifyToken } from "../../../lib/utils/verifyToken";
import Link from "next/link";

// Example Data for Marks
const exampleMarks = [
  {
    courseName: "Computer Science 101",
    assignments: [
      { title: "Assignment 1", score: 85, total: 100 },
      { title: "Midterm Exam", score: 78, total: 100 },
      { title: "Final Project", score: 90, total: 100 },
    ],
  },
  {
    courseName: "Mathematics for Computing",
    assignments: [
      { title: "Quiz 1", score: 18, total: 20 },
      { title: "Assignment 1", score: 70, total: 100 },
      { title: "Final Exam", score: 88, total: 100 },
    ],
  },
  {
    courseName: "Physics",
    assignments: [
      { title: "Lab Report 1", score: 25, total: 30 },
      { title: "Midterm Exam", score: 65, total: 100 },
      { title: "Final Exam", score: 80, total: 100 },
    ],
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

  // Use example data for marks
  const marksRecords = exampleMarks;

  return {
    props: {
      userData,
      marksRecords,
    },
  };
}

export default function StudentMarks({ userData, marksRecords }) {
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

      {/* Marks Report List */}
      <div className="row mt-3">
        {marksRecords.length > 0 ? (
          marksRecords.map((record, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-3">
              <div className="card border-0 shadow-sm bg-light">
                <div className="card-header bg-info text-white">
                  <h6 className="card-title mb-0">{record.courseName}</h6>
                </div>
                <div className="card-body">
                  <h6>Assignments & Exams</h6>
                  <ul className="list-unstyled">
                    {record.assignments.map((assignment, i) => (
                      <li key={i} className="d-flex justify-content-between text-muted">
                        <span>{assignment.title}</span>
                        <span>
                          {assignment.score}/{assignment.total} (
                          {((assignment.score / assignment.total) * 100).toFixed(2)}%)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer d-flex justify-content-end">
                  <Link
                    href={`/student-dashboard/marks/${record.courseName}`}
                    className="btn btn-outline-info btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning">No marks records available.</div>
          </div>
        )}
      </div>
    </div>
  );
}
