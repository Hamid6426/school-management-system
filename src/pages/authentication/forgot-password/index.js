import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true); // Set loading state

    const response = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setIsLoading(false); // Reset loading state

    if (response.ok) {
      setMessage('Password reset email sent successfully. Please check your inbox.');
    } else {
      setMessage(data.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="bg-dark2 text-dark min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "#ddd" }}>
      <Header/>
      <h2 className="mb-4 text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="container w-100 d-flex flex-column justify-content-center">

          <div className="w-100 mb-3" style={{ minWidth: "312px" }}>
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="container w-100 d-flex justify-content-center">
            <button
              type="submit"
              className="mt-2 mb-3 btn btn-primary text-center"
              style={{ minWidth: "312px" }}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </div>
      </form>
      {message && (
        <div className="alert mt-3" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
