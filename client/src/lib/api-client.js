import axios from 'axios';
import { HOST } from '@/utils/constants';
const token = localStorage.getItem('token');

const apiClient = axios.create({
    baseURL: HOST,
    withCredentials: true,
    headers: {
        'x-accesss-token': token
    }
});

export default apiClient;