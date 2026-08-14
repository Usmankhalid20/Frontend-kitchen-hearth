import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { useRecipeStore } from '../../../stores/recipeStore';
import { useMealPlanStore } from '../../../stores/mealPlanStore';
import { Wand2, UtensilsCrossed, CalendarDays, ArrowRight } from 'lucide-react';
import Button from '../../../components/common/Button';
import { getRecipeImage } from '../../../utils/imageHelper';

const UserDashboard = () => {
  const { user } = useAuthStore();
  const { recipes, fetchRecipes, isLoading: loadingRecipes } = useRecipeStore();
  const { mealPlans, fetchMealPlans, isLoading: loadingMeals } = useMealPlanStore();

  useEffect(() => {
    fetchRecipes();
    fetchMealPlans();
  }, [fetchRecipes, fetchMealPlans]);

  const recentRecipes = recipes.slice(0, 3);
  const favoriteCount = recipes.filter(r => r.isFavorite).length;

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-400 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName}!</h1>
          <p className="text-amber-50 max-w-xl mb-6">
            What are we cooking today? Discover new recipes with your AI assistant or check your meal plans.
          </p>
          <Link to="/user/ai-assistant">
            <Button className="bg-amber-500 text-white hover:bg-amber-500 shadow-md">
              <Wand2 className="w-4 h-4 mr-2" />
              Create New Recipe
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
          <div className="bg-amber-100 p-3 rounded-lg text-amber-600">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Recipes</p>
            <p className="text-2xl font-bold text-gray-900">{loadingRecipes ? '-' : recipes.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-lg text-red-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Favorite Recipes</p>
            <p className="text-2xl font-bold text-gray-900">{loadingRecipes ? '-' : favoriteCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg text-green-600">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Planned Meals</p>
            <p className="text-2xl font-bold text-gray-900">{loadingMeals ? '-' : mealPlans.length}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Recipes */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Recipes</h2>
            <Link to="/user/recipes" className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {loadingRecipes ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-gray-100 rounded-xl"></div>
              ))}
            </div>
          ) : recentRecipes.length > 0 ? (
            <div className="space-y-4">
              {recentRecipes.map(recipe => (
                <div key={recipe._id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                    <img src={getRecipeImage(recipe)} alt={recipe.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{recipe.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>⏱️ {recipe.cookingTime}m</span>
                      <span>•</span>
                      <span>🍽️ {recipe.servings} serv</span>
                    </div>
                  </div>
                  <Link to={`/user/recipes/${recipe._id}`} className="p-2 text-gray-400 hover:text-amber-600 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <p className="text-gray-500 text-sm">No recipes saved yet.</p>
            </div>
          )}
        </div>

        {/* Upcoming Meals */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Upcoming Meals</h2>
            <Link to="/user/meal-planner" className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center">
              View planner <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {loadingMeals ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2].map(i => (
                <div key={i} className="h-20 bg-gray-100 rounded-xl"></div>
              ))}
            </div>
          ) : mealPlans.length > 0 ? (
            <div className="space-y-4">
              {mealPlans.slice(0, 3).map(plan => (
                <div key={plan._id} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                  <div className="flex flex-col items-center justify-center w-12 shrink-0 text-center">
                    <span className="text-xs font-bold text-amber-600 uppercase">
                      {new Date(plan.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className="text-xl font-black text-gray-900 leading-none mt-1">
                      {new Date(plan.date).getDate()}
                    </span>
                  </div>
                  <div className="h-10 w-px bg-gray-200"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{plan.recipe?.title || 'Unknown Recipe'}</p>
                    <p className="text-xs text-gray-500 mt-1 truncate">{plan.recipe?.description || 'No description available.'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                <CalendarDays className="w-6 h-6" />
              </div>
              <p className="text-gray-500 text-sm">No meals planned upcoming.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
