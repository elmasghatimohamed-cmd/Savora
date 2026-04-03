import api from './axios';

export const platesService = {
  getAll: async () => {
    const response = await api.get('/plates');
    return response.data;
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/plates/${id}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching plate:', err);
      throw err;
    }
  },

  search: async (query) => {
    try {
      const response = await api.get(`/plates?search=${query}`);
      return response.data;
    } catch (err) {
      console.error('Error searching plates:', err);
    }
  },
};
