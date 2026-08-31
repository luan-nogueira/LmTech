'use client';

import Link from 'next/link';
import { ShieldCheck, LogOut, Globe, Sparkles, User, Bell } from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';

export function AdminHeader() {
  const { adminConfig, logout, clients } = useClientStore();

  const currentMonthKey = new Date().toISOString().slice(0, 7);
  const pendingSubscriptions = clients.filter(
    (c) => c.hasMonthlyFee && c.monthlyPayments?.[currentMonthKey]?.status !== 'paid'
  );

  return (
    <header className="bg-[#0b101b] border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand & Admin Tag */}
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-600/30">
              <div className="w-full h-full bg-[#07090e] rounded-[11px] flex items-center justify-center font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                LM
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white">PAINEL DE CONTROLE</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-slate-400">LM Tech Gestão de Clientes & Finanças</p>
            </div>
          </Link>
        </div>

        {/* Right: User & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Pending notification pill */}
          {pendingSubscriptions.length > 0 && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Bell className="w-3.5 h-3.5" />
              <span>{pendingSubscriptions.length} mensalidade(s) a receber</span>
            </div>
          )}

          {/* View Public Site */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all"
            title="Visualizar site principal"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Ver Site Público</span>
          </Link>

          {/* Admin User Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-cyan-300">
              <User className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <div className="font-bold text-white leading-tight">Luan Nogueira</div>
              <div className="text-[10px] text-slate-400">{adminConfig.adminEmail}</div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-white hover:bg-red-600/20 border border-red-500/30 transition-all"
            title="Sair do Painel"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair</span>
          </button>

        </div>

      </div>
    </header>
  );
}
