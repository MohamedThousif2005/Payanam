    import axios from 'axios';

const API_BASE_URL = 'http://localhost:8090/api/transport';

class BusService {
  
  async healthCheck() {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }

  async searchBuses(from, to, busType = 'all') {
    try {
      const response = await axios.post(`${API_BASE_URL}/buses/search`, {
        from,
        to,
        type: busType
      });
      return response.data;
    } catch (error) {
      console.error('Error searching buses:', error);
      throw error;
    }
  }

  async getFromLocations() {
    try {
      const response = await axios.get(`${API_BASE_URL}/buses/from-locations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching from locations:', error);
      throw error;
    }
  }

  async getToLocations() {
    try {
      const response = await axios.get(`${API_BASE_URL}/buses/to-locations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching to locations:', error);
      throw error;
    }
  }

  async getPopularRoutes() {
    try {
      const response = await axios.get(`${API_BASE_URL}/buses/popular-routes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching popular routes:', error);
      throw error;
    }
  }

  async getAllBuses() {
    try {
      const response = await axios.get(`${API_BASE_URL}/buses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all buses:', error);
      throw error;
    }
  }
}

export default new BusService();