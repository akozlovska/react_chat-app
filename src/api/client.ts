import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

client.interceptors.response.use((res) => res.data);
