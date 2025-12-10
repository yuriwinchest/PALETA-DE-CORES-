import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './src/pages/Dashboard';
import Login from './src/pages/Login';
import Handler from './src/pages/Handler';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/handler/*" element={<Handler />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
