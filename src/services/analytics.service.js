import apiClient from './apiClient';

export const analyticsService = {
  getAIUsage: async () => {
    const response = await apiClient.get('/admin/analytics');
    return response.data;
  }
};
