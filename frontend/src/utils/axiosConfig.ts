import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Lấy URL từ env
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
