// axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Using the base URL from environment variables
  headers: {
    
  },
});

export default api;
