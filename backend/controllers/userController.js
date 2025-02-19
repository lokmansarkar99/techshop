import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



// Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.json({ message: 'User registered successfully' });
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, role: user.role });
};




// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password field from the response
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};


// Get Logged-in User Details
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
};


// Update User Info (Name, Email, and/or Password)
export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Find user by ID
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update Name and Email (if provided)
    if (name) {
      user.name = name;
    }
    // if (email) {
    //   const emailExists = await User.findOne({ email });
    //   if (emailExists) {
    //     return res.status(400).json({ message: 'Email already in use' });
    //   }
    //   user.email = email;
    // }

    // Update Password (if provided)
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user details
    await user.save();
    res.json({ message: 'User info updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user info', error });
  }
};

