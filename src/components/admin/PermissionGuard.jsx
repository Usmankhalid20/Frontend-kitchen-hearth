import React from 'react';
import { useAuthStore } from '../../stores/authStore';

const PermissionGuard = ({ requiredPermission, children }) => {
  const { user } = useAuthStore();

  if (!user || !user.role || !user.role.permissions) {
    return null;
  }

  const hasPermission = user.role.permissions.some(
    (p) => p.name === requiredPermission.toLowerCase()
  );

  if (!hasPermission) {
    return null;
  }

  return <>{children}</>;
};

export default PermissionGuard;
