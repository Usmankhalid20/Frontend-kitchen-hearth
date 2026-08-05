import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

const sampleActivities = [
  { name: 'Sarah A.', location: 'New York', dish: 'Garlic Butter Salmon', time: '2m ago', emoji: '🍣' },
  { name: 'Michael R.', location: 'Chicago', dish: 'Spicy Chicken Tikka', time: '5m ago', emoji: '🍗' },
  { name: 'Priya K.', location: 'London', dish: 'Creamy Mushroom Pasta', time: '8m ago', emoji: '🍝' },
  { name: 'David L.', location: 'San Francisco', dish: 'Vegetarian Buddha Bowl', time: '12m ago', emoji: '🥗' },
  { name: 'Elena M.', location: 'Toronto', dish: 'Authentic Beef Biryani', time: '15m ago', emoji: '🍛' },
];

const LiveActivityToast = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % sampleActivities.length);
        setVisible(true);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const current = sampleActivities[index];

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-xs sm:max-w-sm pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="pointer-events-auto glass-panel rounded-2xl p-3.5 shadow-xl border border-white/60 flex items-center gap-3 bg-white/90 backdrop-blur-md"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100/80 flex items-center justify-center text-xl shrink-0">
              {current.emoji}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                <span className="font-medium text-gray-700 truncate">{current.name}</span>
                <span>•</span>
                <span className="shrink-0">{current.time}</span>
              </div>
              <p className="text-xs font-bold text-gray-900 truncate mt-0.5">
                Generated <span className="text-amber-600">{current.dish}</span>
              </p>
            </div>

            <button
              onClick={() => setDismissed(true)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveActivityToast;
