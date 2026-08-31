'use client';

import { ArrowRight, Code2, Sparkles, Zap, CheckCircle2, Globe2, ShieldCheck, Play } from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';

export function HeroSection() {
  const { adminConfig } = useClientStore();
  const phoneClean = adminConfig.companyPhone.replace(/\D/g, '');

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      'Olá Luan! Estava no site da LM Tech e gostaria de conversar sobre um projeto digital para a minha empresa.'
    );
    window.open(`https://wa.me/55${phoneClean}?text=${text}`, '_blank');
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Decorative Glow Circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & CTAs (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Status Live Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold shadow-inner shadow-blue-500/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-badge-pulse" />
              <span className="tracking-wide">DESENVOLVIMENTO WEB & SISTEMAS DE ALTA PERFORMANCE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Elevamos o seu negócio com{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300">
                Soluções Digitais
              </span>{' '}
              de Alto Impacto.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Desenvolvemos <strong>sites de altíssima conversão, sistemas web sob medida, dashboards executivos e automações</strong> projetados para dominar o seu mercado com velocidade incomparável e design de padrão internacional.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl py-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Velocidade 100/100</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Código 100% Autoral</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Suporte Direto do Dev</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/30 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                <Zap className="w-4 h-4 fill-current text-cyan-200" />
                <span>Falar com o Especialista no WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#portfolio"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all hover:text-white"
              >
                <Globe2 className="w-4 h-4 text-cyan-400" />
                <span>Ver Portfólio no Ar</span>
              </a>
            </div>

          </div>

          {/* Right Visual Tech Card (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Glow border wrapper */}
              <div className="relative rounded-2xl bg-gradient-to-b from-blue-500/30 via-slate-800/50 to-cyan-500/20 p-[1px] shadow-2xl shadow-blue-900/40 backdrop-blur-xl">
                <div className="rounded-[15px] bg-[#0c121e]/90 p-6 sm:p-7 space-y-6">
                  
                  {/* Top Header of Card */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      LM_ENGINE_ONLINE
                    </span>
                  </div>

                  {/* Architecture Stats Grid */}
                  <div className="space-y-4 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">STACK:</span>
                      <span className="text-blue-400 font-bold">Next.js 16 + React 19 + TypeScript</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">PERFORMANCE SCORE:</span>
                      <span className="text-emerald-400 font-bold">99 - 100 / 100 ⚡</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">SEGURANÇA:</span>
                      <span className="text-cyan-300 font-bold">SSL + Headers + DDoS Shield</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">ATUALIZAÇÃO DINÂMICA:</span>
                      <span className="text-purple-400 font-bold">Painel Admin Integrado</span>
                    </div>
                  </div>

                  {/* Bottom Interactive Link Case */}
                  <div className="pt-2">
                    <a
                      href="https://mgfmegagym.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3.5 rounded-xl bg-blue-950/40 hover:bg-blue-900/60 border border-blue-600/30 hover:border-blue-500/60 transition-all text-xs font-semibold text-slate-200"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
                          <Code2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-white font-bold group-hover:text-cyan-300 transition-colors">Case Mega Gym no Ar</p>
                          <p className="text-[10px] text-slate-400">mgfmegagym.vercel.app</p>
                        </div>
                      </div>
                      <span className="text-blue-400 font-bold group-hover:translate-x-0.5 transition-transform">
                        Visitar ↗
                      </span>
                    </a>
                  </div>

                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 p-3 rounded-xl bg-slate-900/95 border border-slate-700/80 shadow-xl flex items-center gap-3 backdrop-blur-md">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white">Garantia & Suporte</p>
                  <p className="text-[10px] text-slate-400">Acompanhamento contínuo</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
