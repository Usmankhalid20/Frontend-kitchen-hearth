import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ideas = [
  {
    title: "Chicken Tikka",
    description: "Spicy, smoky, and deeply flavorful.",
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Quick Pasta",
    description: "A 15-minute weeknight lifesaver.",
    imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Biryani",
    description: "Aromatic rice and tender meat.",
    imageUrl: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Homemade Pizza",
    description: "Crispy crust with fresh toppings.",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Vegetarian Dinner",
    description: "Healthy, hearty, and meat-free.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  }
];

const ExploreIdeas = () => {
  const navigate = useNavigate();

  const handleIdeaClick = (title) => {
    // Navigate to AI assistant with the idea passed in state
    navigate('/ai-assistant', { state: { initialPrompt: `I want to make ${title}` } });
  };

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Ideas</h2>
            <p className="text-gray-600">Need inspiration? Try one of these classics.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {ideas.map((idea, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => handleIdeaClick(idea.title)}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow group"
            >
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-100">
                <img src={idea.imageUrl} alt={idea.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">{idea.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{idea.description}</p>
              <div className="flex items-center text-sm font-medium text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Try it <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreIdeas;
