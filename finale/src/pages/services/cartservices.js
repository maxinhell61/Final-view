import axios from 'axios';
import { CART_URL } from '../../config';

const getToken = () => localStorage.getItem('token');

export const addToCart = async (product_id, quantity = 1) => {
  try {
    const response = await axios.post(
      `${CART_URL}/add`,
      { product_id, quantity },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error adding to cart' };
  }
};






export const updateCartQuantity = async (product_id, quantity) => {
  try {
    const token = getToken();
    if (!token) {
      throw { message: 'No token found. Please log in again.' };
    }

    const response = await axios.post(
      `${CART_URL}/update_cart_quantity`,
      { product_id, quantity },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('🛑 Error occurred while updating cart quantity');
    if (error.response) {
      console.error('📦 error.response.status:', error.response.status);
      console.error('📦 error.response.data:', error.response.data);
    }
    console.log('📤 Payload sent:', { product_id, quantity });
    throw error.response?.data || { message: 'Error updating cart (unhandled)' };
  }
};

// Remove a cart item by its cart ID.
export const removeFromCart = async (cart_id) => {
  try {
    const token = getToken();
    if (!token) {
      throw { message: 'No token found. Please log in again.' };
    }

    const response = await axios.delete(
      `${CART_URL}/remove/${cart_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('🛑 Error occurred while removing from cart');
    if (error.response) {
      console.error('📦 error.response.status:', error.response.status);
      console.error('📦 error.response.data:', error.response.data);
    }
    throw error.response?.data || { message: 'Error removing from cart (unhandled)' };
  }
};






//debugging 
// import axios from 'axios';
// import { CART_URL } from '../../config';

// // const getToken = () => localStorage.getItem('token');
// const getToken = () => {
//   const token = localStorage.getItem('token');
//   console.log("🪪 Token from localStorage:", token);
//   return token;
// };


// export const addToCart = async (product_id, quantity = 1) => {
//   try {
//     const token = getToken();

//     if (!token) {
//       throw { message: 'No token found. Please log in again.' };
//     }

//     const response = await axios.post(
//       `${CART_URL}/add`,
//       { product_id, quantity },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error('🛑 Error occurred while adding to cart');
  
//     // Axios response block
//     if (error.response) {
//       console.error('📦 error.response.status:', error.response.status);
//       console.error('📦 error.response.data:', error.response.data);
//       console.error('📦 error.response.headers:', error.response.headers);
  
//       // If it's a validation error like 422, log the payload that triggered it
//       if (error.response.status === 422) {
//         console.warn('⚠️ Likely a validation error (422). Check product_id and quantity.');
//       }
//     } else if (error.request) {
//       // Request made, but no response
//       console.error('📡 No response received. error.request:', error.request);
//     } else {
//       // Setup or other error
//       console.error('⚙️ Error setting up request:', error.message);
//     }
  
//     // Log the token being used for auth
//     const token = getToken();
//     if (!token) {
//       console.warn('🪪 No token found in sessionStorage!');
//     } else {
//       console.log('🪪 Token used:', token);
//     }
  
//     // Log request payload just in case
//     console.log('📤 Payload sent:', {
//       product_id,
//       quantity
//     });
  
//     // Rethrow for handling in calling component
//     throw error.response?.data || { message: 'Error adding to cart (unhandled)' };
//   }
  
// };
