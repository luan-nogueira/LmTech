'use client';

import { Zap, Palette, TrendingUp, Gauge, ShieldCheck, HeadphonesIcon } from 'lucide-react';

export function WhyChooseUs() {
  const differentials = [
    {
      icon: Zap,
      title: 'Atendimento Ágil & Direto',
      desc: 'Sem burocracia ou intermediários. Você se comunica diretamente com o desenvolvedor responsável pelo seu projeto.',
    },
    {
      icon: Palette,
      title: 'Design Sofisticado & Exclusivo',
      desc: 'Interfaces desenhadas sob medida para refletir autoridade máxima, sem templates repetitivos ou genéricos.',
    },
    {
      icon: TrendingUp,
      title: 'SEO Estratégico',
      desc: 'Estruturação semântica e boas práticas técnicas para que sua empresa seja encontrada facilmente no Google.',
    },
    {
      icon: Gauge,
      title: 'Performance Imbatível',
      desc: 'Código enxuto com Next.js para garantir carregamento instantâneo e pontuação máxima no Google PageSpeed.',
    },
    {
      icon: ShieldCheck,
      title: 'Segurança & Blindagem',
      desc: 'Proteção contra ataques, certificados SSL modernos e práticas recomendadas de segurança de dados.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Suporte & Manutenção Dedicada',
      desc: 'Acompanhamento constante, backups e suporte contínuo para manter sua aplicação sempre atualizada e no ar.',
    },
  ];

  return (
    <section id="sobre" className="py-24 relative bg-[#090d16] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <span>Diferenciais LM Tech</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Por que Escolher a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300">
              LM Tech
            </span>{' '}
            para o seu Negócio?
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Nossos diferenciais são construídos com foco em entregar o mais alto padrão de qualidade, design e resultado financeiro.
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((diff, idx) => {
            const Icon = diff.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400 transition-all shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {diff.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
