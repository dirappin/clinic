import axios from 'axios';

const AxiosInstancence = axios.create({
    baseURL: 'https://medicentetr-ebebb7641fbe.herokuapp.com/', // Set your base URL
    timeout: 5000, // Set your timeout// 
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
});

export default AxiosInstancence;