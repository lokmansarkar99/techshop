import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { upload } from './../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);        // Get all products
router.get('/:id', getProductById);     // Get a single product by ID

// Protected routes (Admin only)
router.post('/', protect, isAdmin, upload.single("image"), createProduct);  // Admin only
router.put('/:id', protect, isAdmin, upload.single("image") ,  updateProduct);  // Admin only
router.delete('/:id', protect, isAdmin,  deleteProduct);  // Admin only

export default router;
