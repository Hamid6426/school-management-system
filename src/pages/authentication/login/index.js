import React, { useState } from 'react';
import { useRouter } from 'next/router';

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
    
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);

      // Redirect based on user role
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
    <div className="container my-5">
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
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
        <div className="mb-3">
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
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    </div>
  );
};

export default Login;
