import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const isClient = typeof window !== 'undefined';
  if (isClient) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(err);
  }
);

export const fetcher = {
  get: <T>(url: string) => api.get<T>(url).then((res) => res.data),
  post: <T>(url: string, data?: any) =>
    api.post<T>(url, data).then((res) => res.data),
  put: <T>(url: string, data?: any) =>
    api.put<T>(url, data).then((res) => res.data),
  delete: <T>(url: string) => api.delete<T>(url).then((res) => res.data),
};

export default api;
