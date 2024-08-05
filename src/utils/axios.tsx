import axios from 'axios';

export const BASE_URL="http://localhost:5000";

const axiosServices = axios.create({ baseURL: 'http://localhost:5000' });

export default axiosServices;