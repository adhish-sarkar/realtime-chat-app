import axios from 'axios';
import { HOST } from '@/utils/constants';
const token = localStorage.getItem('token');

const apiClient = axios.create({
    baseURL: HOST,
    withCredentials: true,
    headers: {
        Authorization: token
    }
});

export default apiClient;