import { motion } from 'framer-motion';
import { ChefHat, BookOpen, CalendarDays } from 'lucide-react';

const features = [
  {
    title: "AI Recipe Assistant",
    description: "Turn a cooking idea into ingredients and a complete recipe in seconds.",
    icon: <ChefHat className="w-6 h-6 text-amber-600" />,
    status: "Available Now",
    statusColor: "bg-green-100 text-green-700"
  },
  {
    title: "My Recipes",
    description: "Save recipes and access them later so you never lose a favorite meal.",
    icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    status: "Coming Soon",
    statusColor: "bg-gray-100 text-gray-600"
  },
  {
    title: "Meal Planning",
    description: "Organize recipes and plan future meals for the entire week.",
    icon: <CalendarDays className="w-6 h-6 text-purple-600" />,
    status: "Coming Soon",
    statusColor: "bg-gray-100 text-gray-600"
  }
];

const FeatureOverview = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything you need</h2>
          <p className="text-gray-600 text-lg">Kitchen Hearth is growing to support your entire cooking journey.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  {feature.icon}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${feature.statusColor}`}>
                  {feature.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureOverview;
