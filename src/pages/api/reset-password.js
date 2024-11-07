import connectToDatabase from './../../lib/mongodb';
import User from './../../lib/models/User';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';  // Import bcrypt for password hashing

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    console.log('Received Token:', token);

    try {
      await connectToDatabase();

      // Hash the token received from the frontend to match the stored token
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
      console.log('Hashed Token:', hashedToken);

      // Find the user by reset token
      const user = await User.findOne({ resetPasswordToken: hashedToken });
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }

      // Check if the token has expired
      if (user.resetPasswordTokenExpiry < Date.now()) {
        return res.status(400).json({ message: 'Reset token has expired. Please request a new one.' });
      }

      // Hash the new password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password and clear the reset token
      user.password = hashedPassword;  // Save the hashed password
      user.resetPasswordToken = undefined;  // Clear the reset token after use
      user.resetPasswordTokenExpiry = undefined;  // Clear the token expiry
      await user.save();

      // Return the role along with the success message
      return res.status(200).json({
        message: 'Password has been successfully reset',
        role: user.role  // Return role to help frontend handle redirection
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}