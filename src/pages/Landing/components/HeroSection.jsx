import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import Button from '../../../components/common/Button';
import { Sparkles, ArrowRight, ChefHat } from 'lucide-react';

const HeroSection = () => {
  const { isAuthenticated } = useAuthStore();
  const ctaLink = isAuthenticated ? '/ai-assistant' : '/login';

  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50/50 via-white to-white"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>Your personal AI sous-chef</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight max-w-4xl mb-6 leading-tight"
        >
          Turn an idea into a <span className="text-amber-500">recipe.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed"
        >
          Tell us what you want to cook, and we'll help you figure out what you need and how to make it.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to={ctaLink}>
            <Button variant="primary" className="w-full sm:w-auto shadow-lg shadow-amber-500/30 group">
              Create a Recipe
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="secondary" className="w-full sm:w-auto">
            Explore Recipes
          </Button>
        </motion.div>

        {/* Hero Visual Concept */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 w-full max-w-4xl rounded-2xl bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 p-6 text-left"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <div className="ml-4 text-sm font-medium text-gray-400">Kitchen Hearth Preview</div>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Spicy Chicken Tikka</h3>
              <div className="flex gap-4 text-sm text-gray-500 font-medium mb-4">
                <span className="flex items-center gap-1">⏱️ 45 mins</span>
                <span className="flex items-center gap-1">🍽️ 4 Servings</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                A rich, smoky, and perfectly spiced classic dinner that brings the restaurant experience home.
              </p>
              
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Ingredients</h4>
                <div className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div> 
                  1 lb Chicken Breast
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div> 
                  Yogurt & Tikka Spices
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden shadow-inner relative">
              <img 
                src="https://images.unsplash.com/photo-1504630083234-14187a9df0f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Delicious generated recipe" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
