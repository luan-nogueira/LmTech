'use client';

import { useEffect, useState } from 'react';
import { Bell, Check } from 'lucide-react';
import { db } from '@/lib/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export function SystemAnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<{ id: string; title: string; body: string } | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const snap = await getDoc(doc(db, 'system_announcements', 'current'));
        if (snap.exists()) {
          const data = snap.data() as { id: string; title: string; body: string };
          const isDismissed = localStorage.getItem(`dismissed_announcement_${data.id}`) === 'true';
          if (!isDismissed && data.title && data.body) {
            setAnnouncement(data);
          }
        }
      } catch {
        // Ignora silenciosamente se o documento ainda nao existe ou se a regra nao for criada
      }
    };

    fetchAnnouncement();
  }, []);

  if (!announcement) return null;

  const handleDismiss = () => {
    localStorage.setItem(`dismissed_announcement_${announcement.id}`, 'true');
    setAnnouncement(null);
  };

  return (
    <div className="w-full max-w-3xl mb-4 p-4 bg-gradient-to-r from-purple-500/15 via-indigo-500/10 to-purple-500/5 border border-purple-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in fade-in">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-purple-600 text-white rounded-xl shadow-xs shrink-0">
          <Bell size={20} />
        </div>
        <div>
          <h4 className="font-bold text-sm text-[var(--color-text)]">{announcement.title}</h4>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5 whitespace-pre-line">
            {announcement.body}
          </p>
        </div>
      </div>
      <button 
        onClick={handleDismiss}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0 w-full sm:w-auto flex items-center justify-center gap-1.5 shadow-sm"
      >
        <Check size={14} />
        OK, Entendido
      </button>
    </div>
  );
}
