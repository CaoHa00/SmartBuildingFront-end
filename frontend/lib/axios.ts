import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.60.253.172:9090/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  timeout: 5000,
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
  transformRequest: [(data) => {
    if (!data) return data;
    return JSON.stringify(data);
  }],
  transformResponse: [(data) => {
    if (!data) return {};
    try {
      return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to parse response:', data);
      return data;
    }
  }]
});

api.interceptors.request.use((config) => {
  console.log('Request:', {
    method: config.method,
    url: config.url,
    data: config.data,
    params: config.params
  });
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
      url: response.config?.url,
      method: response.config?.method
    });
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API Response Error:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
        method: error.config?.method
      });
    } else if (error.request) {
      console.error("API Request Error: No response received", {
        url: error.config?.url,
        method: error.config?.method
      });
    } else {
      console.error("API Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);
