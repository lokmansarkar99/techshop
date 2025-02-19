import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Middleware to protect routes (ensure the user is logged in)
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    // Check if the Authorization header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, token missing or invalid' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from header

    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user from the decoded token ID
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    req.user = user; // Attach user to request object for access in subsequent middleware/routes
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    // Handle token expiration errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please log in again' });
    }
    // Handle other types of token errors
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
  // Check if user exists and has an 'admin' role
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next(); // Proceed to the next middleware or route handler
};
