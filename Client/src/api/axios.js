import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URI
const API = axios.create({
    baseURL:BASE_URL + "/api",
    withCredentials:true
})

export default API
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token")  
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`
//   }
//   return req
// })