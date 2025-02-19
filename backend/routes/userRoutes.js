import express from 'express';
import { registerUser, loginUser,  updateUser, getAllUsers , getUserProfile} from '../controllers/userController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


// Get all users route (Admin only)
router.get('/all', protect, isAdmin , getAllUsers);

// Update User Info (Only accessible to logged-in users)
router.put('/update', protect, updateUser);

router.get("/me", protect, getUserProfile);

export default router;
