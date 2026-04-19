import axios from "axios";

const api = axios.create({
    baseURL: "https://pagination-sorting-filtering-backend.onrender.com/api/employee"
})

export default api;
