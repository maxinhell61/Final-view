// authServices.js
import axios from "axios";
import { AUTH_URL } from "../../config";

// Register User Function
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    const { access_token, user } = response.data;

    // Store login data in session storage
    sessionStorage.setItem("access_token", access_token);
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("name", user.name);
    sessionStorage.setItem("id", user.id);
    sessionStorage.setItem("role", user.role);

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};








// export const loginUser = async (userData) => {
//     try {
//       const response = await axios.post(`${API_URL}/login`, userData, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       return response.data; // Return response data

//     } catch (error) {
//       throw error.response?.data || { message: 'Login failed' }; // Handle error
//     }
//   };