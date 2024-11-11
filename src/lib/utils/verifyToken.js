// lib/verifyToken.js
import jwt from 'jsonwebtoken';

export default function verifyToken(token) {
  try {
    if (!token) throw new Error('Token is required');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
}
