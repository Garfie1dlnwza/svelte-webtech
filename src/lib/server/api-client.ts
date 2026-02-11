import axios from 'axios';
import { API_URL } from '$env/static/private';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
    },
    timeout: 10000, // 10 seconds
});
