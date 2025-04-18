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
    if (!data) {
      console.warn('Empty response received');
      return { error: 'Empty response received from server' };
    }
    try {
      const parsed = JSON.parse(data);
      if (Object.keys(parsed).length === 0) {
        console.warn('Empty object received in response');
        return { error: 'Empty data received from server' };
      }
      return parsed;
    } catch (e) {
      console.warn('Failed to parse response:', data);
      return { error: 'Invalid JSON response from server', data };
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

    // Check for empty response data
    if (!response.data || (typeof response.data === 'object' && Object.keys(response.data).length === 0)) {
      console.warn('Empty response data received');
      return Promise.reject({
        response: {
          status: response.status,
          data: { error: 'Empty response received' },
          config: response.config
        }
      });
    }

    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API Response Error:", {
        status: error.response.status,
        data: error.response.data || { error: 'No error details provided' },
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
