import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Key, 
  UtensilsCrossed, 
  LineChart, 
  ListOrdered, 
  Settings,
  LogOut,
  ChefHat,
  User
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const hasPermission = (perm) => {
    if (!perm) return true;
    if (!user || !user.role || !user.role.permissions) return false;
    return user.role.permissions.some(p => p.name === perm.toLowerCase());
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, permission: 'dashboard.read' },
    { name: 'Users', path: '/admin/users', icon: Users, permission: 'users.read' },
    { name: 'Admin Management', path: '/admin/admins', icon: ShieldCheck, permission: 'admins.create' },
    { name: 'Roles & Permissions', path: '/admin/roles', icon: Key, permission: 'permissions.manage' },
    { name: 'Recipes', path: '/admin/recipes', icon: UtensilsCrossed, permission: 'recipes.read.any' },
    { name: 'AI Usage', path: '/admin/analytics', icon: LineChart, permission: 'analytics.read' },
    { name: 'Audit Logs', path: '/admin/audit-logs', icon: ListOrdered, permission: 'audit.read' },
    { name: 'Settings', path: '/admin/settings', icon: Settings, permission: 'settings.manage' },
    { name: 'User Profile', path: '/admin/profile', icon: User, permission: null },
  ];

  const visibleNavItems = navItems.filter(item => hasPermission(item.permission));

  return (
    <aside 
      className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out shadow-sm
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
    >
      <div className="flex items-center gap-3 px-6 h-16 border-b border-gray-100 shrink-0">
        <div className="bg-amber-500 p-2 rounded-lg text-white">
          <ChefHat className="w-5 h-5" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">
          Admin
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {visibleNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => { if(window.innerWidth < 768) onClose() }}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-amber-50 text-amber-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100 shrink-0">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0 overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <>{user?.firstName?.[0] || ''}{user?.lastName?.[0] || ''}</>
            )}
          </div>
          <div className="flex flex-col min-w-0 overflow-hidden">
            <span className="text-sm font-semibold text-gray-900 truncate">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-xs text-gray-500 truncate">
              {user?.email}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
