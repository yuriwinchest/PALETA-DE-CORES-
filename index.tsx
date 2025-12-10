import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StackProvider } from "@stackframe/react";
import { stack } from "./src/stack";
import { BrowserRouter } from 'react-router-dom';
import './src/index.css';

import { TooltipProvider } from '@radix-ui/react-tooltip';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StackProvider app={stack}>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </StackProvider>
    </BrowserRouter>
  </React.StrictMode>
);