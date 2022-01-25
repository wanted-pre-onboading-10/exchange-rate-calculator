import axios from 'axios';

const API = axios.create({
  baseURL: 'http://api.currencylayer.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
