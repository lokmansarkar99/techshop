// routes/cartRoutes.js
import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get the current user's cart
router.get('/', protect, getCart);

// Add a product to the user's cart
router.post('/', protect, addToCart);

// Update the quantity of a product in the user's cart
router.put('/update', protect, updateCartItem);

// Remove a product from the user's cart
router.delete('/remove', protect, removeFromCart);

export default router;
