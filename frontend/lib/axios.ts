import axios from "axios";

export const api = axios.create({
  // Using direct URL for testing - consider moving to environment variable later
  baseURL: "http://10.60.253.172:9092/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});
