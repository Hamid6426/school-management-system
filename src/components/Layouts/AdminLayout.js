import AdminNavbar from '../Navbars/AdminNavbar'; // Admin specific navbar
import Footer from '../Footer';

export default function AdminLayout({ children }) {
  return (
    <div className="w-100 min-vh-100 d-flex flex-row bg-dark2 text-dark" style={{ backgroundColor: "#ddd" }}>
      <AdminNavbar />
      <main className="py-3 px-3 rounded-4 min-vh-100 w-100">
        {children}
      </main>
      <Footer />
    </div>
  );
}
