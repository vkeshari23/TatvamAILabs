import axios from "axios";

export const backendAPI =
  "https://api-tatvamailabs.onrender.com";

const api = axios.create({
  baseURL: backendAPI,
});

export default api;