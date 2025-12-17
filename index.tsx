
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';



const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

import ErrorBoundary from './components/ErrorBoundary';

import { SpeedInsights } from "@vercel/speed-insights/react"

const root = ReactDOM.createRoot(rootElement);
root.render(
  <ErrorBoundary>
    <HashRouter>
      <App />
      <SpeedInsights />
    </HashRouter>
  </ErrorBoundary>
);
