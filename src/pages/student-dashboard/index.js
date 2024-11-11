import { verifyToken } from "./../../lib/utils/verifyToken";
import User from "./../../lib/models/User"; // Adjust the path as needed
import Link from "next/link";

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

  // Fetch user data from the database
  const user = await User.findById(decodedToken.userId).select("fullName role");

  return {
    props: {
      userData: {
        fullName: user.fullName,
        role: user.role,
      },
    },
  };
}

export default function StudentDashboard({ userData }) {
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

      {/* Dashboard Stats Cards */}
      <div className="row mt-3">
        <div className="col-lg-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h6 className="card-title">Attendance</h6>
              <p className="card-text">92%</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h6 className="card-title">Courses Enrolled</h6>
              <p className="card-text">5</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h6 className="card-title">Assignments Due</h6>
              <p className="card-text">3</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h6 className="card-title">Upcoming Exams</h6>
              <p className="card-text">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row">
        <div className="col-md-12">
          <div className="card mt-2">
            <div className="card-header bg-dark2 text-dark">
              <h5>Recent Activity</h5>
            </div>
            <div className="card-body bg-dark3 text-dark">
              <ul>
                <li>Assignment submitted: Math Homework 3</li>
                <li>New announcement: Science fair next week</li>
                <li>Course update: New lecture in English 101</li>
                <li>Attendance marked for the past week</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="row mt-2">
        <div className="col-md-12">
          <div className="card mt-3">
            <div className="card-header bg-dark2 text-dark">
              <h5>Upcoming Tasks</h5>
            </div>
            <div className="card-body bg-dark3 text-dark">
              <ul>
                <li>Complete History assignment by Friday</li>
                <li>Prepare for the Biology quiz</li>
                <li>Attend Math extra class on Wednesday</li>
                <li>Submit lab report by Monday</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
