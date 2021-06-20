import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lar-dos-idosos-api.netlify.app/v1'
  // baseURL: 'http://localhost:3333/v1'
});

export default api;