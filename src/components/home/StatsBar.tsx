'use client';

import { Rocket, Users, Award, Gauge } from 'lucide-react';

export function StatsBar() {
  const stats = [
    {
      icon: Rocket,
      value: '+50',
      label: 'Projetos Entregues',
      sublabel: 'Sites, sistemas e plataformas',
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: Users,
      value: '+30',
      label: 'Clientes & Parceiros',
      sublabel: 'Em todo o Brasil',
      color: 'from-cyan-400 to-teal-300',
    },
    {
      icon: Award,
      value: '99.8%',
      label: 'Satisfação & NPS',
      sublabel: 'Qualidade reconhecida',
      color: 'from-indigo-400 to-purple-400',
    },
    {
      icon: Gauge,
      value: '< 0.8s',
      label: 'Tempo de Carregamento',
      sublabel: 'Otimização Core Web Vitals',
      color: 'from-emerald-400 to-green-300',
    },
  ];

  return (
    <section className="relative z-10 py-10 border-y border-white/10 bg-[#090d16]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 group-hover:text-cyan-400 group-hover:scale-110 group-hover:border-blue-500/40 transition-all shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className={`text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                    {item.value}
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">{item.label}</div>
                  <div className="text-xs text-slate-400">{item.sublabel}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
