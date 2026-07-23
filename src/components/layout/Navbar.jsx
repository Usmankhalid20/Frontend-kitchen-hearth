import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, ChevronDown } from 'lucide-react';
import Button from '../common/Button';
import { useAuthStore } from '../../stores/authStore';
import Avatar from '../common/Avatar';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();
const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (<>
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-amber-100 p-2 rounded-xl group-hover:bg-amber-200 transition-colors">
                <ChefHat className="h-6 w-6 text-amber-600" />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">Kitchen Hearth</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Discover</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/ai-assistant" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">AI Assistant</Link>
                <Link to="#" className="text-gray-400 cursor-not-allowed transition-colors font-medium" title="Coming soon">My Recipes</Link>
                <Link to="#" className="text-gray-400 cursor-not-allowed transition-colors font-medium" title="Coming soon">Meal Plan</Link>
              </>
            ) : (
              <Link to="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">How It Works</Link>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="relative inline-block">
                  <button className="flex items-center gap-2 focus:outline-none" type="button" onClick={() => setShowProfile(!showProfile)}>
                    <div className="w-10 h-10 rounded-full border-2 border-amber-200 overflow-hidden shadow-sm shrink-0">
                      <Avatar
                        alt="User Avatar"
                        src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=fef3c7&color=d97706&bold=true`}
                      />
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-gray-900 leading-none">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-500 mt-1">@{user?.username}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
                  </button>

                  {showProfile && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
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
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden md:block text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Log In
                </Link>
                <Link to="/register">
                  <Button variant="primary" className="shadow-md shadow-amber-500/20">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>

  </>);
};

export default Navbar;
