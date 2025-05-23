import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const methodsNeedToken = ["post", "put", "delete"];

api.interceptors.request.use(
  (request) => {
    const token = document.cookie.split("=")[1];
    if (token && methodsNeedToken.includes(request.method)) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default api;
