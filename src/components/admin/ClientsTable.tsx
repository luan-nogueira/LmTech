'use client';

import { useState, useMemo } from 'react';
import { 
  Plus, Search, Globe, Phone, Mail, Edit3, Trash2, CheckCircle2, 
  ExternalLink, Eye, EyeOff, DollarSign, Calendar, Sparkles, Filter 
} from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';
import { Client } from '@/types/client';
import { ClientModal } from './ClientModal';

export function ClientsTable() {
  const { clients, togglePortfolioVisibility, deleteClient } = useClientStore();

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchQuery =
        search === '' ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.companyName.toLowerCase().includes(search.toLowerCase()) ||
        c.projectTitle.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchCategory = filterCategory === 'Todas' || c.portfolioCategory === filterCategory;
      const matchStatus = filterStatus === 'Todos' || c.status === filterStatus;

      return matchQuery && matchCategory && matchStatus;
    });
  }, [clients, search, filterCategory, filterStatus]);

  const handleOpenAdd = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client: Client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir o cliente "${name}"?`)) {
      deleteClient(id);
    }
  };

  const openClientWhatsApp = (phone: string, name: string) => {
    const clean = phone.replace(/\D/g, '');
    const text = encodeURIComponent(`Olá ${name}, tudo bem? Aqui é o Luan da LM Tech!`);
    window.open(`https://wa.me/55${clean}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Meus Clientes & Projetos</h2>
          <p className="text-xs text-slate-400">
            Gerencie contratos, valores cobrados, links no ar e ative quais aparecem no portfólio público.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-600/30 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Novo Cliente</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por cliente, empresa, tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl glass-input placeholder-slate-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          {/* Category filter */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="Todas">Todas as Categorias</option>
              <option value="Sistemas Web">Sistemas Web</option>
              <option value="Landing Pages">Landing Pages</option>
              <option value="Dashboards & SaaS">Dashboards & SaaS</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Aplicativos">Aplicativos</option>
            </select>
          </div>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="Todos">Todos os Status</option>
            <option value="delivered">Concluído / No Ar</option>
            <option value="in_progress">Em Desenvolvimento</option>
            <option value="review">Em Homologação</option>
            <option value="lead">Em Negociação</option>
          </select>

        </div>

      </div>

      {/* Table */}
      <div className="rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#070b13] border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              <tr>
                <th className="px-6 py-4">Cliente & Empresa</th>
                <th className="px-6 py-4">Projeto & Link no Ar</th>
                <th className="px-6 py-4 text-center">No Portfólio?</th>
                <th className="px-6 py-4">Financeiro</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => {
                  const isLive = Boolean(client.projectUrl && client.projectUrl.trim() !== '');

                  return (
                    <tr
                      key={client.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* 1. Cliente */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="font-bold text-sm text-white flex items-center gap-2">
                            <span>{client.companyName}</span>
                          </div>
                          <div className="text-xs text-slate-400 font-medium">{client.name}</div>
                          <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500">
                            <button
                              onClick={() => openClientWhatsApp(client.phone, client.name)}
                              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                              title="Chamar no WhatsApp"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{client.phone}</span>
                            </button>
                            {client.email && (
                              <span className="hidden sm:inline" title={client.email}>
                                • {client.email}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 2. Projeto & Link */}
                      <td className="px-6 py-4">
                        <div className="space-y-1.5">
                          <div className="font-semibold text-slate-200">{client.projectTitle}</div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-950/80 text-cyan-300 border border-blue-500/30">
                              {client.portfolioCategory}
                            </span>

                            {isLive ? (
                              <a
                                href={client.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-cyan-300 underline"
                                title="Abrir link do cliente no ar"
                              >
                                <span>Ver Site no Ar</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-[11px] text-slate-500 italic">Sem link cadastrado</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 3. Switch de Exibição no Portfólio */}
                      <td className="px-6 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => togglePortfolioVisibility(client.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                            client.showInPortfolio
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                              : 'bg-slate-800 text-slate-500 border border-slate-700 hover:text-slate-300'
                          }`}
                          title="Clique para alternar se aparece na página inicial pública"
                        >
                          {client.showInPortfolio ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Exibindo</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Oculto</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* 4. Financeiro */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-white font-bold text-xs">
                            Total: R$ {client.projectValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                          {client.hasMonthlyFee ? (
                            <div className="text-[11px] text-cyan-300 font-medium">
                              Mensalidade: R$ {client.monthlyFeeValue.toFixed(2)}/mês (Dia {client.monthlyFeeDueDay})
                            </div>
                          ) : (
                            <div className="text-[10px] text-slate-500">Sem mensalidade</div>
                          )}
                        </div>
                      </td>

                      {/* 5. Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                            client.status === 'delivered'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : client.status === 'in_progress'
                              ? 'bg-blue-950 text-blue-400 border border-blue-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {client.status === 'delivered' && '🟢 Concluído'}
                          {client.status === 'in_progress' && '🚀 Em Andamento'}
                          {client.status === 'review' && '🔍 Homologação'}
                          {client.status === 'lead' && '⏳ Negociação'}
                        </span>
                      </td>

                      {/* 6. Ações */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openClientWhatsApp(client.phone, client.name)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-900/60 text-slate-300 hover:text-emerald-300 border border-slate-700 transition-colors"
                            title="Conversar no WhatsApp"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleOpenEdit(client)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-blue-900/60 text-slate-300 hover:text-cyan-300 border border-slate-700 transition-colors"
                            title="Editar Cliente"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(client.id, client.companyName)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-red-400 border border-slate-700 transition-colors"
                            title="Excluir Cliente"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Nenhum cliente encontrado com os filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Modal (Add/Edit) */}
      {isModalOpen && (
        <ClientModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          clientToEdit={editingClient}
        />
      )}

    </div>
  );
}
