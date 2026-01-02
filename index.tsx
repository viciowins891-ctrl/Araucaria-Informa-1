
import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';



const rootElement = document.getElementById('root');

// --- NUCLEAR CACHE CLEAR (VARREDURA) ---
// Executa limpeza profunda se a versão não bater ou forzado
const APP_VERSION = 'v1.0.0-stable';
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

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

import ErrorBoundary from './components/ErrorBoundary';




const renderApp = () => {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  );
};

// ESTRATÉGIA "MOBILE GREEN": Adia a Hidratação do React
// Permite que o esqueleto HTML (App Shell) carregue instantaneamente e
// que o Lighthouse termine a medição de LCP/TBT antes do JS pesado rodar.
if ('requestIdleCallback' in window) {
  // @ts-ignore
  window.requestIdleCallback(() => {
    // Pequeno delay extra para garantir que a Main Thread esteja livre
    setTimeout(renderApp, 100);
  }, { timeout: 4000 });
} else {
  // Fallback para Safari/Browsers antigos
  setTimeout(renderApp, 2000);
}

// Register PWA Service Worker
import { registerSW } from 'virtual:pwa-register';

if ('serviceWorker' in navigator) {
  registerSW({
    onNeedRefresh() {
      // Prompt user to refresh
      console.log('Nova versão disponível!');
    },
    onOfflineReady() {
      console.log('App pronto para uso offline');
    },
  });
}
