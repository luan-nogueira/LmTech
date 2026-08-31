'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { Bell, BellOff } from 'lucide-react';

export function PushNotificationManager() {
  const { user, userProfile, setUserProfile } = useAuthStore();
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [intervalChoice, setIntervalChoice] = useState(userProfile?.waterReminderInterval || 4);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isSupported && user) {
      checkSubscription();
    }
  }, [isSupported, user]);

  const registerServiceWorker = async () => {
    try {
      await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  };

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
      
      // Se não tiver sub local, mas tivermos que garantir q está no firebase, seria bom sincronizar
    } catch (error) {
      console.error('Error checking subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToPush = async () => {
    setIsLoading(true);
    try {
      // 1. Pedir permissão explicitamente no navegador/celular
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'denied') {
          alert('Notificações bloqueadas nas configurações do sistema/navegador.');
          setIsLoading(false);
          return;
        }
      }

      const registration = await navigator.serviceWorker.ready;

      // Fallback seguro da chave VAPID pública
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'BAkSLmYvytVhBgKcwYpq_KEbm9Xnbsw2b_mZwmE548foAk-F2gGX8Bs1Qu5dKNxBqsnvHSqJW2WAazXIHzQCuAM';

      // Remove assinatura antiga se existir (resolve conflito de chaves trocadas)
      const existingSub = await registration.pushManager.getSubscription();
      if (existingSub) {
        await existingSub.unsubscribe().catch(() => {});
      }

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });
      
      setSubscription(sub);
      
      // Salva no Firebase
      if (user && userProfile) {
        const userRef = doc(db, 'users', user.uid);
        const subData = JSON.parse(JSON.stringify(sub));
        await updateDoc(userRef, {
          pushSubscription: subData,
          waterReminderInterval: intervalChoice
        });
        setUserProfile({ ...userProfile, pushSubscription: subData, waterReminderInterval: intervalChoice });
      }
    } catch (error: any) {
      console.error('Error subscribing to push:', error);
      if (typeof window !== 'undefined' && window.Notification && Notification.permission === 'denied') {
        alert('Notificações bloqueadas. Vá em Configurações do seu celular/navegador → Permissões → Notificações.');
      } else {
        alert(`Erro ao ativar notificações: ${error?.message || 'Verifique as permissões do dispositivo.'}`);
      }
    }
    setIsLoading(false);
  };



  const unsubscribeFromPush = async () => {
    setIsLoading(true);
    try {
      if (subscription) {
        await subscription.unsubscribe();
        setSubscription(null);
        
        // Remove from Firebase
        if (user && userProfile) {
          const userRef = doc(db, 'users', user.uid);
          // using a specific API or simply setting to null if we want to overwrite
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
             await updateDoc(userRef, { pushSubscription: null });
             setUserProfile({ ...userProfile, pushSubscription: undefined });
          }
        }
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
    setIsLoading(false);
  };

  const handleIntervalChange = async (newInterval: number) => {
    setIntervalChoice(newInterval);
    if (user && subscription && userProfile) {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { waterReminderInterval: newInterval });
      setUserProfile({ ...userProfile, waterReminderInterval: newInterval });
    }
  };

  const handleTestNotification = async () => {
    if (!subscription) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/notifications/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription })
      });

      if (res.ok) {
        alert('Notificação de teste enviada com sucesso! Verifique a barra de notificações.');
      } else {
        const err = await res.json().catch(() => ({}));
        alert(`Erro ao enviar teste: ${err.details || err.error || 'Erro desconhecido'}`);
      }
    } catch (error: any) {
      alert(`Falha ao disparar notificação de teste: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupported) {
    return (
      <div className="text-xs text-[var(--color-text-muted)] p-3 bg-red-50 rounded-xl border border-red-100">
        Seu dispositivo ou navegador não suporta notificações Push. No iPhone, adicione à Tela de Início primeiro.
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${subscription ? 'bg-emerald-100 text-emerald-600' : 'bg-[var(--color-background)] text-[var(--color-text-muted)]'}`}>
            {subscription ? <Bell size={20} /> : <BellOff size={20} />}
          </div>
          <div>
            <h4 className="font-semibold text-sm text-[var(--color-text)]">Lembrete de Água</h4>
            <p className="text-xs text-[var(--color-text-muted)]">
              {subscription ? 'Ativado. Você receberá avisos.' : 'Desativado.'}
            </p>
          </div>
        </div>
        
        <button 
          onClick={subscription ? unsubscribeFromPush : subscribeToPush}
          disabled={isLoading}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 ${
            subscription 
              ? 'bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-border)]' 
              : 'bg-emerald-500 text-white hover:bg-emerald-600'
          }`}
        >
          {isLoading ? '...' : (subscription ? 'Desativar' : 'Ativar')}
        </button>
      </div>

      {subscription && (
        <div className="pt-3 border-t border-[var(--color-border)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-text)]">Frequência:</span>
            <select 
              value={intervalChoice} 
              onChange={(e) => handleIntervalChange(Number(e.target.value))}
              className="bg-[var(--color-background)] border border-[var(--color-border)] text-sm rounded-lg px-3 py-1.5 outline-none focus:border-[var(--color-primary)] text-[var(--color-text)]"
            >
              <option value={1}>A cada 1 hora</option>
              <option value={2}>A cada 2 horas</option>
              <option value={3}>A cada 3 horas</option>
              <option value={4}>A cada 4 horas</option>
              <option value={6}>A cada 6 horas</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleTestNotification}
            disabled={isLoading}
            className="w-full py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold rounded-xl hover:bg-emerald-100 transition-colors disabled:opacity-50"
          >
            🧪 Testar Notificação Agora
          </button>
        </div>
      )}
    </div>
  );
}

// Utility function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
