'use client';

import { useState, useMemo, useEffect } from 'react';
import { ExternalLink, Sparkles, Filter, Search, Globe, CheckCircle, Code2, ArrowUpRight, Paintbrush } from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';
import { PortfolioCategory, Client } from '@/types/client';
import { EditProjectCoverModal } from '@/components/admin/EditProjectCoverModal';

export function PortfolioSection() {
  const { clients, adminConfig, isAuthenticated, syncWithServer } = useClientStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Quick edit cover for admin
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);

  useEffect(() => {
    syncWithServer();
  }, [syncWithServer]);

  const categories = [
    'Todos',
    'Sistemas Web',
    'Landing Pages',
    'Dashboards & SaaS',
    'E-commerce',
    'Aplicativos',
  ];

  // Filter clients who have showInPortfolio == true
  const portfolioItems = useMemo(() => {
    return clients.filter((client) => {
      if (!client.showInPortfolio) return false;

      const matchesCategory =
        selectedCategory === 'Todos' || client.portfolioCategory === selectedCategory;

      const matchesSearch =
        searchQuery === '' ||
        client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [clients, selectedCategory, searchQuery]);

  const phoneClean = adminConfig.companyPhone.replace(/\D/g, '');

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      'Olá Luan! Vi os projetos no portfólio da LM Tech e gostaria de criar um site/sistema para a minha empresa também.'
    );
    window.open(`https://wa.me/55${phoneClean}?text=${text}`, '_blank');
  };

  return (
    <section id="portfolio" className="py-24 relative bg-[#07090e] border-b border-white/10">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfólio Vivo & Projetos Entregues</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Projetos Reais no Ar que Geram{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300">
              Resultados Reais
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 font-normal">
            Explore alguns dos sistemas, sites e plataformas desenvolvidos pela LM Tech. Clique no botão de cada card para <strong>visitar o projeto funcionando ao vivo na internet</strong>.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5">
          
          {/* Categories Tab Pill */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por cliente, tecnologia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl glass-input placeholder-slate-500 focus:border-cyan-400"
            />
          </div>

        </div>

        {/* Portfolio Cards Grid */}
        {portfolioItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => {
              const isLive = Boolean(item.projectUrl && item.projectUrl.trim() !== '');

              return (
                <div
                  key={item.id}
                  className="group rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0c121e]/90 border border-white/10 hover:border-blue-500/50 shadow-xl hover:shadow-2xl hover:shadow-blue-600/20 transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1.5"
                >
                  {/* Thumbnail / Image with Overlay */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                    <img
                      src={
                        item.thumbnailUrl ||
                        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'
                      }
                      alt={item.projectTitle}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                        {item.portfolioCategory}
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Online no Ar
                      </span>
                    </div>

                    {/* Admin Quick Edit Shortcut Button */}
                    {isAuthenticated && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingClient(item);
                          setIsCoverModalOpen(true);
                        }}
                        className="absolute top-3 right-28 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-900/90 hover:bg-blue-800 text-white border border-blue-400/50 shadow-lg backdrop-blur-md flex items-center gap-1 transition-transform transform active:scale-95"
                        title="Alterar capa e título deste projeto"
                      >
                        <Paintbrush className="w-3 h-3" />
                        <span>Editar Capa</span>
                      </button>
                    )}

                    {/* Highlight Metric Badge */}
                    {item.metricsHighlight && (
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-blue-950/90 text-blue-200 border border-blue-500/40 text-xs font-semibold backdrop-blur-md shadow-lg">
                        ✨ {item.metricsHighlight}
                      </div>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        {item.companyName}
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                        {item.projectTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                        {item.projectDescription}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button: Direct URL Link */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      {isLive ? (
                        <a
                          href={item.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all group/btn"
                        >
                          <Globe className="w-4 h-4 text-cyan-200" />
                          <span>Visitar Projeto no Ar</span>
                          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      ) : (
                        <div className="text-xs text-slate-500 italic py-2 text-center w-full">
                          Ambiente Privado Corporativo
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/50 border border-dashed border-slate-800">
            <Globe className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-300">Nenhum projeto encontrado nesta categoria</h4>
            <p className="text-xs text-slate-500 mt-1">
              Experimente selecionar outra categoria ou limpar a busca.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-cyan-400 bg-cyan-950/50 border border-cyan-800"
            >
              Ver Todos os Projetos
            </button>
          </div>
        )}

        {/* Bottom Banner Call to Action */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Quer ver a sua empresa brilhando aqui no ar?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Desenvolvemos a sua presença digital sob medida com a mesma tecnologia e velocidade dos nossos maiores cases.
            </p>
          </div>

          <button
            onClick={openWhatsApp}
            className="px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/30 transition-all shrink-0 flex items-center gap-2 transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            <span>Iniciar Meu Projeto com a LM Tech</span>
          </button>
        </div>

      </div>

      {/* Admin Quick Edit Cover Modal */}
      {isCoverModalOpen && editingClient && (
        <EditProjectCoverModal
          isOpen={isCoverModalOpen}
          onClose={() => {
            setIsCoverModalOpen(false);
            setEditingClient(null);
          }}
          client={editingClient}
        />
      )}
    </section>
  );
}
