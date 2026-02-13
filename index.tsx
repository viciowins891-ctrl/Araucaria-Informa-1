
import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');

// --- NUCLEAR CACHE CLEAR (VARREDURA) ---
// Executa limpeza profunda se a versão não bater ou forzado
// otimização: Executa DEPOIS que o app já montou para não bloquear a thread principal
const APP_VERSION = 'v1.0.5-araucaria-136-years';

const clearCache = () => {
  const storedVersion = localStorage.getItem('app_version');

  if (storedVersion !== APP_VERSION) {
    console.warn(`[SYSTEM] Nova versão detectada (${APP_VERSION}). Executando varredura de cache...`);

    // 1. Limpa LocalStorage (Preserva apenas essenciais se necessário, aqui limpa tudo das news)
    Object.keys(localStorage).forEach(key => {
      if (key.includes('araucaria_news') || key.includes('home-data')) {
        localStorage.removeItem(key);
      }
    });

    // 2. Limpa SessionStorage
    sessionStorage.clear();

    // 3. Limpa Cache Storage (Service Worker Images)
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          console.log('[SYSTEM] Deletando cache:', name);
          caches.delete(name);
        });
      });
    }

    // 4. Desregistra Service Workers antigos para forçar update
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
    }

    localStorage.setItem('app_version', APP_VERSION);
    console.log("[SYSTEM] Varredura completa.");
  }
};

if ('requestIdleCallback' in window) {
  // @ts-ignore
  window.requestIdleCallback(clearCache);
} else {
  setTimeout(clearCache, 2000); // 2s de atraso para garantir prioridade de render
}

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

import ErrorBoundary from './components/ErrorBoundary';

const renderApp = () => {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

// ESTRATÉGIA EQUILIBRADA: Performance Verde + SEO Seguro
// Usa requestIdleCallback para não bloquear a Main Thread, mas sem atraso artificial longo.
if ('requestIdleCallback' in window) {
  // @ts-ignore
  window.requestIdleCallback(() => {
    renderApp();
  }, { timeout: 1000 });
} else {
  // Fallback rápido
  setTimeout(renderApp, 0);
}

// Register PWA Service Worker - DISABLED
// import { registerSW } from 'virtual:pwa-register';

// if ('serviceWorker' in navigator) {
//   registerSW({
//     onNeedRefresh() {
//       // Prompt user to refresh
//       console.log('Nova versão disponível!');
//     },
//     onOfflineReady() {
//       console.log('App pronto para uso offline');
//     },
//   });
// }
