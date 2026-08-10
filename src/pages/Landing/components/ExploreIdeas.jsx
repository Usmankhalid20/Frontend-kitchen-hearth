import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Flame, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { EXPLORE_CATEGORIES, EXPLORE_RECIPES } from '../data/landingData';

const ExploreIdeas = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredRecipes = activeCategory === 'all'
    ? EXPLORE_RECIPES
    : EXPLORE_RECIPES.filter((r) => r.category === activeCategory);

  const handleClick = (title) => {
    const target = isAuthenticated ? '/user/ai-assistant' : '/login';
    navigate(target, { state: { initialPrompt: `I want to make ${title}` } });
  };

  return (
    <section id="explore" className="section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4"
        >
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-600 mb-3">Inspiration</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Recipe inspiration</h2>
            <p className="text-base sm:text-lg" style={{ color: 'var(--color-text-secondary)' }}>Need an idea? Try one of these crowd favorites.</p>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {EXPLORE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Horizontal Carousel */}
        <div className="carousel-scroll flex gap-6 overflow-x-auto pb-4 pt-1 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="popLayout">
            {filteredRecipes.map((recipe) => (
              <motion.div
                key={recipe.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                onClick={() => handleClick(recipe.title)}
                className="carousel-item w-[280px] sm:w-[300px] premium-card cursor-pointer overflow-hidden group shrink-0 flex flex-col"
              >
                {/* Image — 16:9 aspect ratio */}
                <div className="relative w-full overflow-hidden rounded-t-[18px]" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    style={{ willChange: 'transform' }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  {/* Difficulty badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-sm bg-white/80 border border-white/60 ${recipe.diffColor}`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                  {/* Calories overlay */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white text-xs font-semibold drop-shadow-sm bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1">
                      {recipe.calories}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-amber-600 transition-colors leading-snug">
                    {recipe.title}
                  </h3>

                  {/* Meta row */}
                  <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {recipe.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      {recipe.servings} srv
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      {recipe.calories}
                    </span>
                  </div>

                  {/* Macro-nutrient chips */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="nutrient-chip">🥩 Protein: {recipe.protein}</span>
                    <span className="nutrient-chip">🌾 Carbs: {recipe.carbs}</span>
                    <span className="nutrient-chip">🫒 Fat: {recipe.fat}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ExploreIdeas;
