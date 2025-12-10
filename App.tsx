import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useUser } from "@stackframe/react";
import Dashboard from './src/pages/Dashboard';
import Login from './src/pages/Login';
import Handler from './src/pages/Handler';
import Landing from './src/pages/Landing';

// Protected Route Wrapper
const ProtectedRoute = () => {
  const user = useUser();
  // We can add a loading state here if user is undefined initially but useUser handles it well usually
  // If user is null (not logged in), redirect to sign-in
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Outlet />;
};

export default function App() {
  const user = useUser();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/sign-in" element={user ? <Navigate to="/app" replace /> : <Login />} />
      <Route path="/handler/*" element={<Handler />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<Dashboard />} />
      </Route>

      {/* Catch all - 404 handling or redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
