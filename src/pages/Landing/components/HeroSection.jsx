import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import Button from '../../../components/common/Button';
import { Sparkles, ArrowRight, Play, Star, Clock, Users, Flame, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { PRESET_RECIPES } from '../data/presetRecipes';

const HeroSection = ({ onOpenDemo }) => {
  const { isAuthenticated } = useAuthStore();
  const ctaLink = isAuthenticated ? '/user/ai-assistant' : '/login';

  const [activeRecipe, setActiveRecipe] = useState(PRESET_RECIPES[0]);
  const [inputText, setInputText] = useState(PRESET_RECIPES[0].prompt);
  const [showRecipe, setShowRecipe] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const typingRef = useRef(null);

  // Initial typewriter effect
  useEffect(() => {
    let i = 0;
    const targetText = PRESET_RECIPES[0].prompt;
    setInputText('');

    const startDelay = setTimeout(() => {
      typingRef.current = setInterval(() => {
        if (i < targetText.length) {
          setInputText(targetText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typingRef.current);
          setIsProcessing(true);
          setTimeout(() => {
            setIsProcessing(false);
            setShowRecipe(true);
          }, 1400);
        }
      }, 45);
    }, 800);

    return () => {
      clearTimeout(startDelay);
      clearInterval(typingRef.current);
    };
  }, []);

  // Preset chip selection
  const handleSelectPreset = (preset) => {
    if (isProcessing) return;
    clearInterval(typingRef.current);
    setActiveRecipe(preset);
    setInputText(preset.prompt);
    setShowRecipe(false);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowRecipe(true);
    }, 1200);
  };

  const floatingIngredients = [
    { emoji: '🧄', top: '4%', left: '-2%', delay: 0 },
    { emoji: '🌶️', top: '10%', right: '-1%', delay: 0.5 },
    { emoji: '🍚', bottom: '18%', left: '-3%', delay: 1 },
    { emoji: '🥬', bottom: '8%', right: '-2%', delay: 1.5 },
    { emoji: '🍋', top: '48%', left: '-4%', delay: 0.8 },
    { emoji: '🌿', top: '58%', right: '-3%', delay: 1.2 },
  ];

  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-100/30 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-100/20 blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: Typography ── */}
          <div className="flex-1 max-w-xl text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm"
              style={{ backgroundColor: '#FEF7E6', color: '#B45309', border: '1px solid rgba(245,158,11,0.25)' }}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Your personal AI sous-chef</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
              style={{ color: 'var(--color-text)' }}
            >
              Turn ingredients into{' '}
              <span className="gradient-text">restaurant-quality</span>{' '}
              recipes.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Type your ingredients, cravings, or a meal idea — and instantly receive a complete recipe with ingredients, step-by-step instructions, and nutrition info.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link to={ctaLink}>
                <Button variant="primary" className="w-full sm:w-auto shadow-lg shadow-amber-500/25 group text-sm px-7 py-3">
                  Generate Recipe
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm cursor-pointer group"
              >
                <Play className="w-4 h-4 fill-amber-500 text-amber-500 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center gap-8 mt-10 justify-center lg:justify-start"
            >
              <div>
                <p className="text-2xl font-bold text-gray-900">100K+</p>
                <p className="text-xs text-gray-500">Recipes</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-2xl font-bold text-gray-900">4.9 ★</p>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-2xl font-bold text-gray-900">15K+</p>
                <p className="text-xs text-gray-500">Cooks</p>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Interactive Product Mockup with 3D Tilt ── */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1 w-full max-w-xl relative"
          >
            {/* Floating ingredients */}
            {floatingIngredients.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + item.delay, duration: 0.4, type: 'spring' }}
                className="absolute text-2xl z-10 float-slow hidden lg:block pointer-events-none"
                style={{
                  top: item.top, bottom: item.bottom, left: item.left, right: item.right,
                  animationDelay: `${item.delay}s`,
                }}
              >
                <div className="glass-panel rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                  {item.emoji}
                </div>
              </motion.div>
            ))}

            {/* Mockup Card */}
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="w-full">
              <div className="premium-card overflow-hidden shadow-xl">
                {/* Mockup header bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/70">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                    <span className="ml-2 text-xs font-semibold text-gray-500">Kitchen Hearth AI Studio</span>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Interactive</span>
                </div>

                {/* Input area & Preset Chips */}
                <div className="px-5 pt-5 pb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Try an ingredient idea</span>
                    </div>
                    {isProcessing && (
                      <span className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold animate-pulse">
                        <RefreshCw className="w-3 h-3 animate-spin" /> Generating...
                      </span>
                    )}
                  </div>

                  {/* Editable Input Box */}
                  <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-200/80 min-h-[48px] flex items-center gap-2 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-200 transition-all">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isProcessing) {
                          setShowRecipe(false);
                          setIsProcessing(true);
                          setTimeout(() => {
                            setIsProcessing(false);
                            setShowRecipe(true);
                          }, 1200);
                        }
                      }}
                      className="w-full bg-transparent text-sm text-gray-800 focus:outline-none font-medium placeholder-gray-400"
                      placeholder="Type ingredients e.g., chicken, garlic, rice..."
                    />
                    {!showRecipe && !isProcessing && <span className="typing-cursor text-sm shrink-0" />}
                  </div>

                  {/* Preset Quick Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {PRESET_RECIPES.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          activeRecipe.id === preset.id
                            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30 font-semibold'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200/80'
                        }`}
                      >
                        {preset.chipLabel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Processing state */}
                {isProcessing && (
                  <div className="px-5 pb-4">
                    <div className="shimmer rounded-xl py-8 flex flex-col items-center gap-3 bg-amber-50/50 border border-amber-100/50">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-amber-400 pulse-dot" />
                        <div className="w-2 h-2 rounded-full bg-amber-400 pulse-dot" style={{ animationDelay: '0.3s' }} />
                        <div className="w-2 h-2 rounded-full bg-amber-400 pulse-dot" style={{ animationDelay: '0.6s' }} />
                      </div>
                      <p className="text-xs font-medium text-amber-700">AI is crafting your recipe for "{activeRecipe.title}"...</p>
                    </div>
                  </div>
                )}

                {/* Generated recipe card */}
                {showRecipe && !isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="px-5 pb-5"
                  >
                    <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                      {/* Recipe image */}
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={activeRecipe.image}
                          alt={activeRecipe.title}
                          className="w-full h-full object-cover transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute top-3 right-3 glass-panel rounded-full px-2.5 py-1 flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-xs font-bold text-gray-700">{activeRecipe.rating}</span>
                        </div>
                        <div className="absolute bottom-3 left-4">
                          <h3 className="text-lg font-bold text-white drop-shadow-lg">{activeRecipe.title}</h3>
                        </div>
                      </div>

                      {/* Recipe details */}
                      <div className="p-4">
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> {activeRecipe.time}</span>
                          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-amber-500" /> {activeRecipe.servings} servings</span>
                          <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-red-400" /> {activeRecipe.heat}</span>
                        </div>

                        {/* Ingredients */}
                        <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2">Key Ingredients</h4>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {activeRecipe.ingredients.map((ing) => (
                            <span key={ing} className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-100">
                              {ing}
                            </span>
                          ))}
                        </div>

                        {/* Steps preview */}
                        <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2">Instructions Preview</h4>
                        <div className="space-y-1.5">
                          {activeRecipe.steps.map((step, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                              <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                              <span className="leading-tight">{step}</span>
                            </div>
                          ))}
                        </div>

                        {/* Nutrition bar */}
                        <div className="flex items-center justify-around mt-3 pt-3 border-t border-gray-100 text-center">
                          <div>
                            <p className="text-xs font-bold text-gray-900">{activeRecipe.calories}</p>
                            <p className="text-[10px] text-gray-400">Calories</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">{activeRecipe.protein}</p>
                            <p className="text-[10px] text-gray-400">Protein</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">{activeRecipe.fat}</p>
                            <p className="text-[10px] text-gray-400">Fat</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">{activeRecipe.carbs}</p>
                            <p className="text-[10px] text-gray-400">Carbs</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
