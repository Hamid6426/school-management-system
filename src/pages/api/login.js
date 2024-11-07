// pages/api/login.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToDatabase from './../../lib/mongodb';
import User from './../../lib/models/User';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Destructure email and password from request body
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role, fullName: user.fullName },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set token as an HttpOnly cookie
    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`);

    // Send response with token and user role
    return res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error('Error in login handler:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
