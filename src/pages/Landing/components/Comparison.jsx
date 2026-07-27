import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { COMPARISON_ROWS } from '../data/landingData';

const Comparison = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-600 mb-3">Why switch</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why choose Kitchen Hearth</h2>
          <p className="text-gray-500 text-lg">Stop wasting time searching. Start cooking smarter.</p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="premium-card overflow-hidden"
        >
          {/* Header row */}
          <div className="grid grid-cols-2 border-b border-gray-100">
            <div className="px-4 sm:px-6 py-4">
              <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">Traditional Search</p>
            </div>
            <div className="px-4 sm:px-6 py-4" style={{ backgroundColor: 'rgba(245,158,11,0.06)' }}>
              <p className="text-xs sm:text-sm font-semibold text-amber-600 uppercase tracking-wider">Kitchen Hearth ✨</p>
            </div>
          </div>

          {/* Data rows */}
          {COMPARISON_ROWS.map((row, i) => (
            <div key={i} className={`grid grid-cols-2 ${i < COMPARISON_ROWS.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <div className="px-4 sm:px-6 py-4 flex items-center gap-2.5 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" />
                </div>
                <span className="text-xs sm:text-sm text-gray-500 leading-snug">{row.traditional}</span>
              </div>
              <div className="px-4 sm:px-6 py-4 flex items-center gap-2.5 sm:gap-3" style={{ backgroundColor: 'rgba(245,158,11,0.04)' }}>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-800 leading-snug">{row.hearth}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Comparison;
