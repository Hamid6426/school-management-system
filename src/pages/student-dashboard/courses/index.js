import { verifyToken } from "../../../lib/utils/verifyToken";
import Link from "next/link";

// Example Data
const exampleCourses = [
  {
    _id: "1",
    courseName: "Computer Science 101",
    instructor: "Dr. Jane Doe",
    schedule: "Mon & Wed, 10:00 - 11:30 AM",
    assignments: [
      { title: "Assignment 1: Introduction to CS", dueDate: "2024-11-20" },
      { title: "Assignment 2: Data Structures", dueDate: "2024-11-27" },
      { title: "Assignment 3: Algorithms", dueDate: "2024-12-04" },
    ],
  },
  {
    _id: "2",
    courseName: "Mathematics for Computing",
    instructor: "Prof. John Smith",
    schedule: "Tue & Thu, 1:00 - 2:30 PM",
    assignments: [
      { title: "Assignment 1: Linear Algebra Basics", dueDate: "2024-11-21" },
      { title: "Assignment 2: Calculus I", dueDate: "2024-12-01" },
    ],
  },
  {
    _id: "3",
    courseName: "Physics",
    instructor: "Dr. Lisa Wong",
    schedule: "Friday, 9:00 - 11:00 AM",
    assignments: [
      { title: "Assignment 1: Mechanics", dueDate: "2024-11-25" },
      { title: "Assignment 2: Thermodynamics", dueDate: "2024-12-02" },
      { title: "Assignment 3: Electromagnetism", dueDate: "2024-12-09" },
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

  // Use example data for courses
  const courses = exampleCourses;

  return {
    props: {
      userData,
      courses,
    },
  };
}

export default function StudentCourses({ userData, courses }) {
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

      {/* Courses List */}
      <div className="row mt-3">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-3">
              <div className="card border-0 shadow-sm bg-light">
                <div className="card-header bg-primary text-white">
                  <h6 className="card-title mb-0">{course.courseName}</h6>
                </div>
                <div className="card-body">
                  <p className="mb-1"><strong>Instructor:</strong> {course.instructor}</p>
                  <p className="mb-1"><strong>Schedule:</strong> {course.schedule}</p>
                  
                  {/* Assignments List */}
                  <div className="mt-3">
                    <h6>Recent Assignments</h6>
                    <ul className="list-unstyled mb-0">
                      {course.assignments.slice(0, 3).map((assignment, i) => (
                        <li key={i} className="text-muted">
                          {assignment.title} - {assignment.dueDate}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-end">
                  <Link
                    href={`/student-dashboard/courses/${course._id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning">You are not enrolled in any courses yet.</div>
          </div>
        )}
      </div>
    </div>
  );
}
