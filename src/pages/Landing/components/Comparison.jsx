import { motion } from 'framer-motion';
import { X, Check, Sparkles } from 'lucide-react';
import { COMPARISON_ROWS } from '../data/landingData';

const Comparison = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
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
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>Stop wasting time searching. Start cooking smarter.</p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="premium-card overflow-hidden"
          style={{
            boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          {/* Header row */}
          <div className="grid grid-cols-2">
            {/* Traditional column header */}
            <div className="px-5 sm:px-7 py-5 border-b border-gray-100">
              <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Traditional Search
              </p>
            </div>

            {/* Kitchen Hearth victory column header */}
            <div
              className="px-5 sm:px-7 py-5 border-b victory-column-header flex items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-amber-700 uppercase tracking-wider">
                  Kitchen Hearth
                </p>
              </div>
              <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white hidden sm:inline-block">
                WINNER
              </span>
            </div>
          </div>

          {/* Data rows */}
          {COMPARISON_ROWS.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-2 ${i < COMPARISON_ROWS.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              {/* Traditional column */}
              <div className="px-5 sm:px-7 py-4 sm:py-5 flex items-start gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" />
                </div>
                <span className="text-xs sm:text-sm leading-snug" style={{ color: 'var(--color-text-secondary)' }}>
                  {row.traditional}
                </span>
              </div>

              {/* Kitchen Hearth victory column */}
              <div className="px-5 sm:px-7 py-4 sm:py-5 flex items-start gap-3 victory-column">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-50 border border-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                  {row.hearth}
                </span>
              </div>
            </div>
          ))}

          {/* Bottom CTA row */}
          <div className="grid grid-cols-2 border-t border-gray-100">
            <div className="px-5 sm:px-7 py-4 flex items-center">
              <span className="text-xs sm:text-sm font-medium text-gray-400 italic">Frustration guaranteed</span>
            </div>
            <div className="px-5 sm:px-7 py-4 flex items-center victory-column">
              <span className="text-xs sm:text-sm font-bold text-amber-700">✨ Instant culinary confidence</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Comparison;
