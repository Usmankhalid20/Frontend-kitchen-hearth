import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import Button from '../../../components/common/Button';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';



const HeroSection = ({ onOpenDemo }) => {
  const { isAuthenticated } = useAuthStore();
  const ctaLink = isAuthenticated ? '/user/ai-assistant' : '/login';

  return (
    <section
      className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* ── Ambient background glows ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-100/40 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-100/30 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber-50/50 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ════════════════════════════════
              LEFT — Typography & CTA
          ════════════════════════════════ */}
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
              Type your ingredients, cravings, or a meal idea — and instantly receive a
              complete recipe with ingredients, step-by-step instructions, and nutrition info.
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
              className="flex items-center gap-4 mt-10 justify-center lg:justify-start"
            >
              {[
                { val: '100K+', label: 'Recipes' },
                { val: '4.9 ★', label: 'Rating' },
                { val: '15K+', label: 'Cooks' },
              ].map((s) => (
                <div key={s.label} className="stat-card flex flex-col items-center px-5 py-3">
                  <p className="text-2xl font-bold text-gray-900">{s.val}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ════════════════════════════════
              RIGHT — Cinematic Video Showcase
          ════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full max-w-lg"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full block rounded-3xl shadow-2xl"
              style={{ aspectRatio: '4/5', objectFit: 'cover' }}
              src="/images/Create_a_photorealistic_cinema.mp4"
            />
          </motion.div>
          {/* end right column */}

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
