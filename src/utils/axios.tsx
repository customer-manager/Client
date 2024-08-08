import axios from 'axios';

export const BASE_URL="https://server-n6lp.onrender.com";

const axiosServices = axios.create({ baseURL: 'https://server-n6lp.onrender.com' });

export default axiosServices;