import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../../../stores/recipeStore';
import { ArrowLeft, Heart, Clock, Users, ChefHat, Trash2 } from 'lucide-react';
import Button from '../../../components/common/Button';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentRecipe: recipe, fetchRecipeById, toggleFavorite, deleteRecipe, isLoading, clearCurrentRecipe } = useRecipeStore();

  useEffect(() => {
    fetchRecipeById(id);
    return () => clearCurrentRecipe();
  }, [id, fetchRecipeById, clearCurrentRecipe]);

  if (isLoading || !recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse space-y-8">
        <div className="h-64 bg-gray-100 rounded-2xl w-full"></div>
        <div className="h-10 bg-gray-100 rounded-lg w-1/3"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="h-4 bg-gray-100 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      const success = await deleteRecipe(id);
      if (success) {
        navigate('/user/recipes');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/user/recipes" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-amber-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Recipes
      </Link>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        <div className="relative h-80 md:h-96 w-full bg-gray-100">
          <img 
            src={recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider text-amber-100">
                {recipe.difficulty}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{recipe.title}</h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-3xl line-clamp-2">{recipe.description}</p>
          </div>

          <div className="absolute top-6 right-6 flex items-center gap-3">
            <button 
              onClick={() => toggleFavorite(recipe._id)}
              className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all border border-white/30"
            >
              <Heart className={`w-6 h-6 ${recipe.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button 
              onClick={handleDelete}
              className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-600 transition-all border border-white/30"
            >
              <Trash2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 bg-gray-50 border-b border-gray-100">
          <div className="p-6 flex items-center justify-center gap-3">
            <Clock className="w-6 h-6 text-amber-500" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Cooking Time</p>
              <p className="text-lg font-bold text-gray-900">{recipe.cookingTime} mins</p>
            </div>
          </div>
          <div className="p-6 flex items-center justify-center gap-3">
            <Users className="w-6 h-6 text-amber-500" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Servings</p>
              <p className="text-lg font-bold text-gray-900">{recipe.servings} people</p>
            </div>
          </div>
          <div className="p-6 flex items-center justify-center gap-3">
            <ChefHat className="w-6 h-6 text-amber-500" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Generated via</p>
              <p className="text-lg font-bold text-gray-900">AI Assistant</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Ingredients
              </h3>
              <ul className="space-y-4">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                    <span className="text-gray-700 font-medium leading-relaxed">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Instructions
              </h3>
              <div className="space-y-6">
                {recipe.instructions?.map((instruction, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
