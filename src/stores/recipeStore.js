import { create } from 'zustand';
import { recipeService } from '../services/recipe.service';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  currentRecipe: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  fetchRecipes: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await recipeService.getUserRecipes(params);
      set({ 
        recipes: response.data, 
        pagination: response.pagination,
        isLoading: false 
      });
      return response;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch recipes',
        isLoading: false 
      });
      return false;
    }
  },

  fetchRecipeById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await recipeService.getRecipeById(id);
      set({ currentRecipe: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch recipe details',
        isLoading: false 
      });
      return null;
    }
  },

  toggleFavorite: async (id) => {
    try {
      const response = await recipeService.toggleFavorite(id);
      const updatedRecipe = response.data;
      
      // Update in lists
      set((state) => ({
        recipes: state.recipes.map(r => r._id === id ? { ...r, isFavorite: updatedRecipe.isFavorite } : r),
        currentRecipe: state.currentRecipe?._id === id ? { ...state.currentRecipe, isFavorite: updatedRecipe.isFavorite } : state.currentRecipe
      }));
      
      return true;
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      return false;
    }
  },

  deleteRecipe: async (id) => {
    try {
      await recipeService.deleteUserRecipe(id);
      set((state) => ({
        recipes: state.recipes.filter(r => r._id !== id),
        currentRecipe: state.currentRecipe?._id === id ? null : state.currentRecipe
      }));
      return true;
    } catch (error) {
      console.error('Failed to delete recipe:', error);
      return false;
    }
  },
  
  clearCurrentRecipe: () => set({ currentRecipe: null })
}));
