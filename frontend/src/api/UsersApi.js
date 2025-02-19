import api from "./api";


// Register User
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong during registration');
  }
};

// Login User
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/users/login', loginData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong during login');
  }
};

// Get All Users (Admin only)
export const getAllUsers = async (token) => {
  try {
    const response = await api.get('/users', {
      headers: { Authorization: `Bearer ${token}` }, // Authorization header for admin access
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch users');
  }
};

// Update User Info (Name, Email, and/or Password)
export const updateUser = async (token, updatedData) => {
  try {
    const response = await api.put('/update', updatedData, {
      headers: { Authorization: `Bearer ${token}` }, // Authorization header
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to update user info');
  }
};



