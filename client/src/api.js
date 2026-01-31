import axios from 'axios';

const API = axios.create({
    baseURL: '/api'
});

// Add a request interceptor to include JWT token
API.interceptors.request.use((req) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
    }
    return req;
});

export default API;
