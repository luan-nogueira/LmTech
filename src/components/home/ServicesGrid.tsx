'use client';

import { Globe, Cpu, BarChart3, Zap, Smartphone, ShoppingCart, ArrowRight } from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';

export function ServicesGrid() {
  const { adminConfig } = useClientStore();
  const phoneClean = adminConfig.companyPhone.replace(/\D/g, '');

  const openServiceWhatsApp = (serviceName: string) => {
    const text = encodeURIComponent(
      `Olá Luan! Gostaria de um orçamento para o serviço de *${serviceName}* com a LM Tech.`
    );
    window.open(`https://wa.me/55${phoneClean}?text=${text}`, '_blank');
  };

  const services = [
    {
      icon: Globe,
      title: 'Sites & Portais Profissionais',
      desc: 'Desenvolvimento de sites institucionais modernos, ultra-rápidos e 100% otimizados para mecanismos de busca (SEO) que consolidam autoridade.',
      features: ['Carregamento Instantâneo (< 1s)', 'Design Responsivo Premium', 'Otimização Técnica para Google', 'Integração com WhatsApp e Redes'],
      badge: 'Alta Conversão',
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      icon: Cpu,
      title: 'Sistemas Web Sob Medida',
      desc: 'Plataformas personalizadas para gerenciar cadastros, finanças, processos e regras exclusivas do seu modelo de negócio, sem limitações.',
      features: ['Autenticação Segura & Perfis', 'Banco de Dados em Nuvem', 'Painel Administrativo Completo', 'Backup Automático Diário'],
      badge: 'Escalável',
      gradient: 'from-cyan-400 to-indigo-500',
    },
    {
      icon: BarChart3,
      title: 'Dashboards Executivos & BI',
      desc: 'Painéis visuais dinâmicos para acompanhamento de KPIs, faturamento, vendas e métricas operacionais em tempo real com gráficos e exportação.',
      features: ['Gráficos Interativos em Tempo Real', 'Exportação para PDF e Excel', 'Controle de Metas e Faturamento', 'Filtros Inteligentes de Período'],
      badge: 'Métricas em Tempo Real',
      gradient: 'from-indigo-400 to-purple-500',
    },
    {
      icon: Zap,
      title: 'Automação & Integração de APIs',
      desc: 'Conecte seus sistemas a gateways de pagamento, robôs de WhatsApp, CRMs e planilhas para eliminar tarefas manuais e acelerar vendas.',
      features: ['Disparos Automáticos de WhatsApp', 'Geração e Baixa de Pix Automático', 'Webhooks e Notificações Push', 'Redução de Custos Operacionais'],
      badge: 'Produtividade',
      gradient: 'from-emerald-400 to-teal-500',
    },
    {
      icon: Smartphone,
      title: 'Aplicativos Web & PWAs',
      desc: 'Aplicações progressivas que funcionam no navegador e no celular como um app nativo, com suporte offline e instalação direta sem taxas de app store.',
      features: ['Instalação Direta no Celular', 'Push Notifications para Clientes', 'Alta Fluidez e Performance', 'Compatível com Android e iOS'],
      badge: 'Multiplataforma',
      gradient: 'from-blue-400 to-purple-400',
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce & Catálogos Digitais',
      desc: 'Lojas virtuais personalizadas sem comissões sobre suas vendas, com checkout simplificado, integração de estoque e cálculo de frete.',
      features: ['Checkout Rápido em 1-Clique', 'Pix Copia e Cola / Cartão de Crédito', 'Gestão Simples de Produtos', 'Painel de Pedidos em Tempo Real'],
      badge: 'Vendas 24/7',
      gradient: 'from-amber-400 to-orange-500',
    },
  ];

  return (
    <section id="servicos" className="py-24 relative bg-[#07090e] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <span>Nossas Especialidades</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engenharia de Software e Design de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300">
              Alta Performance
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Cada linha de código é construída sob medida para oferecer máxima velocidade, segurança e retorno sobre investimento para a sua empresa.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-blue-500/50 hover:bg-slate-900/90 shadow-xl hover:shadow-2xl hover:shadow-blue-600/15 transition-all duration-300 flex flex-col justify-between space-y-6 transform hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-500/40 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-950/60 text-blue-300 border border-blue-500/30">
                      {srv.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  {/* Feature Checkpoints */}
                  <div className="pt-3 space-y-2 border-t border-white/5">
                    {srv.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card Action */}
                <button
                  onClick={() => openServiceWhatsApp(srv.title)}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-200 group-hover:text-white bg-slate-800/80 group-hover:bg-blue-600 border border-slate-700/60 group-hover:border-blue-500 transition-all flex items-center justify-center gap-2"
                >
                  <span>Solicitar {srv.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
