/**
 * Flrental - Entry Point
 */

import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Providers } from './providers';
import { AppRouter } from './router';
import { initAnalytics } from './analytics';
import '@/styles/tokens.css';
import '@/styles/tailwind.css';

function App() {
  useEffect(() => {
    initAnalytics();
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return <AppRouter />;
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
