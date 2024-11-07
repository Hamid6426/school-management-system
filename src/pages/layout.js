import localFont from "next/font/local";
import Navbar from './../components/Navbar'
import Footer from './../components/Footer'


const geistSans = localFont({
    src: "./../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
  });
  const geistMono = localFont({
    src: "./../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
  });

export default function Layout({ children }) {
  return (
    <div className="w-100 d-flex flex-row align-items-start " style={{ backgroundColor: "#ddd " }}>
      <Navbar />
        <main  className={`${geistSans.variable} ${geistMono.variable}`}>{children}</main>
      <Footer />
    </div>
  )
}