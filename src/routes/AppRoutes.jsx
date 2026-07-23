import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from '../components/common/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';

// Dynamically import main app pages for code-splitting
const Landing = React.lazy(() => import('../pages/Landing/Landing'));
const Auth = React.lazy(() => import('../pages/Auth/Auth'));
const AdminRoutes = React.lazy(() => import('./AdminRoutes'));
const UserRoutes = React.lazy(() => import('./UserRoutes'));

// Fallback loader for main routes
const RouteLoader = () => (
  <div className="flex h-[calc(100vh-4rem)] items-center justify-center text-gray-500">
    <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Application Layout (Navbar + Footer) */}
      <Route element={<MainLayout />}>
        {/* Redirect root to landing page per user request */}
        <Route path="/" element={<Navigate to="/landing-page" replace />} />
        <Route path="/landing-page" element={
          <Suspense fallback={<RouteLoader />}>
            <Landing />
          </Suspense>
        } />
        <Route path="/login" element={
          <Suspense fallback={<RouteLoader />}>
            <Auth />
          </Suspense>
        } />
        <Route path="/register" element={
          <Suspense fallback={<RouteLoader />}>
            <Auth />
          </Suspense>
        } />
      </Route>

      {/* Admin Dashboard Layout (Sidebar + Top Navbar) */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute>
            <Suspense fallback={<RouteLoader />}>
              <AdminRoutes />
            </Suspense>
          </ProtectedRoute>
        } 
      />

      {/* User Workspace Layout (Sidebar + Top Navbar) */}
      <Route 
        path="/user/*" 
        element={
          <ProtectedRoute>
            <Suspense fallback={<RouteLoader />}>
              <UserRoutes />
            </Suspense>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
