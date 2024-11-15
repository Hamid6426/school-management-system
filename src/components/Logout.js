import React from 'react';
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    // Call the server-side logout API to clear the cookie
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Clear token from localStorage
      localStorage.removeItem('token');

      // Redirect to the homepage
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('An error occurred while logging out. Please try again.');
    }
  };

  return (
    <div>
    <div className=''>
    <button onClick={handleLogout} className="btn btn-danger px-3 py-1 text-white rounded-2 w-100 mt-3" >
      Logout
    </button>
    </div>
    </div>
  );
}