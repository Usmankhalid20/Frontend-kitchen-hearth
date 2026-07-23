import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const TopNavbar = ({ onMenuClick }) => {
  const { user } = useAuthStore();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none md:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-amber-500 rounded-full hover:bg-amber-50 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
        
        <div className="h-8 w-px bg-gray-200 mx-1"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-none">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-gray-500 mt-1">{user?.role?.name}</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-200 overflow-hidden shadow-sm shrink-0 bg-white flex items-center justify-center">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt="Admin Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=fef3c7&color=d97706&bold=true`} 
                alt="Admin Avatar" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
