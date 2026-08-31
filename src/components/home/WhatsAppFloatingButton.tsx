'use client';

import { MessageCircle } from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';

export function WhatsAppFloatingButton() {
  const { adminConfig } = useClientStore();
  const phoneClean = adminConfig.companyPhone.replace(/\D/g, '');

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      'Olá Luan! Estava navegando no site da LM Tech e gostaria de tirar uma dúvida sobre desenvolvimento de sites e sistemas.'
    );
    window.open(`https://wa.me/55${phoneClean}?text=${text}`, '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      aria-label="Falar no WhatsApp"
      title="Falar com o especialista no WhatsApp"
    >
      <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-semibold whitespace-nowrap border border-slate-700 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Conversar no WhatsApp 💬
      </span>
      <MessageCircle className="w-6 h-6 stroke-[2.5]" />
    </button>
  );
}
