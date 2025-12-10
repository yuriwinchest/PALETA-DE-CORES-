import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StackProvider } from "@stackframe/react";
import { stack } from "./src/stack";

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <StackProvider app={stack}>
      <App />
    </StackProvider>
  </React.StrictMode>
);