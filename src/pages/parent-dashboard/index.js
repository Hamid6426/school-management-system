import { verifyToken } from "./../../lib/utils/verifyToken";
import User from "./../../lib/models/User";
import Link from "next/link";

export async function getServerSideProps(context) {
  const token = context.req.cookies.token || "";
  const decodedToken = verifyToken(token);

  if (!decodedToken || decodedToken.role !== "Parent") {
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

export default function ParentDashboard({ userData }) {
  return (
    <div className="w-100">
      <div
        className="bg-dark1 bg-white py-3 py-md-0 rounded-3 w-100 d-flex flex-md-row flex-column justify-content-between align-items-center px-3"
        style={{ minHeight: "60px" }}
      >
        <h5 className="">Welcome, {userData.fullName}</h5>
        <Link
          href="/parent-dashboard"
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
              <h6 className="card-title">Child&apos;s Attendance</h6>
              <p className="card-text">85%</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h6 className="card-title">Child&apos;s Courses</h6>
              <p className="card-text">5</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h6 className="card-title">Upcoming Events</h6>
              <p className="card-text">2</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h6 className="card-title">Recent Grades</h6>
              <p className="card-text">B+</p>
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
                <li>New grade posted: Science Test - A</li>
                <li>Parent-teacher meeting scheduled for Friday</li>
                <li>New event: Sports Day next Wednesday</li>
                <li>Math homework graded: B+</li>
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
                <li>Review child’s progress report</li>
                <li>Sign consent form for field trip</li>
                <li>Attend parent-teacher conference</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
