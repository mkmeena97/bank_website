import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8072"
});

// Request Interceptor: Attach JWT from LocalStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 401/refresh interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 &&
      !error.config._retry &&
      localStorage.getItem("refresh_token")
    ) {
      error.config._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        // Call backend refresh API
        const res = await axios.post(
          "http://localhost:8072/api/auth/refresh",
          { refreshToken }
        );
        // The backend returns { token, refreshToken, idToken, ... }
        const { token: newToken, refreshToken: newRefreshToken } = res.data;
        // Save new token(s)
        localStorage.setItem("token", newToken);
        if (newRefreshToken) {
          localStorage.setItem("refresh_token", newRefreshToken);
        }
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api(error.config);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        window.location = "/login";
        return Promise.reject("Session expired. Please login again.");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
