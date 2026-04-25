import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'João Silva',
    company: 'Tech Solutions Brasil',
    text: 'A LM Tech elevou nossa presença digital. O site ficou impecável e nossas vendas aumentaram 40% em apenas 3 meses.',
    rating: 5,
    avatar: 'JS',
  },
  {
    name: 'Maria Santos',
    company: 'E-commerce Plus',
    text: 'Profissionalismo absoluto e qualidade técnica ímpar. A equipe entregou uma plataforma exatamente como sonhávamos.',
    rating: 5,
    avatar: 'MS',
  },
  {
    name: 'Carlos Oliveira',
    company: 'Consultoria Financeira',
    text: 'O dashboard desenvolvido mudou completamente a forma como analisamos nossos dados diários. Altamente recomendado.',
    rating: 5,
    avatar: 'CO',
  },
  {
    name: 'Ana Costa',
    company: 'Startup Inovadora',
    text: 'Parceria essencial. O aplicativo entregue supera em performance e design qualquer solução que já testamos.',
    rating: 5,
    avatar: 'AC',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#000B1A] relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#00A3FF 1px, transparent 1px), linear-gradient(90deg, #00A3FF 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-4 animate-fade-in-up">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/20 mb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Depoimentos Reais</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Impacto <span className="gradient-text">Comprovado</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Nossos clientes são a maior prova da qualidade e do resultado das nossas soluções digitais.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-4 md:p-8 space-y-3 md:space-y-6 border-white/5 relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Mark Decoration */}
              <div className="absolute top-3 right-4 md:top-6 md:right-8 text-3xl md:text-6xl text-primary/10 font-serif leading-none opacity-50 group-hover:text-primary/20 transition-colors">"</div>

              {/* Stars */}
              <div className="flex gap-1 md:gap-1.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-300 italic text-[10px] md:text-lg leading-relaxed relative z-10 font-light">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-2 md:gap-4 pt-3 md:pt-6 border-t border-white/10 mt-3 md:mt-6">
                <div className="w-6 h-6 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#001533] to-[#001B3D] border border-white/10 flex items-center justify-center font-bold text-white shadow-inner text-[10px] md:text-base">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-white font-bold tracking-tight text-[11px] md:text-base">{testimonial.name}</p>
                  <p className="text-[7px] md:text-[10px] uppercase tracking-widest text-primary font-semibold mt-0.5 md:mt-1">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
