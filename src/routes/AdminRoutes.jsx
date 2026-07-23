import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import PermissionGuard from '../components/admin/PermissionGuard';
import LoadingState from '../components/admin/LoadingState';

// Dynamically import admin pages for code-splitting
const Dashboard = React.lazy(() => import('../pages/admin/Dashboard'));
const Users = React.lazy(() => import('../pages/admin/Users'));
const AdminManagement = React.lazy(() => import('../pages/admin/AdminManagement'));
const RolesPermissions = React.lazy(() => import('../pages/admin/RolesPermissions'));
const Recipes = React.lazy(() => import('../pages/admin/Recipes'));
const AIUsage = React.lazy(() => import('../pages/admin/AIUsage'));
const AuditLogs = React.lazy(() => import('../pages/admin/AuditLogs'));
const Settings = React.lazy(() => import('../pages/admin/Settings'));
const UserProfile = React.lazy(() => import('../pages/admin/UserProfile'));

const adminRouteConfig = [
  { path: 'dashboard', component: Dashboard, permission: 'dashboard.read' },
  { path: 'users', component: Users, permission: 'users.read' },
  { path: 'admins', component: AdminManagement, permission: 'admins.create' },
  { path: 'roles', component: RolesPermissions, permission: 'permissions.manage' },
  { path: 'recipes', component: Recipes, permission: 'recipes.read.any' },
  { path: 'analytics', component: AIUsage, permission: 'analytics.read' },
  { path: 'audit-logs', component: AuditLogs, permission: 'audit.read' },
  { path: 'settings', component: Settings, permission: 'settings.manage' },
  { path: 'profile', component: UserProfile, permission: 'settings.manage' },
];

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* Redirect /admin to /admin/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        
        {/* Dynamically map over all configured admin routes */}
        {adminRouteConfig.map(({ path, component: Component, permission }) => (
          <Route 
            key={path}
            path={path} 
            element={
              <PermissionGuard requiredPermission={permission}>
                <Suspense fallback={<LoadingState message="Loading page..." />}>
                  <Component />
                </Suspense>
              </PermissionGuard>
            } 
          />
        ))}

        {/* Catch all for unknown admin routes */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
