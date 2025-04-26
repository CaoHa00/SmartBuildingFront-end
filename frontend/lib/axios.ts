import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.60.253.172:9092/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
});

// Add interceptors for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject({ message: "Request timed out. Please check your connection." });
    }
    if (!error.response) {
      return Promise.reject({ message: "Network error. Please check if the API server is running." });
    }
    return Promise.reject(error.response.data || error);
  }
);