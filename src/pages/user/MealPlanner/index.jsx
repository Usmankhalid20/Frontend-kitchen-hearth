import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMealPlanStore } from '../../../stores/mealPlanStore';
import { useRecipeStore } from '../../../stores/recipeStore';
import { CalendarDays, Trash2, Plus, ArrowRight } from 'lucide-react';
import Button from '../../../components/common/Button';

const MealPlanner = () => {
  const { mealPlans, fetchMealPlans, isLoading, deleteMealPlan, addMealPlan } = useMealPlanStore();
  const { recipes, fetchRecipes } = useRecipeStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchMealPlans();
    fetchRecipes();
  }, [fetchMealPlans, fetchRecipes]);

  // Sort meal plans by date
  const sortedMealPlans = [...mealPlans].sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleAddMealPlan = async (e) => {
    e.preventDefault();
    if (!selectedRecipe || !selectedDate) return;
    
    setIsSubmitting(true);
    const success = await addMealPlan({ recipe: selectedRecipe, date: selectedDate });
    setIsSubmitting(false);
    
    if (success) {
      setIsModalOpen(false);
      setSelectedRecipe('');
      setSelectedDate('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meal Planner</h1>
          <p className="text-gray-500 text-sm mt-1">Organize your upcoming meals.</p>
        </div>
        
        <Button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto shadow-md">
          <Plus className="w-4 h-4 mr-2" /> Plan a Meal
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-50 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : sortedMealPlans.length > 0 ? (
        <div className="space-y-4">
          {sortedMealPlans.map(plan => {
            const dateObj = new Date(plan.date);
            return (
              <div key={plan._id} className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex flex-col items-center justify-center w-20 shrink-0 text-center bg-amber-50 rounded-xl p-3">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                    {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                  <span className="text-2xl font-black text-gray-900 leading-none mt-1">
                    {dateObj.getDate()}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 mt-1">
                    {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.recipe?.title || 'Unknown Recipe'}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">{plan.recipe?.description || 'No description available.'}</p>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <Link 
                    to={`/user/recipes/${plan.recipe?._id}`}
                    className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl font-semibold text-sm transition-colors"
                  >
                    View Recipe
                  </Link>
                  <button 
                    onClick={() => {
                      if (window.confirm('Remove this meal from your plan?')) {
                        deleteMealPlan(plan._id);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm mb-4">
            <CalendarDays className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No meals planned yet</h3>
          <p className="text-gray-500 mb-6 max-w-sm text-center">
            Start organizing your week by assigning your saved recipes to specific dates.
          </p>
          <Button onClick={() => setIsModalOpen(true)} className="shadow-md">
            Plan a Meal
          </Button>
        </div>
      )}

      {/* Plan Meal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Plan a Meal</h3>
            </div>
            
            <form onSubmit={handleAddMealPlan} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Recipe</label>
                <select 
                  required
                  value={selectedRecipe}
                  onChange={(e) => setSelectedRecipe(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="" disabled>Choose a saved recipe</option>
                  {recipes.map(r => (
                    <option key={r._id} value={r._id}>{r.title}</option>
                  ))}
                </select>
                {recipes.length === 0 && (
                  <p className="text-xs text-amber-600 mt-2">You need to save some recipes first.</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input 
                  type="date" 
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div className="pt-2 flex gap-3">
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 shadow-md"
                  disabled={isSubmitting || recipes.length === 0}
                >
                  {isSubmitting ? 'Saving...' : 'Add to Plan'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
