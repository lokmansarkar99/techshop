import express from 'express';
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} from '../controllers/orderController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder); // Users can place orders
router.get('/my-orders', protect, getMyOrders); // Users can see their orders
router.get('/', protect, isAdmin, getAllOrders); // Admin can see all orders
router.put('/:id', protect, isAdmin, updateOrderStatus); // Admin can update order status
router.delete('/:id', protect, isAdmin, deleteOrder); // Admin can delete orders

export default router;
