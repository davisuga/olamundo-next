import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 100000,
  headers: { mode: "no-cors" },
});

export default api;
