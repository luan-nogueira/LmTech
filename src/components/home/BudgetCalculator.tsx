'use client';

import { useState, useMemo } from 'react';
import { Calculator, Check, Sparkles, Send, Clock, Layers, ShieldCheck } from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';

interface ServiceOption {
  id: string;
  name: string;
  desc: string;
  baseMin: number;
  baseMax: number;
  baseDays: string;
  icon: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'site',
    name: 'Site Institucional Premium',
    desc: 'Ideal para empresas, consultorias e negócios que precisam de autoridade máxima no Google.',
    baseMin: 1800,
    baseMax: 2800,
    baseDays: '10 a 18 dias',
    icon: '🌐',
  },
  {
    id: 'landing_page',
    name: 'Landing Page de Alta Conversão',
    desc: 'Página ultra-otimizada para campanhas de tráfego pago, lançamentos e captação massiva de leads.',
    baseMin: 1200,
    baseMax: 2200,
    baseDays: '5 a 10 dias',
    icon: '🚀',
  },
  {
    id: 'system',
    name: 'Sistema Web Sob Medida',
    desc: 'Plataforma completa para automatizar regras do seu negócio, cadastros, relatórios e permissões.',
    baseMin: 3500,
    baseMax: 7000,
    baseDays: '20 a 40 dias',
    icon: '⚙️',
  },
  {
    id: 'dashboard',
    name: 'Dashboard Corporativo / BI',
    desc: 'Painel visual com métricas em tempo real, fluxo financeiro, gráficos dinâmicos e exportação de PDF.',
    baseMin: 2800,
    baseMax: 5500,
    baseDays: '15 a 25 dias',
    icon: '📊',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce & Catálogo Online',
    desc: 'Loja virtual com carrinho, checkout Pix/Cartão, cálculo de frete e painel de pedidos.',
    baseMin: 3200,
    baseMax: 6200,
    baseDays: '20 a 35 dias',
    icon: '🛍️',
  },
];

interface FeatureAddon {
  id: string;
  label: string;
  price: number;
}

const FEATURE_ADDONS: FeatureAddon[] = [
  { id: 'admin', label: 'Painel Admin de Gestão', price: 600 },
  { id: 'whatsapp', label: 'Integração Direta com WhatsApp / Chatbot', price: 400 },
  { id: 'payments', label: 'Gateway de Pagamentos Online (Pix / Cartão)', price: 500 },
  { id: 'members', label: 'Área de Membros / Login e Cadastro de Usuários', price: 700 },
  { id: 'seo', label: 'Otimização Avançada para Google (SEO Top Rank)', price: 350 },
  { id: 'api', label: 'Integração de APIs Externas / Webhooks', price: 550 },
];

export function BudgetCalculator() {
  const { adminConfig, addLead } = useClientStore();

  const [selectedService, setSelectedService] = useState<string>('site');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['admin', 'whatsapp', 'seo']);
  const [timelineSpeed, setTimelineSpeed] = useState<'normal' | 'express'>('normal');

  // Contact info
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');

  const currentService = useMemo(
    () => SERVICE_OPTIONS.find((s) => s.id === selectedService) || SERVICE_OPTIONS[0],
    [selectedService]
  );

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  // Calculate pricing
  const calculation = useMemo(() => {
    const featuresCost = selectedFeatures.reduce((acc, featId) => {
      const feat = FEATURE_ADDONS.find((f) => f.id === featId);
      return acc + (feat ? feat.price : 0);
    }, 0);

    let min = currentService.baseMin + featuresCost;
    let max = currentService.baseMax + featuresCost;

    let timeText = currentService.baseDays;

    if (timelineSpeed === 'express') {
      min = Math.round(min * 1.2);
      max = Math.round(max * 1.2);
      timeText = 'Entrega Acelerada Prioritária';
    }

    return { min, max, timeText, featuresCost };
  }, [currentService, selectedFeatures, timelineSpeed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      alert('Por favor, informe seu Nome e WhatsApp para receber o orçamento.');
      return;
    }

    const featureNames = selectedFeatures.map(
      (fId) => FEATURE_ADDONS.find((f) => f.id === fId)?.label || fId
    );

    // Save lead in store
    addLead({
      name,
      phone,
      company: company || undefined,
      serviceType: currentService.name,
      features: featureNames,
      deadline: timelineSpeed === 'express' ? 'Urgente / Expresso' : 'Prazo Padrão',
      estimatedPriceMin: calculation.min,
      estimatedPriceMax: calculation.max,
      estimatedTime: calculation.timeText,
      message: notes || undefined,
    });

    // Format WhatsApp message
    const phoneClean = adminConfig.companyPhone.replace(/\D/g, '');
    const messageText = `*NOVA SIMULAÇÃO DE ORÇAMENTO — LM TECH*\n\n` +
      `👤 *Nome:* ${name}\n` +
      `🏢 *Empresa:* ${company || 'Não informado'}\n` +
      `📱 *WhatsApp:* ${phone}\n\n` +
      `🎯 *Solução Selecionada:* ${currentService.name}\n` +
      `⚡ *Recursos Extras:* ${featureNames.join(', ') || 'Nenhum'}\n` +
      `⏱️ *Prazo Desejado:* ${timelineSpeed === 'express' ? 'Expresso (Prioritário)' : 'Padrão'}\n\n` +
      `💰 *Estimativa Simulada:* R$ ${calculation.min.toLocaleString('pt-BR')} a R$ ${calculation.max.toLocaleString('pt-BR')}\n` +
      `📅 *Tempo Estimado:* ${calculation.timeText}\n` +
      (notes ? `\n📝 *Detalhes do Projeto:* ${notes}\n` : '') +
      `\nOlá Luan! Gostaria de validar esta proposta e agendar o início do projeto!`;

    window.open(`https://wa.me/55${phoneClean}?text=${encodeURIComponent(messageText)}`, '_blank');
  };

  return (
    <section id="calculadora" className="py-24 relative bg-[#090d16] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulador Interativo de Investimento</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Descubra o Valor do seu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              Projeto Digital
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Selecione o tipo de solução e os recursos desejados para calcular uma estimativa instantânea e receber atendimento prioritário.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Selections (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Escolha o Tipo de Projeto */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-xs text-blue-400 font-black">
                  1
                </span>
                Qual é a solução que você precisa?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_OPTIONS.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedService(srv.id)}
                    className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-2 ${
                      selectedService === srv.id
                        ? 'bg-blue-950/60 border-cyan-400 shadow-lg shadow-blue-600/20'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{srv.icon}</span>
                      {selectedService === srv.id && (
                        <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{srv.name}</div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-2">{srv.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Recursos Extras */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-xs text-blue-400 font-black">
                  2
                </span>
                Recursos Adicionais & Integrações
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FEATURE_ADDONS.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-3 rounded-xl text-left border flex items-center justify-between text-xs font-medium transition-all ${
                        isChecked
                          ? 'bg-cyan-950/50 border-cyan-500/60 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{feat.label}</span>
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isChecked
                            ? 'bg-cyan-400 border-cyan-400 text-slate-950'
                            : 'border-slate-700 bg-slate-800'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Prazo de Entrega */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-xs text-blue-400 font-black">
                  3
                </span>
                Ritmo & Prazo de Entrega
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTimelineSpeed('normal')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    timelineSpeed === 'normal'
                      ? 'bg-blue-950/50 border-blue-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm">Prazo Padrão</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{currentService.baseDays}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTimelineSpeed('express')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    timelineSpeed === 'express'
                      ? 'bg-amber-950/40 border-amber-500/80 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm text-amber-300 flex items-center gap-1">
                    <span>⚡ Entrega Expressa</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Prioridade total na fila</div>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Live Summary & Direct WhatsApp Form (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-[#0c121e] border border-blue-500/40 p-6 sm:p-8 shadow-2xl shadow-blue-950/60 space-y-6">
              
              <div className="border-b border-white/10 pb-4">
                <span className="text-[11px] uppercase tracking-wider font-bold text-cyan-400">
                  Estimativa em Tempo Real
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Resumo da Simulação</h3>
              </div>

              {/* Price Calculation Box */}
              <div className="p-5 rounded-2xl bg-[#060910] border border-cyan-500/30 text-center space-y-2">
                <span className="text-xs text-slate-400 font-medium">Faixa de Investimento Estimada:</span>
                <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400">
                  R$ {calculation.min.toLocaleString('pt-BR')} — R$ {calculation.max.toLocaleString('pt-BR')}
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Prazo estimado: <strong className="text-white">{calculation.timeText}</strong></span>
                </div>
              </div>

              {/* Included Highlights */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Código 100% autoral em Next.js & TypeScript</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Design Responsivo Mobile & Desktop de Alto Padrão</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Suporte e Garantia pós-entrega inclusos</span>
                </div>
              </div>

              {/* Lead Form to send to WhatsApp */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Seu Nome Completo *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm placeholder-slate-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp com DDD *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm placeholder-slate-500"
                  />
                  <input
                    type="text"
                    placeholder="Empresa / Negócio"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm placeholder-slate-500"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Algum detalhe ou referência que queira mencionar? (Opcional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl glass-input text-xs sm:text-sm placeholder-slate-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Orçamento no WhatsApp</span>
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
