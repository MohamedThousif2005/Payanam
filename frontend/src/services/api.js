import axios from 'axios';

const API_BASE_URL = 'http://localhost:8090/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const transportService = {
  unifiedSearch: (params) => api.post('/transport/unified-search', params),
  getBusLocations: () => api.get('/transport/buses/from-locations'),
  getAllBuses: () => api.get('/transport/buses'),
  advancedSearch: (params) => api.post('/transport/buses/advanced-search', params),
};

export const exploreService = {
  getPlaces: () => api.get('/explore/places'),
  getPlacesByCity: (city) => api.get(`/explore/places/city/${city}`),
};

export const vehicleService = {
  getAll: () => api.get('/vehicle-services'),
  getByType: (type) => api.get(`/vehicle-services/type/${type}`),
};

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
};

export default api;
