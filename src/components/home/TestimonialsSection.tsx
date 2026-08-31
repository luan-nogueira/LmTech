'use client';

import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Carlos Medeiros',
      role: 'Diretor Geral',
      company: 'Mega Gym Fitness Club',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      text: 'A plataforma desenvolvida pela LM Tech mudou completamente a nossa presença digital. Nossas matrículas online cresceram mais de 200% nos primeiros dois meses. Atendimento rápido e impecável.',
      rating: 5,
    },
    {
      name: 'Marcos Barra',
      role: 'Diretor de Operações',
      company: 'TransBarra Soluções em Transporte',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      text: 'O painel financeiro e de frota que a LM Tech construiu eliminou nossas planilhas manuais e nos dá visão em tempo real de tudo. Profissionalismo técnico de altíssimo nível!',
      rating: 5,
    },
    {
      name: 'Juliana Alencar',
      role: 'Gestora Comercial',
      company: 'Nexus Imóveis Premium',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      text: 'O novo portal é incrivelmente rápido e elegante. Nossos clientes elogiam a facilidade para filtrar lançamentos e agendar visitas pelo WhatsApp. O retorno sobre o investimento foi imediato.',
      rating: 5,
    },
  ];

  return (
    <section id="depoimentos" className="py-24 relative bg-[#07090e] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <span>Prova Social & Resultados</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            O que Nossos Clientes Dizem Sobre a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              LM Tech
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            A satisfação dos nossos parceiros é o nosso maior indicador de sucesso.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-6 relative group"
            >
              <Quote className="w-10 h-10 text-blue-500/20 absolute top-6 right-6" />

              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Body Text */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-white/5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-cyan-500/30"
                />
                <div>
                  <div className="font-bold text-sm text-white">{t.name}</div>
                  <div className="text-xs text-slate-400">
                    {t.role} • <span className="text-cyan-400 font-medium">{t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
