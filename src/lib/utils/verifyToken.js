import jwt from 'jsonwebtoken';

export function verifyToken(token) {
  try {
    if (!token) throw new Error('Token is required');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check for token expiry or invalid signature
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
}
