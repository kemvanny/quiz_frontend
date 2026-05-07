// កន្លែងកំណត់ baseURL: localhost:3000/api និង Header Token
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

// ដាក់ Token ចូលក្នុង Header ស្វ័យប្រវត្តិរាល់ពេល Call API
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;