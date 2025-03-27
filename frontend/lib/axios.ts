import axios from "axios";

export const api = axios.create({
  // Using direct URL for testing - consider moving to environment variable later
  baseURL: "http://10.60.253.172:9090/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error("API Response Error:", {
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      // Request made but no response received
      console.error("API Request Error: No response received", error.request);
    } else {
      // Error setting up request
      console.error("API Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);
