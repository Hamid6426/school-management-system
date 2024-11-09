import { useRouter } from "next/router";
import Dropdown from "../Dropdown";
import ThemeToggle from "../ThemeToggle";
import Logout from "../Logout";

const AdminNavbar = () => {
  const router = useRouter();

  const navItems = [
    {
      button: "Dashboard",
      links: [{ label: "Home", href: "/admin-dashboard" }],
    },
    {
      button: "Manage",
      links: [
        { label: "Students", href: "/admin-dashboard/manage-students" },
        { label: "Teachers", href: "/admin-dashboard/manage-teachers" },
        { label: "Parents", href: "/admin-dashboard/manage-parents" },
        { label: "Courses", href: "/admin-dashboard/manage-courses" },
        { label: "Roles", href: "/admin-dashboard/manage-roles" },
      ],
    },
    {
      button: "Reports",
      links: [
        {
          label: "Attendance Report",
          href: "/admin-dashboard/attendance-report",
        },
      ],
    },
    {
      button: "Announcements",
      links: [
        {
          label: "Create Announcement",
          href: "/admin-dashboard/create-announcement",
        },
      ],
    },
    {
      button: "Settings",
      links: [
        { label: "Admin Settings", href: "/admin-dashboard/admin-settings" },
      ],
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

export default AdminNavbar;
