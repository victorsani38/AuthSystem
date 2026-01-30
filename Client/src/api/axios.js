import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URI ||" http://localhost:3000"
const API = axios.create({
    baseURL:BASE_URL + "/api",
    withCredentials:true
})
export default API