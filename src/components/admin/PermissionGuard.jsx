import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { ShieldAlert } from 'lucide-react';

const PermissionGuard = ({ requiredPermission, children }) => {
  const { user } = useAuthStore();

  if (!user || !user.role) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
        <ShieldAlert className="w-12 h-12 text-red-500 mb-3" />
        <h3 className="text-lg font-bold text-gray-900">Access Denied</h3>
        <p className="text-gray-500 text-sm mt-1 max-w-sm">
          You must be logged in with a valid role to access this page.
        </p>
      </div>
    );
  }

  // If no permission requirement specified, allow access for any authenticated admin user
  if (!requiredPermission) {
    return <>{children}</>;
  }

  const permissions = user.role.permissions || [];
  const hasPermission = permissions.some(
    (p) => p.name === requiredPermission.toLowerCase()
  );

  if (!hasPermission) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center animate-in fade-in duration-300">
        <ShieldAlert className="w-12 h-12 text-amber-500 mb-3" />
        <h3 className="text-lg font-bold text-gray-900">Insufficient Permissions</h3>
        <p className="text-gray-500 text-sm mt-1 max-w-md">
          You do not have permission (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-amber-700 font-mono text-xs">{requiredPermission}</code>) to access this administrative area.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default PermissionGuard;

