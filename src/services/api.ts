import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ldi-api.herokuapp.com/'
});

export default api;