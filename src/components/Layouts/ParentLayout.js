import ParentNavbar from '../Navbars/ParentNavbar'; // Parent specific navbar
import Footer from '../Footer';

export default function ParentLayout({ children }) {
  return (
    <div className="w-100 min-vh-100 d-flex flex-row bg-dark2 text-dark" style={{ backgroundColor: "#ddd" }}>
      <ParentNavbar />
      <main className="py-3 px-3 rounded-4 min-vh-100 w-100">

        {children}
      </main>
      <Footer />
    </div>
  );
}
