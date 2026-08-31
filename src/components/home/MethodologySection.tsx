'use client';

import { Search, PenTool, Terminal, Rocket, CheckCircle2 } from 'lucide-react';

export function MethodologySection() {
  const steps = [
    {
      num: '01',
      icon: Search,
      title: 'Diagnóstico & Estratégia',
      desc: 'Entendemos a fundo os objetivos do seu negócio, público-alvo, concorrentes e diferenciais para traçar a arquitetura ideal.',
    },
    {
      num: '02',
      icon: PenTool,
      title: 'Design UI/UX & Protótipo',
      desc: 'Criamos interfaces visuais modernas, elegantes e intuitivas focadas na melhor experiência do usuário e alta taxa de conversão.',
    },
    {
      num: '03',
      icon: Terminal,
      title: 'Engenharia & Performance',
      desc: 'Codificamos com Next.js, React e TypeScript, garantindo segurança blindada, carregamento instantâneo e código 100% autoral.',
    },
    {
      num: '04',
      icon: Rocket,
      title: 'Lançamento & Suporte',
      desc: 'Publicação em servidores globais ultrarrápidos, integração de domínio e acompanhamento contínuo para manter seu sistema no topo.',
    },
  ];

  return (
    <section id="metodologia" className="py-24 relative bg-[#07090e] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <span>Metodologia Comprovada</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Como Transformamos a sua Ideia em um{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              Produto Digital de Elite
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Processo ágil, transparente e estruturado para que você acompanhe cada etapa do projeto sem dores de cabeça.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-6 group"
              >
                {/* Step Number */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-slate-700 group-hover:text-cyan-400 transition-colors font-mono">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Body */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Progress bar line */}
                <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
                  <div className="w-1/3 group-hover:w-full h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
