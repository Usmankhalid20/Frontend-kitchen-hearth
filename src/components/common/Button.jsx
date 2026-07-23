import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button' }) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-500 px-6 py-3",
    secondary: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 focus:ring-gray-200 px-6 py-3",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-200 px-4 py-2"
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;
