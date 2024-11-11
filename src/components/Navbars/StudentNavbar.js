import { useRouter } from "next/router";
import Dropdown from "../Dropdown";
import ThemeToggle from "../ThemeToggle";
import Logout from "../Logout";

const StudentNavbar = () => {
  const router = useRouter();

  const navItems = [
    {
      button: "Dashboard",
      links: [{ label: "Home", href: "/student" }],
    },
    {
      button: "Courses",
      links: [{ label: "View Courses", href: "/student-dashboard/courses" }],
    },
    {
      button: "Reports",
      links: [
        { label: "Attendance Report", href: "/student-dashboard/attendance-report" },
        { label: "Marks", href: "/student-dashboard/marks" },
        { label: "Performance Report", href: "/student-dashboard/performance-report" },
      ],
    },
    {
      button: "Settings",
      links: [{ label: "Student Settings", href: "/student-dashboard/student-settings" }],
    },
  ];

  return (
    <div
    className="d-flex flex-column p-3 bg-white bg-dark1 text-dark"
    style={{ width: "240px", minHeight: "100vh" }}
  >
    <h4 className="text-primary mb-3 text-center fw-bold h4">
      PROGRESS SCHOOL
    </h4>
    {navItems.map((section, index) => (
      <div key={index} className="mb-3 d-block" style={{ minWidth: "200px" }}>
        <Dropdown buttonLabel={section.button} links={section.links}  />
      </div>
    ))}
    <ThemeToggle style={{ height: "48px" }} />
    <Logout />
  </div>
  );
};

export default StudentNavbar;
