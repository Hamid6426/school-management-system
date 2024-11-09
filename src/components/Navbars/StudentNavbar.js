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
      links: [{ label: "View Courses", href: "/student/courses" }],
    },
    {
      button: "Reports",
      links: [
        { label: "Attendance Report", href: "/student/attendance-report" },
        { label: "Marks", href: "/student/marks" },
        { label: "Performance Report", href: "/student/performance-report" },
      ],
    },
    {
      button: "Settings",
      links: [{ label: "Student Settings", href: "/student/student-settings" }],
    },
  ];

  return (
    <div
      className="bg-dark1 text-dark d-flex flex-column p-3 bg-white bg-black0 text-whites"
      style={{ width: "240px", minHeight: "100vh" }}
    >
      <h4 className="text-primary mb-3 text-center fw-bold h4">
        PROGRESS SCHOOL
      </h4>
      {navItems.map((section, index) => (
        <div key={index} className="mb-3 d-block" style={{ minWidth: "200px" }}>
          <Dropdown buttonLabel={section.button} links={section.links} />
        </div>
      ))}
      <ThemeToggle />
      <Logout />
    </div>
  );
};

export default StudentNavbar;
