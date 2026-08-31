'use client';

import { useState } from 'react';
import { MessageSquare, Phone, Calendar, Trash2, CheckCircle2, Send, Clock, DollarSign } from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';
import { LeadEstimate } from '@/types/client';

export function LeadsTable() {
  const { leads, updateLeadStatus, deleteLead } = useClientStore();

  const handleOpenWhatsApp = (lead: LeadEstimate) => {
    const clean = lead.phone.replace(/\D/g, '');
    const msg = `Olá ${lead.name}! Aqui é o Luan da LM Tech. Vi que você simulou um projeto de *${lead.serviceType}* em nosso site. Como posso te ajudar a tirar essa ideia do papel?`;
    window.open(`https://wa.me/55${clean}?text=${encodeURIComponent(msg)}`, '_blank');
    updateLeadStatus(lead.id, 'contacted');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white">Leads & Orçamentos Recebidos</h2>
        <p className="text-xs text-slate-400">
          Pessoas e empresas que simularam projetos ou enviaram mensagens no formulário do site.
        </p>
      </div>

      {/* Leads Table */}
      <div className="rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#070b13] border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              <tr>
                <th className="px-6 py-4">Contato / Empresa</th>
                <th className="px-6 py-4">Solução & Recursos</th>
                <th className="px-6 py-4">Estimativa</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* 1. Contato */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="font-bold text-sm text-white">{lead.name}</div>
                        {lead.company && <div className="text-xs text-slate-400">{lead.company}</div>}
                        <div className="text-[11px] text-cyan-400 font-medium">{lead.phone}</div>
                        <div className="text-[10px] text-slate-500">
                          {new Date(lead.createdAt).toLocaleDateString('pt-BR')} às{' '}
                          {new Date(lead.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </td>

                    {/* 2. Solução & Recursos */}
                    <td className="px-6 py-4">
                      <div className="space-y-1.5 max-w-xs">
                        <div className="font-semibold text-slate-200">{lead.serviceType}</div>
                        <div className="flex flex-wrap gap-1">
                          {lead.features.map((f, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                              {f}
                            </span>
                          ))}
                        </div>
                        {lead.message && (
                          <p className="text-[11px] text-slate-400 italic bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                            &ldquo;{lead.message}&rdquo;
                          </p>
                        )}
                      </div>
                    </td>

                    {/* 3. Estimativa */}
                    <td className="px-6 py-4">
                      {lead.estimatedPriceMin > 0 ? (
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-emerald-400">
                            R$ {lead.estimatedPriceMin.toLocaleString('pt-BR')} - {lead.estimatedPriceMax.toLocaleString('pt-BR')}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-cyan-400" />
                            <span>{lead.estimatedTime}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-500">Formulário de Contato</span>
                      )}
                    </td>

                    {/* 4. Status */}
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none"
                      >
                        <option value="new">🟡 Novo Lead</option>
                        <option value="contacted">🔵 Em Contato</option>
                        <option value="converted">🟢 Fechado / Cliente</option>
                        <option value="archived">⚪ Arquivado</option>
                      </select>
                    </td>

                    {/* 5. Ações */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenWhatsApp(lead)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-300 bg-emerald-950 hover:bg-emerald-900 border border-emerald-600/40 transition-colors"
                          title="Iniciar conversa no WhatsApp"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>

                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900 text-slate-400 hover:text-red-300 transition-colors"
                          title="Excluir Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Nenhum lead recebido ainda. As simulações feitas no site aparecerão aqui.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
