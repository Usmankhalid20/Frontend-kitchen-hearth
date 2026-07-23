import { create } from 'zustand';
import { mealPlanService } from '../services/mealPlan.service';

export const useMealPlanStore = create((set, get) => ({
  mealPlans: [],
  isLoading: false,
  error: null,

  fetchMealPlans: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await mealPlanService.getMealPlans(params);
      set({ mealPlans: response.data, isLoading: false });
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch meal plans',
        isLoading: false 
      });
      return false;
    }
  },

  addMealPlan: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await mealPlanService.createMealPlan(data);
      set((state) => ({ 
        mealPlans: [...state.mealPlans, response.data],
        isLoading: false 
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to add meal plan',
        isLoading: false 
      });
      return null;
    }
  },

  deleteMealPlan: async (id) => {
    try {
      await mealPlanService.deleteMealPlan(id);
      set((state) => ({
        mealPlans: state.mealPlans.filter(mp => mp._id !== id)
      }));
      return true;
    } catch (error) {
      console.error('Failed to delete meal plan:', error);
      return false;
    }
  }
}));
