import axios from "axios";

const api = axios.create({
  baseURL: "https://contactman-e3bw.onrender.com"
});

export default api;
