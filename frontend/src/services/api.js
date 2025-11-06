import axios from 'axios';

const API_BASE_URL = import.meta.env.API_ENDPOINT || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const deviceAPI = {
  getAll: () => api.get('/devices'),
  getOne: (id) => api.get(`/devices/${id}`),
  create: (data) => api.post('/devices', data),
  update: (id, data) => api.put(`/devices/${id}`, data),
  delete: (id) => api.delete(`/devices/${id}`),
};

export const presetAPI = {
  getAll: () => api.get('/presets'),
  getOne: (id) => api.get(`/presets/${id}`),
  create: (data) => api.post('/presets', data),
  update: (id, data) => api.put(`/presets/${id}`, data),
  delete: (id) => api.delete(`/presets/${id}`),
};

export default api;
