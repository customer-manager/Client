import axios from 'axios';

export const BASE_URL="http://localhost:8002";

const axiosServices = axios.create({ baseURL: 'http://localhost:8002' });

export default axiosServices;