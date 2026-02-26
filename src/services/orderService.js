import axios from 'axios';

// Backend API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dry-fruit-store.onrender.com';

/**
 * Create an order (COD or UPI)
 * @param {Object} orderData - Order details (cart items, customer info, payment method)
 * @returns {Promise} Order creation result
 */
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/create-order`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      throw new Error('Cannot connect to server. Please make sure the backend server is running on port 5000.');
    }
    
    if (error.response) {
      const message = error.response.data?.error || error.response.data?.message || 'Server error';
      throw new Error(`Order error: ${message}`);
    }
    
    throw new Error('Failed to create order. Please try again.');
  }
};


