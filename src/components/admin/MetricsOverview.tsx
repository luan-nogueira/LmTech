'use client';

import { useMemo } from 'react';
import { DollarSign, TrendingUp, Users, CheckCircle, Clock, Globe, ArrowUpRight } from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';

export function MetricsOverview() {
  const { clients, setActiveAdminTab } = useClientStore();

  const currentMonthKey = new Date().toISOString().slice(0, 7); // "YYYY-MM"

  const metrics = useMemo(() => {
    let totalProjectRevenue = 0;
    let mrrTotal = 0;
    let monthlyPaidTotal = 0;
    let monthlyPaidCount = 0;
    let monthlyPendingTotal = 0;
    let monthlyPendingCount = 0;
    let portfolioCount = 0;

    clients.forEach((c) => {
      totalProjectRevenue += c.projectValue || 0;

      if (c.showInPortfolio) {
        portfolioCount++;
      }

      if (c.hasMonthlyFee) {
        mrrTotal += c.monthlyFeeValue || 0;

        const currentPayment = c.monthlyPayments?.[currentMonthKey];
        if (currentPayment?.status === 'paid') {
          monthlyPaidTotal += c.monthlyFeeValue || 0;
          monthlyPaidCount++;
        } else {
          monthlyPendingTotal += c.monthlyFeeValue || 0;
          monthlyPendingCount++;
        }
      }
    });

    return {
      totalClients: clients.length,
      totalProjectRevenue,
      mrrTotal,
      monthlyPaidTotal,
      monthlyPaidCount,
      monthlyPendingTotal,
      monthlyPendingCount,
      portfolioCount,
    };
  }, [clients, currentMonthKey]);

  return (
    <div className="space-y-6">
      
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* 1. MRR - Mensalidades Recorrentes */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              MRR • Mensalidades
            </span>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-white">
              R$ {metrics.mrrTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <span>Receita mensal recorrente garantida</span>
            </div>
          </div>

          <button
            onClick={() => setActiveAdminTab('subscriptions')}
            className="mt-4 text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
          >
            <span>Gerenciar Mensalidades</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2. Mensalidades Pagas no Mês */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full" />

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Recebido este Mês
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-white">
              R$ {metrics.monthlyPaidTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              <strong className="text-emerald-400">{metrics.monthlyPaidCount}</strong> cliente(s) já pagaram
            </div>
          </div>

          <button
            onClick={() => setActiveAdminTab('subscriptions')}
            className="mt-4 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
          >
            <span>Ver Comprovantes</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3. Mensalidades Pendentes */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-2xl rounded-full" />

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              A Receber no Mês
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-white">
              R$ {metrics.monthlyPendingTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              <strong className="text-amber-400">{metrics.monthlyPendingCount}</strong> cliente(s) pendentes
            </div>
          </div>

          <button
            onClick={() => setActiveAdminTab('subscriptions')}
            className="mt-4 text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>Cobrar no WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4. Total em Projetos & Portfólio */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-blue-500/30 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full" />

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Total em Contratos
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-white">
              R$ {metrics.totalProjectRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              <strong className="text-white">{metrics.totalClients}</strong> clientes • <strong className="text-cyan-400">{metrics.portfolioCount}</strong> no portfólio
            </div>
          </div>

          <button
            onClick={() => setActiveAdminTab('clients')}
            className="mt-4 text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <span>Ver Todos os Clientes</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
