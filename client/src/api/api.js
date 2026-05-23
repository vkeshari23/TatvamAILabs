import axios from "axios";

export const backendAPI =
  "http://localhost:4500";

const api = axios.create({
  baseURL: backendAPI,
});

export default api;