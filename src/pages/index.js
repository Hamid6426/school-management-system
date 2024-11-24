// pages/index.js
import Image from "next/image";
import GetStarted from "./../components/GetStarted";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div
      className="bg-dark2 text-dark text-black text-whites min-vh-100 w-100 d-flex flex-row align-items-center justify-content-center position-relative"
      style={{ background: "#ddd" }}
    >
      <Navbar/>
      <div className="d-flex flex-row justify-content-center align-items-center w-100 pt-5 gap-5">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-start text-weight-bold">
            <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Welcome to</h1>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>School</h1>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Management</h1>
            <h1
              style={{ fontSize: "2rem", fontWeight: "bold" }}
              className="mb-4"
            >
              System
            </h1>
            <GetStarted />
          </div>
        </div>

        <div className="d-md-flex flex-column justify-content-center align-items-center d-none">
          <Image
            src="/hero-image.svg"
            width="400"
            height="400"
            alt="Hero image"
            className="d-flex"
          />
        </div>
      </div>
    </div>
  );
}
