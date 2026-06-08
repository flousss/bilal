import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const rmaService = {
  // Get all RMAs
  getAllRMAs: (params = {}) => api.get('/rmas', { params }),

  // Get single RMA
  getRMAById: (id) => api.get(`/rmas/${id}`),

  // Create new RMA
  createRMA: (data) => api.post('/rmas', data),

  // Update RMA
  updateRMA: (id, data) => api.put(`/rmas/${id}`, data),

  // Update RMA status
  updateRMAStatus: (id, status, notes = '') => 
    api.patch(`/rmas/${id}/status`, { status, notes }),

  // Delete RMA
  deleteRMA: (id) => api.delete(`/rmas/${id}`),

  // Search RMAs
  searchRMAs: (query) => api.get('/rmas/search/all', { params: { q: query } }),

  // Health check
  checkHealth: () => api.get('/health')
};

export default api;
