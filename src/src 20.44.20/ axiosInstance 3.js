import axios from 'axios';
import { backendBaseUrl } from './constant';

const instance = axios.create({
    baseURL: backendBaseUrl, // Set your base URL
    timeout: 5000, // Set your timeout// 
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
});

export default instance;