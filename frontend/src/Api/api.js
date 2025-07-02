
// import axios from 'axios';
// const LOCALHOST='http://localhost:5054'

// export const API_BASE_URL = LOCALHOST

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// const token = localStorage.getItem('jwt');

// api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// api.defaults.headers.post['Content-Type'] = 'application/json';

// export default api;



import axios from 'axios';
const LOCALHOST=import.meta.env.VITE_API_BASE_URL

export const API_BASE_URL = LOCALHOST

const api = axios.create({
  baseURL: API_BASE_URL,
});

const token = localStorage.getItem('jwt');

api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;
