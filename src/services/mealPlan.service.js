import apiClient from './apiClient';

export const mealPlanService = {
  getMealPlans: async (params) => {
    const response = await apiClient.get('/meal-plans', { params });
    return response.data;
  },
  
  createMealPlan: async (data) => {
    const response = await apiClient.post('/meal-plans', data);
    return response.data;
  },

  deleteMealPlan: async (id) => {
    const response = await apiClient.delete(`/meal-plans/${id}`);
    return response.data;
  }
};
