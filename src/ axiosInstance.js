import axios from 'axios';

const instAxiosInstancence = axios.create({
    baseURL: 'http://localhost:3001/', // Set your base URL
    timeout: 5000, // Set your timeout// 
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
});

export default instAxiosInstancence;