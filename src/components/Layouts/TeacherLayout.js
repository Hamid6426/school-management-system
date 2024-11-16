import TeacherNavbar from '../Navbars/TeacherNavbar'; // Teacher specific navbar

export default function TeacherLayout({ children }) {
  return (
    <div className="w-100 min-vh-100 d-flex flex-row bg-dark2 text-dark" style={{ backgroundColor: "#ddd" }}>
      <TeacherNavbar />
      <main className="py-3 px-3 rounded-4 min-vh-100 w-100">

        {children}
      </main>
    </div>
  );
}
