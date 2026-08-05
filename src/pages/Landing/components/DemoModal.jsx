import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Sparkles, ChefHat, CheckCircle2, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const demoSteps = [
  { time: '0:02', title: 'Entering Ingredients', text: '"I have chicken breast, Greek yogurt, garlic, lemon, and spices"' },
  { time: '0:05', title: 'AI Processing', text: 'Analyzing flavor profile & calculating optimal cooking technique...' },
  { time: '0:08', title: 'Recipe Generated!', text: 'Spicy Chicken Tikka — 45 mins • 4 Servings • 485 kcal' },
  { time: '0:12', title: 'Step-by-Step Guide', text: 'Clear instructions with built-in timers and ingredient substitution tips' },
];

const DemoModal = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setActiveStep(0);
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 100;
        }
        const next = prev + 1.25;
        if (next > 75) setActiveStep(3);
        else if (next > 50) setActiveStep(2);
        else if (next > 25) setActiveStep(1);
        else setActiveStep(0);
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  const handleRestart = () => {
    setProgress(0);
    setActiveStep(0);
    setIsPlaying(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                  <ChefHat className="w-4.5 h-4.5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Kitchen Hearth Interactive Demo</h3>
                  <p className="text-xs text-gray-400">Watch how AI generates recipes in seconds</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                aria-label="Close demo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video / Interactive Screen Simulation */}
            <div className="relative aspect-video bg-slate-900 overflow-hidden flex flex-col justify-between p-6 sm:p-8">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Demo Top Bar */}
              <div className="relative z-10 flex items-center justify-between text-white/70 text-xs">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Live Simulation
                </span>
                <span>{demoSteps[activeStep].time} / 0:15</span>
              </div>

              {/* Central Demo Content */}
              <div className="relative z-10 my-auto max-w-lg mx-auto w-full text-center space-y-4">
                {activeStep === 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                    <p className="text-xs text-amber-400 uppercase font-semibold tracking-wider">Step 1: Input Ingredients</p>
                    <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-white text-sm sm:text-base font-medium">
                      "I have chicken breast, Greek yogurt, garlic, lemon, and spices"
                    </div>
                  </motion.div>
                )}

                {activeStep === 1 && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-3">
                    <p className="text-xs text-amber-400 uppercase font-semibold tracking-wider">Step 2: AI Processing</p>
                    <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 text-white space-y-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto animate-pulse">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-medium">Matching flavors & constructing step-by-step instructions...</p>
                    </div>
                  </motion.div>
                )}

                {activeStep === 2 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                    <p className="text-xs text-amber-400 uppercase font-semibold tracking-wider">Step 3: Recipe Generated</p>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-left text-white space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-base text-amber-300">Spicy Chicken Tikka</h4>
                        <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-semibold">4.9 ★</span>
                      </div>
                      <p className="text-xs text-gray-300">Rich, smoky, and perfectly spiced restaurant-quality dish.</p>
                      <div className="flex gap-3 text-[11px] text-gray-400 pt-1">
                        <span>⏱️ 45 min</span>
                        <span>🍽️ 4 servings</span>
                        <span>🔥 485 kcal</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeStep === 3 && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Ready to cook your first dish?</h4>
                    <p className="text-xs text-gray-300 max-w-xs mx-auto">Start creating custom recipes in seconds with Kitchen Hearth AI.</p>
                    <Link to="/register" onClick={onClose} className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-amber-500/30">
                      Get Started Free
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Control Bar */}
              <div className="relative z-10 space-y-2">
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 transition-all duration-150" style={{ width: `${progress}%` }} />
                </div>

                <div className="flex items-center justify-between text-white/80">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>
                    <button
                      onClick={handleRestart}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
                      title="Restart Demo"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-medium text-gray-300">{demoSteps[activeStep].title}</span>
                  </div>

                  <span className="text-xs text-gray-400 hidden sm:inline">{demoSteps[activeStep].text}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DemoModal;
