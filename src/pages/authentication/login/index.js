import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const { email, password } = formData; // Extract email and password

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }), // Send only email and password
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);

      // Redirect based on user role
      const userRole = data.role; // Assuming the response has a 'role' property
      switch (userRole) {
        case 'Admin':
          router.push('/dashboard/admin');
          break;
        case 'Teacher':
          router.push('/dashboard/teacher');
          break;
        case 'Student':
          router.push('/dashboard/student');
          break;
        case 'Parent':
          router.push('/dashboard/parent');
          break;
        default:
          alert('Role not recognized. Please contact support.');
          break;
      }
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container w-100 d-flex flex-column align-items-center justify-content-center">
      <h2 className="my-4 text-text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="container w-100 d-flex flex-column justify-content-center">

          <div className="w-100" style={{ minWidth: "312px" }}>
            <label htmlFor="email" className="form-label">Email</label>
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
          <div className="mb-1">
            <label htmlFor="password" className="form-label">Password</label>
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
          <Link href="forgot-password" className="mb-3">Forgot Password?</Link>
          <div className="container w-100 d-flex justify-content-center">

            <button type="submit" className="mt-2 mb-3 btn btn-primary text-center" style={{ minWidth: "312px" }}>
              Login
            </button>
          </div>
        </div>
      </form >
    </div >
  );
};

export default Login;
