import { verifyToken } from "@/lib/utils/verifyToken";
import Link from "next/link";

// Example Data for Performance Report
const examplePerformanceData = [
  {
    courseName: "Computer Science 101",
    attendance: 90, // percentage
    averageScore: 85, // percentage
  },
  {
    courseName: "Mathematics for Computing",
    attendance: 95,
    averageScore: 78,
  },
  {
    courseName: "Physics",
    attendance: 88,
    averageScore: 82,
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

  // Use example data for performance
  const performanceData = examplePerformanceData;

  return {
    props: {
      userData,
      performanceData,
    },
  };
}

export default function StudentPerformanceReport({ userData, performanceData }) {
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

      {/* Performance Report List */}
      <div className="row mt-3">
        {performanceData.length > 0 ? (
          performanceData.map((course, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-3">
              <div className="card border-0 shadow-sm bg-light">
                <div className="card-header bg-secondary text-white">
                  <h6 className="card-title mb-0">{course.courseName}</h6>
                </div>
                <div className="card-body">
                  <p className="mb-1">
                    <strong>Attendance:</strong> {course.attendance}%
                  </p>
                  <p className="mb-1">
                    <strong>Average Score:</strong> {course.averageScore}%
                  </p>

                  {/* Performance Insights */}
                  <div className="mt-3">
                    <h6>Insights</h6>
                    <ul className="list-unstyled mb-0 text-muted">
                      <li>
                        {course.attendance >= 90
                          ? "Excellent attendance! Keep it up."
                          : course.attendance >= 75
                          ? "Good attendance, aim to improve slightly."
                          : "Low attendance. Try to attend more sessions."}
                      </li>
                      <li>
                        {course.averageScore >= 85
                          ? "High performance. Great job!"
                          : course.averageScore >= 70
                          ? "Average performance. Aim for a few improvements."
                          : "Below average performance. Consider extra study sessions."}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-end">
                  <Link
                    href={`/student-dashboard/performance-report/${course.courseName}`}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning">No performance data available.</div>
          </div>
        )}
      </div>
    </div>
  );
}
