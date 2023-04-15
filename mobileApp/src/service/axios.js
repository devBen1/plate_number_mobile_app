import axios from 'axios';
const BASE_URL = process.env.REACT_APP_IP_ADDRESS || 'http://192.168.0.109:8000';

export default axios.create({
    baseURL: `${BASE_URL}/api`,
});

export const axiosPrivate = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});
