import Link from 'next/link';
import { useRouter } from 'next/router';
import Dropdown from './Dropdown'; // Import the Dropdown component

const Navbar = () => {
  const router = useRouter();

  const navItems = [
    {
      button: "Dashboard",
      links: [
        { name: "Home", path: "/dashboard/" },
      ],
    },
    {
      button: "Student Management",
      links: [
        { name: "All Students", path: "/all-students" },
        { name: "Student Profile", path: "/student-profile" },
        { name: "Add Student", path: "/add-student" },
      ],
    },
    {
      button: "Class Scheduling",
      links: [
        { name: "Class Schedule", path: "/class-schedule" },
        { name: "Add Class", path: "/add-class" },
        { name: "Assign Teacher", path: "/assign-teacher" },
      ],
    },
    {
      button: "Attendance",
      links: [
        { name: "Attendance", path: "/attendance" },
        { name: "Attendance Report", path: "/attendance-report" },
      ],
    },
    {
      button: "Grading",
      links: [
        { name: "Grade Entry", path: "/grade-entry" },
        { name: "Grade Report", path: "/grade-report" },
        { name: "Student Report Card", path: "/student-report-card" },
      ],
    },
    {
      button: "Communication",
      links: [
        { name: "Messages", path: "/messages" },
        { name: "New Message", path: "/new-message" },
      ],
    },
    {
      button: "Reports & Analytics",
      links: [
        { name: "Report Generator", path: "/report-generator" },
        { name: "Progress Analytics", path: "/progress-analytics" },
      ],
    },
    {
      button: "User Management",
      links: [
        { name: "User Management", path: "/user-management" },
        { name: "Role Assignment", path: "/role-assignment" },
      ],
    },
  ];

  return (
    <div className="d-flex flex-column p-3 bg-white" style={{ width: '240px', height: '100vh' }}>
     <div className=''> 
      <h5 className="text-primary mb-3">Hero Softwares</h5>
      </div>
      {navItems.map((section, index) => (
        <div key={index} className="mb-3 d-block" style={{minWidth: "200px"}} >
          <Dropdown buttonLabel={section.button} links={section.links}/>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
