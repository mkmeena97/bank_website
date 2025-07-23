import axios from "axios";
import keycloak from "../auth/keycloak";

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Request interceptor: Attach token and optionally refresh
api.interceptors.request.use(
  async (config) => {
    try {
      if (keycloak?.token) {
        // Try refreshing token if it's going to expire in next 30s
        await keycloak.updateToken(30);

        // Attach token regardless of refresh
        config.headers.Authorization = `Bearer ${keycloak.token}`;
      }
    } catch (error) {
      console.error("🔴 Token refresh failed in request interceptor:", error);
      keycloak.logout();
      return Promise.reject("Session expired. You have been logged out.");
    }

    return config;
  },
  (error) => {
    console.error("🔴 Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor: Handle 401 with silent retry once
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized only if this is the first retry
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      keycloak?.token
    ) {
      console.warn("⚠️ 401 Unauthorized – attempting silent refresh...");

      originalRequest._retry = true;

      try {
        await keycloak.updateToken(30);

        // Attach the new token and retry the request
        originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("🔴 Silent refresh failed in response interceptor:", refreshError);
        keycloak.logout();
        return Promise.reject("Session expired. You have been logged out.");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
