import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Star, Users, TrendingUp } from 'lucide-react';

const stats = [
  {
    value: 100000,
    suffix: '+',
    label: 'Recipes Generated',
    icon: <ChefHat className="w-5 h-5 text-amber-500" />,
    iconBg: 'bg-amber-50',
  },
  {
    value: 15000,
    suffix: '+',
    label: 'Active Home Cooks',
    icon: <Users className="w-5 h-5 text-blue-500" />,
    iconBg: 'bg-blue-50',
  },
  {
    value: 4.9,
    suffix: '/5',
    label: 'Average Rating',
    icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400" />,
    iconBg: 'bg-amber-50',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Recipe Success Rate',
    icon: <TrendingUp className="w-5 h-5 text-green-500" />,
    iconBg: 'bg-green-50',
  },
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
    <section ref={ref} className="section-padding border-t border-gray-100" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid — elevated individual cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mb-14">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="stat-card flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-2xl ${stat.iconBg} flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
              <p className="text-sm mt-1.5 font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* As seen in */}
        <div className="text-center mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">As seen in</p>
        </div>
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
