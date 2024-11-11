import { useRouter } from "next/router";
import Dropdown from "../Dropdown";
import ThemeToggle from "../ThemeToggle";
import Logout from '../Logout';

const ParentNavbar = () => {
  const router = useRouter();

  const navItems = [
    {
      button: "Dashboard",
      links: [{ label: "Home", href: "/parent" }],
    },
    {
      button: "Reports",
      links: [
        { label: "Attendance Report", href: "/parent/attendance-report" },
        { label: "Child Progress", href: "/parent/child-progress" },
        { label: "Grade Report", href: "/parent/grade-report" },
      ],
    },
    {
      button: "Settings",
      links: [{ label: "Parent Settings", href: "/parent/parent-settings" }],
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

export default ParentNavbar;
