import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const CreateSession = async (email, password) => {
  return api.post('/sessions', { email, password });
};
