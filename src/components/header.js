// components/Header.js
import React from "react";
import ThemeToggle from "./ThemeToggle";
import GetStarted from "./GetStarted";
import Login from "./Login";

export default function Header() {
  return (
    <div
      className="bg-white bg-dark1 text-dark position-absolute top-0 w-100 d-flex flex-row justify-content-end align-items-center"
      style={{ height: "64px", padding: "0 1rem 0 0" }}
    >
      <div className="d-flex flex-row justify-content-center align-items-center gap-3">
        <ThemeToggle />
        <Login/>
        <GetStarted/>
      </div>
    </div>
  );
}
