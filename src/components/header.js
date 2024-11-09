// components/Header.js
import React from "react";
import ThemeToggle from "./ThemeToggle";
import GetStarted from "./GetStarted";
import Login from "./Login";

export default function Header() {
  return (
    <div
      className="bg-white bg-black0 position-absolute top-0 w-100 d-flex flex-row justify-content-end align-items-center  w-80px"
      style={{ height: "80px", padding: "0 2rem 0 0" }}
    >
      <div className="d-flex flex-row justify-content-center align-items-center gap-4">
        <ThemeToggle />
        <Login/>
        <GetStarted/>
      </div>
    </div>
  );
}
