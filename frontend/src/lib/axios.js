import axios from 'axios';

const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:5001/api' : '/api'
export const axiosInstance = axios.create({
    baseURL: BASE_URL, // Replace with your backend API base URL
    withCredentials: true, // Include cookies in requests
});