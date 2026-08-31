// Service Worker com suporte a atualizações automáticas
const SW_VERSION = 'v2'; // Incremente a cada deploy para forçar atualização

// ============ NOTIFICAÇÕES PUSH ============
self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || '/icon.png',
      badge: '/icon.png',
      vibrate: [100, 50, 100],
      data: {
        url: data.url || '/'
      }
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const urlToOpen = new URL(event.notification.data.url, self.location.origin).href;
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// ============ ATUALIZAÇÃO AUTOMÁTICA DO PWA ============
// Quando o novo SW ativa, toma controle imediato de todas as abas abertas
self.addEventListener('install', function (event) {
  // Pula a fase de espera para que o novo SW ative imediatamente
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    Promise.all([
      // Toma controle imediato de todas as páginas abertas
      clients.claim(),
      // Limpa caches antigos se existirem
      caches.keys().then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheName.includes(SW_VERSION)) {
              return caches.delete(cacheName);
            }
          })
        )
      )
    ])
  );
});

// ============ MENSAGEM PARA RECARREGAR ============
// Quando ativado, notifica todas as abas abertas para exibir o banner de atualização
self.addEventListener('activate', function (event) {
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      clientList.forEach((client) => {
        client.postMessage({ type: 'SW_UPDATED' });
      });
    })
  );
});
