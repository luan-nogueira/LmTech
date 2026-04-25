import { CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="sobre" className="py-24 bg-[#000B1A] relative overflow-hidden">
      {/* Sophisticated Background Element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/20">
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Nossa História</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Excelência em <br />
              <span className="gradient-text">DNA Digital</span>
            </h2>

            <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg">
              <p>
                A LM Tech nasceu da visão de que a tecnologia deve ser o motor da liberdade e do crescimento. Criamos ecossistemas digitais que não apenas funcionam, mas encantam e geram valor real para cada modelo de negócio.
              </p>
              <p>
                Com um time de especialistas em engenharia de software e design de experiência, transformamos desafios complexos em interfaces fluidas e sistemas robustos.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {['Inovação Disruptiva', 'Qualidade Absolute', 'Suporte Elite', 'Resultados de Alto Impacto'].map((value, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-primary/30 transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform"></div>
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Sophisticated Stats Grid */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {[
              { number: '+50', label: 'Projetos de Elite', detail: 'Entregues com perfeição' },
              { number: '+30', label: 'Parceiros Globais', detail: 'Confiança mútua' },
              { number: '99%', label: 'NPS de Excelência', detail: 'Satisfação garantida' },
              { number: '5+', label: 'Anos de Mercado', detail: 'Sólida experiência' },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-card p-8 group border-white/5"
              >
                <p className="text-4xl font-extrabold text-white group-hover:text-primary transition-colors tracking-tighter mb-2">{stat.number}</p>
                <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">{stat.label}</p>
                <div className="w-8 h-[1px] bg-primary/30 group-hover:w-full transition-all duration-500"></div>
                <p className="text-[10px] text-slate-500 mt-4 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
