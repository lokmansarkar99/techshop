// productApi.js
import api from './api';
import axios from 'axios';
// Create Product (Admin only)
// export const createProduct = async (productData, token) => {
//   try {
//     const response = await api.post('/products', productData, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Admin token required for this action
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data.message || 'Failed to create product');
//   }
// };

export const createProduct = async (productData, token) => {
  const api_url = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.post(`${api_url}/products`, productData, {
      headers: {
        Authorization: `Bearer ${token}`, // Admin token for authorization
        // No need to manually set Content-Type, Axios handles it for FormData
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create product");
  }
};

// Get All Products (Anyone can view)
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch products');
  }
};

// Get a Single Product by ID (Anyone can view)
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch product');
  }
};

// Update Product (Admin only)
export const updateProduct = async (id, updatedData, token) => {
  try {
    const response = await api.put(`/products/${id}`, updatedData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Admin token required for this action
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to update product');
  }
};

// Delete Product (Admin only)
export const deleteProduct = async (id, token) => {
  try {
    const response = await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Admin token required for this action
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to delete product');
  }
};
