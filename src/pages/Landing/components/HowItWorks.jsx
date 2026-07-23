import { motion } from 'framer-motion';
import { MessageSquare, ShoppingBasket, Flame } from 'lucide-react';

const steps = [
  {
    icon: <MessageSquare className="w-6 h-6 text-amber-500" />,
    title: "Tell us what you want to cook",
    description: "Describe the dish, craving, or meal you have in mind."
  },
  {
    icon: <ShoppingBasket className="w-6 h-6 text-amber-500" />,
    title: "Get what you need",
    description: "See the ingredients and quantities required for the recipe."
  },
  {
    icon: <Flame className="w-6 h-6 text-amber-500" />,
    title: "Start cooking",
    description: "Follow clear, step-by-step instructions to create your meal."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How it works</h2>
          <p className="text-gray-600 text-lg">Three simple steps to your next great meal.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 group-hover:bg-amber-100 transition-colors shadow-sm">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
