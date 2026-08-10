import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, ChevronDown, Menu, X } from 'lucide-react';
import Button from '../common/Button';
import { useAuthStore } from '../../stores/authStore';
import Avatar from '../common/Avatar';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (<>
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'navbar-glass-scrolled' : 'navbar-glass'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className={`p-2 rounded-xl transition-colors ${scrolled ? 'bg-amber-100' : 'bg-amber-100/80'} group-hover:bg-amber-200`}>
                <ChefHat className="h-5 w-5 text-amber-600" />
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900">
                Kitchen Hearth
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium cursor-pointer"
            >
              Discover
            </a>

            {isAuthenticated ? (
              <>
                <Link to="/user/ai-assistant" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">AI Assistant</Link>
                <Link to="/user/recipes" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">My Recipes</Link>
                <Link to="/user/meal-planner" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">Meal Plan</Link>
              </>
            ) : (
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium cursor-pointer"
              >
                How It Works
              </a>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative inline-block">
                <button className="flex items-center gap-2 focus:outline-none" type="button" onClick={() => setShowProfile(!showProfile)}>
                  <div className="w-9 h-9 rounded-full border-2 border-amber-200 overflow-hidden shadow-sm shrink-0">
                    <Avatar
                      alt="User Avatar"
                      src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=fef3c7&color=d97706&bold=true`}
                    />
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900 leading-none">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">@{user?.username}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
                </button>

                {showProfile && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-50 mb-1">
                      <p className="text-sm font-bold text-gray-900 truncate">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-500 truncate">@{user?.username}</p>
                      <p className="text-xs text-gray-500 truncate mt-1">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium rounded-b-xl"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="hidden md:block text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Log In
                </Link>
                <Link to="/register">
                  <Button variant="primary" className="shadow-md shadow-amber-500/20 text-sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 py-4 space-y-3">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-700 font-medium py-2">Discover</Link>
          {isAuthenticated ? (
            <>
              <Link to="/ai-assistant" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-700 font-medium py-2">AI Assistant</Link>
              <span className="block text-sm text-gray-400 font-medium py-2">My Recipes</span>
              <span className="block text-sm text-gray-400 font-medium py-2">Meal Plan</span>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-700 font-medium py-2">Log In</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="block text-sm text-amber-600 font-semibold py-2">Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  </>);
};

export default Navbar;
