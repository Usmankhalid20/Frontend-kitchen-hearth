import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../../../stores/recipeStore';
import { Search, Heart, Clock, Users, ArrowRight, UtensilsCrossed } from 'lucide-react';

const RecipeCard = ({ recipe, toggleFavorite }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} 
          alt={recipe.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button 
          onClick={(e) => { e.preventDefault(); toggleFavorite(recipe._id); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
        >
          <Heart className={`w-5 h-5 ${recipe.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{recipe.title}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{recipe.description}</p>
        
        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>{recipe.cookingTime}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-amber-500" />
            <span>{recipe.servings}</span>
          </div>
          <div className="ml-auto text-amber-600 font-bold capitalize">
            {recipe.difficulty}
          </div>
        </div>
        
        <Link 
          to={`/user/recipes/${recipe._id}`} 
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-50 text-amber-700 font-semibold text-sm hover:bg-amber-100 transition-colors mt-auto"
        >
          View Recipe <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

const MyRecipes = () => {
  const { recipes, fetchRecipes, isLoading, toggleFavorite } = useRecipeStore();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const filteredRecipes = recipes.filter(r => {
    if (filter === 'favorites' && !r.isFavorite) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Recipes</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and cook your generated recipes.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search recipes..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm text-black transition-all"
            />
          </div>
          
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
          >
            <option value="all">All Recipes</option>
            <option value="favorites">Favorites</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="h-80 bg-gray-50 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} toggleFavorite={toggleFavorite} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm mb-4">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No recipes found</h3>
          <p className="text-gray-500 mb-6 max-w-sm text-center">
            {search || filter === 'favorites' ? "Try adjusting your filters or search terms." : "You haven't generated any recipes yet."}
          </p>
          <Link to="/user/ai-assistant" className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-colors">
            Generate a Recipe
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
