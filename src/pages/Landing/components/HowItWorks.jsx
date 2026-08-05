import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, ChefHat } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: <MessageSquare className="w-6 h-6 text-amber-500" />,
    title: 'Describe your ingredients',
    description: 'Tell us what you have in your fridge, a craving, or a cuisine you love. Our AI understands it all.',
    mockupBg: 'from-amber-50 to-orange-50',
  },
  {
    num: '02',
    icon: <Sparkles className="w-6 h-6 text-amber-500" />,
    title: 'AI creates the recipe',
    description: 'In seconds, our AI generates a complete recipe with ingredients, quantities, steps, and nutrition.',
    mockupBg: 'from-orange-50 to-rose-50',
  },
  {
    num: '03',
    icon: <ChefHat className="w-6 h-6 text-amber-500" />,
    title: 'Cook with confidence',
    description: 'Follow clear, step-by-step instructions. Adjust servings, save favorites, and plan your week.',
    mockupBg: 'from-rose-50 to-amber-50',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-600 mb-3">How it works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">See Kitchen Hearth in action</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Three simple steps to your next restaurant-quality meal at home.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) - centered through icon boxes at top-8 (32px) */}
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 z-0">
            <div className="w-full h-full bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 rounded-full" />
            {/* Glowing dots on the line */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col items-center text-center group z-10"
            >
              {/* Step number circle */}
              <div className="relative mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-md border border-gray-100 group-hover:shadow-lg group-hover:border-amber-200 transition-all">
                  {step.icon}
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                  {step.num}
                </span>
              </div>

              {/* Text */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed max-w-xs">{step.description}</p>

              {/* Mini mockup */}
              <div className={`mt-6 w-full rounded-2xl bg-gradient-to-br ${step.mockupBg} p-6 border border-gray-100/50`}>
                <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">
                  <div className="h-2.5 rounded-full bg-gray-100 w-3/4" />
                  <div className="h-2.5 rounded-full bg-gray-100 w-1/2" />
                  <div className="h-2.5 rounded-full bg-amber-100 w-2/3" />
                  <div className="h-8 rounded-lg bg-amber-50 mt-3 flex items-center justify-center">
                    <span className="text-xs text-amber-600 font-medium">{step.title}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
