// pages/index.js
import Image from "next/image";
import Header from "@/components/Header";
import GetStarted from "@/components/GetStarted";

export default function Home() {
  return (
    <div
      className="bg-black1 text-black text-whites min-vh-100 d-flex w-100 align-items-center justify-content-center position-relative"
      style={{ background: "#ddd" }}
    >
      <Header />
      <div className="d-flex flex-row justify-content-center align-items-center w-100 pt-5 gap-5">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-start text-weight-bold">
            <h1 style={{ fontSize:"48px", fontWeight:"bold"}}>Welcome to</h1>
            <h1 style={{ fontSize:"48px", fontWeight:"bold"}}>School</h1>
            <h1 style={{ fontSize:"48px", fontWeight:"bold"}}>Management</h1>
            <h1 style={{ fontSize:"48px", fontWeight:"bold"}} className="mb-4">System</h1>
            <GetStarted style={{ fontSize:"48px", fontWeight:"bold"}} />
          </div>
        </div>

        <div className="d-lg-flex flex-column justify-content-center align-items-center d-none">
          <Image
            src="/hero-image.svg"
            width="512"
            height="512"
            alt="Hero image"
            className="d-flex"
            style={{ width: "512px" }}
          />
        </div>
      </div>
    </div>
  );
}
