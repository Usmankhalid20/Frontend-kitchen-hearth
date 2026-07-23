const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Kitchen Hearth. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
