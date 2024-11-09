import TeacherNavbar from '../Navbars/TeacherNavbar'; // Teacher specific navbar
import Footer from '../Footer';

export default function TeacherLayout({ children }) {
  return (
    <div className="w-100 min-vh-100 d-flex flex-row bg-black1 text-whites" style={{ backgroundColor: "#ddd" }}>
      <TeacherNavbar />
      <main className="py-2 px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
