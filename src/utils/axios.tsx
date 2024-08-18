import axios from 'axios';

export const BASE_URL="https://postgresql-server.onrender.com";

const axiosServices = axios.create({ baseURL: 'https://postgresql-server.onrender.com' });

export default axiosServices;
