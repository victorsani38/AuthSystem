import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URI
const API = axios.create({
    baseURL:BASE_URL + "/api",
    withCredentials:true,
    headers: {
    "Content-Type": "application/json",
  },
})

export default API 
