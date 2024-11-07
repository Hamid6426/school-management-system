// pages/reset-password/[token].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ResetPassword = () => {
    const router = useRouter();
    const { token } = router.query;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password: newPassword }),
            });

            const data = await response.json();
            console.log("API Response:", data); // Log the response here
            setIsLoading(false);

            if (response.ok) {
                setMessage('Password has been successfully reset.');

                // Check if the role is available in the response
                const userRole = data.role; // Ensure that the role is part of the response

                if (!userRole) {
                    setMessage('Role not found in the response. Please contact support.');
                    return;
                }

                // Redirect based on user role after successful password reset
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
                setMessage(data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setIsLoading(false);
            setMessage('Error occurred. Please try again.');
        }
    };

    return (
        <div className="container w-100 d-flex flex-column align-items-center justify-content-center">
            <h2 className="my-4 text-center">Reset Your Password</h2>
            <form onSubmit={handleChangePassword}>
                <div className="container w-100 d-flex flex-column justify-content-center">
                    <div className="w-100" style={{ minWidth: "312px" }}>
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-100" style={{ minWidth: "312px" }}>
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="container w-100 d-flex justify-content-center">
                        <button
                            type="submit"
                            className="mt-2 mb-3 btn btn-primary text-center"
                            style={{ minWidth: "312px" }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                </div>
            </form>
            {message && <div className="alert mt-3" role="alert">{message}</div>}
        </div>
    );
};

export default ResetPassword;