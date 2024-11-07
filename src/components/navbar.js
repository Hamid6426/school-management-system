// components/Sidebar.js
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  const navItems = [
    {
      title: "Dashboard",
      links: [
        { name: "Dashboard Home", path: "/" },
        { name: "Admin Dashboard", path: "/admin-dashboard" },
        { name: "Teacher Dashboard", path: "/teacher-dashboard" },
        { name: "Student Dashboard", path: "/student-dashboard" },
        { name: "Parent Dashboard", path: "/parent-dashboard" },
      ],
    },
    {
      title: "Student Management",
      links: [
        { name: "All Students", path: "/all-students" },
        { name: "Student Profile", path: "/student-profile" },
        { name: "Add Student", path: "/add-student" },
      ],
    },
    {
      title: "Class Scheduling",
      links: [
        { name: "Class Schedule", path: "/class-schedule" },
        { name: "Add Class", path: "/add-class" },
        { name: "Assign Teacher", path: "/assign-teacher" },
      ],
    },
    // Add the other sections here similarly...
    {
      title: "Authentication",
      links: [
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
        { name: "Password Reset", path: "/password-reset" },
      ],
    },
  ];

  return (
    <div className="d-flex flex-column p-3 bg-light" style={{ width: '250px', height: '100vh' }}>
      <h5 className="text-primary">Sidebar</h5>
      {navItems.map((section, index) => (
        <div key={index} className="mb-3">
          <h6>{section.title}</h6>
          <ul className="list-unstyled">
            {section.links.map((link, idx) => (
              <li key={idx} className={router.pathname === link.path ? 'active' : ''}>
                <Link href={link.path} className="text-decoration-none">
                  <span className="text-dark">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
