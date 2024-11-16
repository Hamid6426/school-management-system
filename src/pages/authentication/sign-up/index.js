import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "./../../../components/Header";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Student",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming this is the API call to register the user
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Redirect to the login page after successful registration
      router.push("/authentication/login");
    } else {
      alert("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="bg-dark2 pt-5 min-vh-100 text-dark w-100 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "#ddd" }}>
      <Header/>
      <h2 className="my-3 text-text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="container w-100 d-flex justify-content-center">

          <div className="w-100" style={{ minWidth: "312px" }}>

            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="Admin">Admin</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
                <option value="Parent">Parent</option>
              </select>
            </div>
            <div className="container w-100 d-flex justify-content-center">

              <button type="submit" className="mt-2 mb-3 btn btn-primary text-center" style={{ minWidth: "312px" }}>
                Sign Up
              </button>
            </div>

          </div>
        </div>

      </form>

      <div>Already have an account?</div>
      <Link href="/authentication/login" className='text-decoration-none fw-bold'>Login</Link>
    </div>
  );
}
