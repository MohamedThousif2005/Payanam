import axios from 'axios';

const API_BASE_URL = 'http://localhost:8090/api/transport'; // Changed to 8090

// Create axios instance with better error handling
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const busService = {
  // Search buses
  searchBuses: async (from, to, busType = 'all') => {
    try {
      console.log('Searching buses:', { from, to, busType });
      const response = await api.post('/buses/search', {
        from,
        to,
        type: busType
      });
      console.log('Search response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching buses:', error);
      // Return empty array instead of throwing to prevent UI crashes
      return [];
    }
  },

  // Get all from locations
  getFromLocations: async () => {
    try {
      console.log('Fetching from locations...');
      const response = await api.get('/buses/from-locations');
      console.log('From locations:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching from locations:', error);
      // Return some default locations as fallback
      return [
        'Chennai Koyambedu',
        'Madurai Periyar', 
        'Coimbatore Ukkadam',
        'Trichy Central',
        'Salem New Bus Stand',
        'Tirunelveli New Bus Stand',
        'Erode New Bus Stand',
        'Vellore Katpadi',
        'Kanyakumari Bus Stand',
        'Ooty Bus Stand'
      ];
    }
  },

  // Get all to locations
  getToLocations: async () => {
    try {
      console.log('Fetching to locations...');
      const response = await api.get('/buses/to-locations');
      console.log('To locations:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching to locations:', error);
      // Return some default locations as fallback
      return [
        'Chennai Koyambedu',
        'Madurai Periyar',
        'Coimbatore Ukkadam', 
        'Trichy Central',
        'Salem New Bus Stand',
        'Tirunelveli New Bus Stand',
        'Erode New Bus Stand',
        'Vellore Katpadi',
        'Kanyakumari Bus Stand',
        'Ooty Bus Stand'
      ];
    }
  },

  // Get popular routes
  getPopularRoutes: async () => {
    try {
      console.log('Fetching popular routes...');
      const response = await api.get('/buses/popular-routes');
      console.log('Popular routes:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching popular routes:', error);
      // Return default popular routes
      return [
        'Chennai → Madurai (15 buses)',
        'Chennai → Coimbatore (12 buses)',
        'Chennai → Trichy (10 buses)',
        'Madurai → Chennai (15 buses)',
        'Coimbatore → Chennai (12 buses)',
        'Chennai → Salem (8 buses)'
      ];
    }
  },

  // Search by location (fuzzy search)
  searchByLocation: async (location) => {
    try {
      const response = await api.get(`/buses/search/location/${location}`);
      return response.data;
    } catch (error) {
      console.error('Error searching by location:', error);
      return [];
    }
  },

  // Get all buses (for testing)
  getAllBuses: async () => {
    try {
      const response = await api.get('/buses');
      return response.data;
    } catch (error) {
      console.error('Error fetching all buses:', error);
      return [];
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Backend health check failed:', error);
      throw error;
    }
  },

  // Get statistics
  getStats: async () => {
    try {
      const response = await api.get('/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return 'Unable to load statistics';
    }
  }
};

export default busService;