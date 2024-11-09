import ParentNavbar from '../Navbars/ParentNavbar'; // Parent specific navbar
import Footer from '../Footer';

export default function ParentLayout({ children }) {
  return (
    <div className="w-100 min-vh-100 d-flex flex-row bg-black1 text-whites" style={{ backgroundColor: "#ddd" }}>
      <ParentNavbar />
      <main className="py-2 px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
