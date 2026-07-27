import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { Sparkles, BookOpen, CalendarDays, ArrowRight } from 'lucide-react';
import { FEATURE_SHOWCASE_ITEMS } from '../data/landingData';

const FeatureShowcase = () => {
  const { isAuthenticated } = useAuthStore();
  const targetLink = isAuthenticated ? '/user/ai-assistant' : '/login';
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-600 mb-3">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything you need to cook better</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Kitchen Hearth brings the power of AI to your kitchen — from recipe creation to meal planning.
          </p>
        </motion.div>

        {/* Feature blocks */}
        <div className="space-y-24 md:space-y-32">
          {FEATURE_SHOWCASE_ITEMS.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${feature.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-20`}
            >
              {/* Text */}
              <div className="flex-1 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 mb-4">
                  {i === 0 && <Sparkles className="w-4 h-4 text-amber-500" />}
                  {i === 1 && <BookOpen className="w-4 h-4 text-blue-500" />}
                  {i === 2 && <CalendarDays className="w-4 h-4 text-purple-500" />}
                  {feature.tag}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-6">{feature.description}</p>
                <Link to={targetLink} className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors group">
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Screenshot */}
              <div className="flex-1 w-full">
                <div className="premium-card overflow-hidden p-2">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full rounded-2xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
