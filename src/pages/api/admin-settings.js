// pages/api/admin-settings.js
import User from "../../lib/models/User";
import connectToDatabase from "../../lib/mongodb"; // Make sure this is the correct path to your database connection file
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const { method } = req;

  // Ensure the database connection is established before any database queries
  await connectToDatabase();

  if (method === 'GET') {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token and extract email
      const user = await User.findOne({ email: decoded.email }); // Fetch the user by decoded email

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return admin user data
      res.status(200).json({
        fullName: user.fullName,
        email: user.email,
      });

    } catch (error) {
      res.status(500).json({ message: "Error fetching user data", error });
    }
  } 
  else if (method === 'PUT') {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token and extract email
      const { fullName, email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user details
      if (fullName) user.fullName = fullName;
      if (email) user.email = email; // You can add more validation here if needed
      if (password) {
        user.password = await bcrypt.hash(password, 10); // Hash new password if provided
      }

      await user.save(); // Save the updated user

      res.status(200).json({ message: "Settings updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error updating user settings", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
