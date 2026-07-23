import apiClient from './apiClient';

export const recipeService = {
  // Admin Endpoints
  getRecipesAdmin: async (params) => {
    const response = await apiClient.get('/admin/recipes', { params });
    return response.data;
  },
  deleteRecipeAdmin: async (id) => {
    const response = await apiClient.delete(`/admin/recipes/${id}`);
    return response.data;
  },

  // User Endpoints
  getUserRecipes: async (params) => {
    const response = await apiClient.get('/recipes', { params });
    return response.data;
  },
  getRecipeById: async (id) => {
    const response = await apiClient.get(`/recipes/${id}`);
    return response.data;
  },
  deleteUserRecipe: async (id) => {
    const response = await apiClient.delete(`/recipes/${id}`);
    return response.data;
  },
  toggleFavorite: async (id) => {
    const response = await apiClient.patch(`/recipes/${id}/favorite`);
    return response.data;
  },
};
