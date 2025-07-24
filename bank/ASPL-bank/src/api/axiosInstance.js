import axios from "axios";

// Decode JWT to get expiration time
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

// Checks if token will expire in next 30 seconds
function isTokenExpiringSoon(token) {
  const payload = parseJwt(token);
  if (!payload?.exp) return false;

  const expiryTime = payload.exp * 1000; // in ms
  const currentTime = Date.now();
  const buffer = 30 * 1000; // 30 seconds buffer
  return expiryTime - currentTime < buffer;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8072",
});

// --- Request Interceptor ---
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refresh_token");

    // If token exists and is expiring soon, refresh it first
    if (token && refreshToken && isTokenExpiringSoon(token)) {
      try {
        const res = await axios.post(
          "http://localhost:8072/api/auth/refresh",
          { refreshToken }
        );
        const { token: newToken, refreshToken: newRefreshToken } = res.data;

        localStorage.setItem("token", newToken);
        if (newRefreshToken) {
          localStorage.setItem("refresh_token", newRefreshToken);
        }
        token = newToken; // Update the token to be attached below
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        window.location = "/login";
        throw new axios.Cancel("Session expired. Redirecting to login.");
      }
    }

    // Attach token if present
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response Interceptor (fallback 401 handler) ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh_token")
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:8072/api/auth/refresh",
          { refreshToken: localStorage.getItem("refresh_token") }
        );
        const { token: newToken, refreshToken: newRefreshToken } = res.data;

        localStorage.setItem("token", newToken);
        if (newRefreshToken) {
          localStorage.setItem("refresh_token", newRefreshToken);
        }
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
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
