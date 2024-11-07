// pages/api/forgot-password.js
import nodemailer from 'nodemailer';  // Email sending service
import crypto from 'crypto';          // To generate the token
import connectToDatabase from './../../lib/mongodb';
import User from './../../lib/models/User';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        try {
            await connectToDatabase();

            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Generate a reset token using crypto
            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

            // Hash the reset token for security
            const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

            // Log the token for debugging
            console.log('Generated Reset Token:', resetToken);
            console.log('Hashed Reset Token:', hashedToken);

            // Store the reset token and its expiry in the database
            user.resetPasswordToken = hashedToken;
            user.resetPasswordTokenExpiry = resetTokenExpiry;
            await user.save();

            // Setup email transporter (using Nodemailer as an example)
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const resetLink = `${process.env.SITE_URL}/authentication/reset-password/${resetToken}`;

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset Request',
                text: `Please use the following link to reset your password: ${resetLink}`,
            };

            // Send reset link email
            await transporter.sendMail(mailOptions);

            return res.status(200).json({ message: 'Password reset email sent successfully.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong. Please try again.' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
