import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';

const Dashboard = React.lazy(() => import('../pages/user/Dashboard'));
const AIAssistant = React.lazy(() => import('../pages/user/AIAssistant'));
const Recipes = React.lazy(() => import('../pages/user/Recipes'));
const RecipeDetails = React.lazy(() => import('../pages/user/Recipes/RecipeDetails'));
const MealPlanner = React.lazy(() => import('../pages/user/MealPlanner'));
const Settings = React.lazy(() => import('../pages/user/Settings'));

const RouteLoader = () => (
  <div className="flex h-[50vh] items-center justify-center text-gray-500">
    <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
  </div>
);

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        {/* Redirect /user to /user/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        
        <Route path="dashboard" element={
          <Suspense fallback={<RouteLoader />}>
            <Dashboard />
          </Suspense>
        } />
        
        <Route path="ai-assistant" element={
          <Suspense fallback={<RouteLoader />}>
            <AIAssistant />
          </Suspense>
        } />
        
        <Route path="recipes" element={
          <Suspense fallback={<RouteLoader />}>
            <Recipes />
          </Suspense>
        } />
        
        <Route path="recipes/:id" element={
          <Suspense fallback={<RouteLoader />}>
            <RecipeDetails />
          </Suspense>
        } />
        
        <Route path="meal-planner" element={
          <Suspense fallback={<RouteLoader />}>
            <MealPlanner />
          </Suspense>
        } />

        <Route path="settings" element={
          <Suspense fallback={<RouteLoader />}>
            <Settings />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
