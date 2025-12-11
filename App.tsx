import React from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useUser } from "@stackframe/react";
import Dashboard from './src/pages/Dashboard';
import Handler from './src/pages/Handler';
import Landing from './src/pages/Landing';
import Login from './src/pages/Login';
import GeneratePage from './src/components/features/GeneratePage';
import MeaningPage from './src/components/features/MeaningPage';
import Visualizer from './src/components/Visualizer';
import VisualizePage from './src/components/features/VisualizePage';
import { ViewMode } from './src/types';

// Protected Route Wrapper
const ProtectedRoute = () => {
  const user = useUser();

  // Checking for undefined specifically for loading state
  if (user === undefined) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Carregando...</div>;
  }

  // If user is null (not logged in), redirect to sign-in
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Outlet />;
};

// Wrappers for Feature Pages to handle navigation
const GenerateWrapper = () => {
  const navigate = useNavigate(); // Need to import useNavigate
  return <GeneratePage onBack={() => navigate('/')} onStart={() => navigate('/app')} />;
};

const MeaningWrapper = () => {
  const navigate = useNavigate();
  return <MeaningPage onBack={() => navigate('/')} onStart={() => navigate('/app')} />;
};

const VisualizeWrapper = () => {
  const navigate = useNavigate();
  return <VisualizePage onBack={() => navigate('/')} onStart={() => navigate('/visualizer-demo')} />;
};



export default function App() {
  const user = useUser();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/handler/*" element={<Handler />} />

      {/* Public Feature Pages */}
      <Route path="/generate" element={<GenerateWrapper />} />
      <Route path="/meanings" element={<MeaningWrapper />} />
      <Route path="/visualize" element={<VisualizeWrapper />} />
      <Route path="/visualizer-demo" element={<Dashboard initialViewMode={ViewMode.VISUALIZER} isDemo={true} />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<Dashboard />} />
      </Route>

      {/* Catch all - 404 handling or redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
