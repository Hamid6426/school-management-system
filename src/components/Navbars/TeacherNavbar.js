import { useRouter } from "next/router";
import Dropdown from "../Dropdown";
import ThemeToggle from "../ThemeToggle";
import Logout from "../Logout";

const TeacherNavbar = () => {
  const router = useRouter();

  const navItems = [
    {
      button: "Dashboard",
      links: [{ label: "Home", href: "/teacher" }],
    },
    {
      button: "Manage",
      links: [
        { label: "Manage Students", href: "/teacher/manage-students" },
        { label: "Assign Grades", href: "/teacher/assign-grades" },
      ],
    },
    {
      button: "Attendance",
      links: [{ label: "Record Attendance", href: "/teacher/attendance" }],
    },
    {
      button: "Announcements",
      links: [
        { label: "Create Announcement", href: "/teacher/create-announcement" },
      ],
    },
    {
      button: "Settings",
      links: [{ label: "Teacher Settings", href: "/teacher/teacher-settings" }],
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

export default TeacherNavbar;
