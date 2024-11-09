import { useState, useEffect } from 'react';

const useUserRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setRole('Guest'); // If no token, assume 'Guest'
        setLoading(false);
        return;
      }

      try {
        // Make a GET request to the API to fetch the user role
        const response = await fetch(`/api/getUserRole?token=${token}`);

        if (!response.ok) {
          throw new Error('Failed to fetch user role');
        }

        const data = await response.json();
        setRole(data.role); // Set the role from the API response
      } catch (err) {
        console.error(err);
        setError(err.message);
        setRole('Guest'); // Default to 'Guest' if there’s an error
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole(); // Fetch user role on component mount
  }, []); // Run the effect once on component mount

  return { role, loading, error };
};

export default useUserRole;
