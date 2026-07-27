import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import Button from '../../../components/common/Button';
import { ArrowRight } from 'lucide-react';

const floatingItems = [
  { emoji: '🍳', top: '15%', left: '8%', delay: 0 },
  { emoji: '🥑', top: '25%', right: '10%', delay: 0.5 },
  { emoji: '🌶️', bottom: '20%', left: '12%', delay: 1 },
  { emoji: '🧄', bottom: '30%', right: '8%', delay: 0.7 },
  { emoji: '🍋', top: '50%', left: '3%', delay: 1.2 },
  { emoji: '🌿', top: '40%', right: '4%', delay: 0.3 },
];

const FinalCTA = () => {
  const { isAuthenticated } = useAuthStore();
  const ctaLink = isAuthenticated ? '/user/ai-assistant' : '/login';

  return (
    <section className="relative section-padding overflow-hidden" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      {/* Floating ingredients */}
      {floatingItems.map((item, i) => (
        <div
          key={i}
          className="absolute text-3xl opacity-20 float-slow hidden md:block"
          style={{
            top: item.top, bottom: item.bottom, left: item.left, right: item.right,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Blurred orbs */}
      <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-amber-200/20 blur-[80px]" />
      <div className="absolute bottom-10 right-1/4 w-48 h-48 rounded-full bg-orange-200/20 blur-[60px]" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-tight"
        >
          Your next meal starts with an idea.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 mb-10 max-w-xl mx-auto"
        >
          Tell Kitchen Hearth what you're craving and get a complete recipe in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link to={ctaLink}>
            <Button
              variant="primary"
              className="text-base shadow-xl shadow-amber-500/20 px-10 py-4 group amber-glow"
            >
              Create Your First Recipe
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
