import axios from 'axios';

// Yahan backend ka URL hona zaroori hai
const API_BASE_URL = 'https://real-time-chat-app-backend-l2od.onrender.com/api/v1';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Cookies bhejne aur receive karne ke liye yeh bohot zaroori hai
});

export default apiClient;