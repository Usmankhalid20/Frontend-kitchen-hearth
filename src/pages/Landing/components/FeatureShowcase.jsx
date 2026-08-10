import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { Sparkles, BookOpen, CalendarDays, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FEATURE_SHOWCASE_ITEMS } from '../data/landingData';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

/* ─── Feature metadata ─── */
const FEATURE_BULLETS = [
  ['Complete recipe in seconds', 'Ingredient-aware AI suggestions', 'Nutrition info included'],
  ['Personal digital cookbook', 'Organized by cuisine & type', 'Access from any device'],
  ['One-click weekly meal plans', 'Auto-generated shopping lists', 'Balanced dietary planning'],
];

const FEATURE_ICONS = [
  <Sparkles key="spark" className="w-5 h-5 text-amber-500" />,
  <BookOpen key="book" className="w-5 h-5 text-blue-500" />,
  <CalendarDays key="cal" className="w-5 h-5 text-purple-500" />,
];

const FEATURE_COLORS = ['text-amber-600', 'text-blue-600', 'text-purple-600'];
const FEATURE_BG = ['bg-amber-50 border-amber-200', 'bg-blue-50 border-blue-200', 'bg-purple-50 border-purple-200'];

/* ─────────────────────────────────────────────────────────
   Pinned Split-Screen Feature Showcase
   - 300vh scroll track lets browser accumulate scroll progress
   - Sticky 100vh viewport stays pinned at top: 0
   - useMotionValueEvent drives activeIndex (0|1|2) state
   - AnimatePresence swaps text panels cleanly
   - Images cross-fade with Framer Motion animate prop (not useTransform)
   - All transitions on opacity + transform only (GPU compositor)
───────────────────────────────────────────────────────── */
const FeatureShowcase = () => {
  const { isAuthenticated } = useAuthStore();
  const targetLink = isAuthenticated ? '/user/ai-assistant' : '/login';

  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* Drive activeIndex from scroll — no hook-in-loop issues */
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.33) setActiveIndex(0);
    else if (latest < 0.66) setActiveIndex(1);
    else setActiveIndex(2);
  });

  return (
    <>
      {/* ── Section header (outside sticky track) ── */}
      <div className="pt-24 pb-0" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-600 mb-3">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to cook better
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Kitchen Hearth brings the power of AI to your kitchen — from recipe creation to meal planning.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── 300vh scroll track ── */}
      <div
        ref={containerRef}
        style={{ height: '300vh', backgroundColor: 'var(--color-bg-alt)' }}
      >
        {/* ── Pinned sticky viewport ── */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

              {/* ── LEFT: Text panel (AnimatePresence swaps between features) ── */}
              <div className="flex-1 max-w-lg" style={{ minHeight: '420px', position: 'relative' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    {/* Tag pill */}
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border mb-5 w-fit ${FEATURE_BG[activeIndex]}`}
                    >
                      {FEATURE_ICONS[activeIndex]}
                      <span className={FEATURE_COLORS[activeIndex]}>
                        {FEATURE_SHOWCASE_ITEMS[activeIndex].tag}
                      </span>
                    </div>

                    {/* Step indicator */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-5xl font-black text-gray-100 select-none leading-none">
                        0{activeIndex + 1}
                      </span>
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((dot) => (
                          <div
                            key={dot}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              dot === activeIndex ? 'w-6 bg-amber-500' : 'w-1.5 bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                      {FEATURE_SHOWCASE_ITEMS[activeIndex].title}
                    </h3>
                    <p
                      className="leading-relaxed mb-6 text-lg"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {FEATURE_SHOWCASE_ITEMS[activeIndex].description}
                    </p>

                    {/* Bullet points */}
                    <ul className="space-y-2.5 mb-8">
                      {FEATURE_BULLETS[activeIndex].map((bullet, bi) => (
                        <li
                          key={bi}
                          className="flex items-center gap-2.5 text-sm font-medium text-gray-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={targetLink}
                      className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors group w-fit ${FEATURE_COLORS[activeIndex]} hover:opacity-80`}
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── RIGHT: Image panel (crossfades on activeIndex change) ── */}
              <div className="flex-1 w-full max-w-lg">
                <div
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  style={{ aspectRatio: '4/3' }}
                >
                  {/* Stacked image layers */}
                  {FEATURE_SHOWCASE_ITEMS.map((feature, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: i === activeIndex ? 1 : 0,
                        scale: i === activeIndex ? 1 : 1.04,
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        willChange: 'opacity, transform',
                      }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </motion.div>
                  ))}

                  {/* Caption badge — always on top */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="glassmorphic-badge w-fit text-xs"
                      >
                        {FEATURE_ICONS[activeIndex]}
                        <span className={FEATURE_COLORS[activeIndex]}>
                          {FEATURE_SHOWCASE_ITEMS[activeIndex].tag}
                        </span>
                        <span className="text-gray-600 ml-1">
                          — {FEATURE_SHOWCASE_ITEMS[activeIndex].title}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Subtle inner border gloss */}
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none z-20"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)' }}
                  />
                </div>

                {/* Progress indicator dots below image */}
                <div className="flex justify-center gap-3 mt-5">
                  {[0, 1, 2].map((dot) => (
                    <button
                      key={dot}
                      onClick={() => {
                        /* Allow manual click for accessibility */
                      }}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        dot === activeIndex
                          ? 'w-8 bg-amber-500'
                          : 'w-1.5 bg-gray-200 hover:bg-gray-300'
                      }`}
                      aria-label={`Feature ${dot + 1}: ${FEATURE_SHOWCASE_ITEMS[dot].title}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureShowcase;
