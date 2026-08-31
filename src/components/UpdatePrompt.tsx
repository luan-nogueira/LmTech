'use client';

import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function UpdatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    // Registrar o listener para mensagem do SW atualizado
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'SW_UPDATED') {
        setShowPrompt(true);
      }
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);

    // Também checar se o SW instalou uma nova versão
    navigator.serviceWorker.ready.then((registration) => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Novo Service Worker disponível com nova versão do app
            setShowPrompt(true);
          }
        });
      });
    });

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-4 py-3 bg-emerald-600 text-white shadow-lg"
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            <RefreshCw size={16} className="shrink-0" />
            <span>Nova versão disponível!</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPrompt(false)}
              className="text-xs text-emerald-200 hover:text-white transition-colors px-2"
            >
              Depois
            </button>
            <button
              onClick={handleRefresh}
              className="bg-white text-emerald-700 font-bold text-xs px-4 py-1.5 rounded-full hover:bg-emerald-50 transition-colors"
            >
              Atualizar Agora
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
