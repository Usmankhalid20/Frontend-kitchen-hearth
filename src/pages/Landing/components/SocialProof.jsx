import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: 100000, suffix: '+', label: 'Recipes Generated', prefix: '' },
  { value: 15000, suffix: '+', label: 'Active Home Cooks', prefix: '' },
  { value: 4.9, suffix: '/5', label: 'Average Rating', prefix: '' },
  { value: 98, suffix: '%', label: 'Recipe Success Rate', prefix: '' },
];

const formatNumber = (num) => {
  if (num >= 1000) return `${Math.round(num / 1000)}K`;
  if (Number.isInteger(num)) return num.toLocaleString();
  return num.toFixed(1);
};

const AnimatedCounter = ({ value, suffix, inView }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(value * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  const display = Number.isInteger(value) ? formatNumber(Math.round(current)) : current.toFixed(1);

  return (
    <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
      {display}{suffix}
    </span>
  );
};

const brandNames = ['TechCrunch', 'Product Hunt', 'Hacker News', 'Forbes', 'The Verge'];

const SocialProof = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding border-t border-gray-100" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
              <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Brand logos */}
        <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap opacity-30">
          {brandNames.map((name) => (
            <span key={name} className="text-sm font-bold tracking-wider uppercase text-gray-400">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
