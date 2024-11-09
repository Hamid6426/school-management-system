// // pages/api/getUserRole.js
// import connectToDatabase from './../../lib/mongodb';
// import User from './../../lib/models/User'; // Import your User model

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).end(); // Only allow GET requests
//   }

//   const { userId } = req.query; // User ID passed from the frontend (could be from a session or token)

//   if (!userId) {
//     return res.status(400).json({ message: 'User ID is required' });
//   }

//   try {
//     await connectToDatabase(); // Connect to MongoDB

//     const user = await User.findById(userId); // Find the user by ID

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ role: user.role }); // Return the user's role
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// }

// pages/api/getUserRole.js
// import connectToDatabase from './../../lib/mongodb'; // MongoDB connection helper
// import User from './../../lib/models/User'; // MongoDB User model

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method not allowed' }); // Only allow GET requests
//   }

//   const { userId } = req.query; // Get the userId from query parameters

//   if (!userId) {
//     return res.status(400).json({ message: 'User ID is required' }); // Ensure userId is provided
//   }

//   try {
//     await connectToDatabase(); // Connect to the database

//     // Fetch the user from the database using the userId
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' }); // If no user is found
//     }

//     // Respond with the user's role
//     return res.status(200).json({ role: user.role });
//   } catch (error) {
//     console.error('Database error:', error); // Log errors to the console for debugging
//     return res.status(500).json({ message: 'Server error' }); // Handle server errors
//   }
// }

// pages/api/getUserRole.js
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../lib/mongodb';
import User from '../../lib/models/User';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Only allow GET requests
  }

  const { token } = req.query;

  // Ensure token is provided
  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    // Decode the token to get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // You should verify the JWT with the secret key
    const userId = decoded.userId; // Assuming your token contains userId

    await connectToDatabase(); // Connect to MongoDB

    // Fetch the user by ID from MongoDB
    const user = await User.findById(userId).select('role'); // Only select the role field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user role
    res.status(200).json({ role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch user role' });
  }
}
