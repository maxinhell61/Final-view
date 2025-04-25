// productService.js
import axios from "axios";
import { PRODUCT_URL } from "../config"; 

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${PRODUCT_URL}`);
    return response.data.products;
  } catch (error) {
    throw new Error("Failed to load products");
  }
};
