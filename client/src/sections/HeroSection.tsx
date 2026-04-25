import { ArrowRight, Sparkles } from 'lucide-react';
import heroMockup from '../assets/hero-mockup.png';

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-screen pt-20 pb-20 overflow-hidden flex items-center bg-[#000B1A]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#00A3FF 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000B1A]/80 to-[#000B1A]"></div>

      {/* Animated Orbs - Navy Sophistication */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#00A3FF]/10 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute bottom-[0%] right-[-5%] w-[600px] h-[600px] bg-[#00E0FF]/5 rounded-full blur-[150px] animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/20 w-fit">
              <Sparkles size={14} className="text-primary animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Inovação Digital Premium</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-white leading-[1.1] tracking-tight">
              A Excelência em
              <span className="gradient-text block">Soluções Digitais</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed font-light">
              Desenvolvemos ecossistemas digitais de alto impacto. Sites, sistemas e automações desenhados para elevar o patamar competitivo da sua empresa.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <button
                onClick={() => scrollToSection('contato')}
                className="btn-premium flex items-center justify-center gap-3 group"
              >
                Solicitar Orçamento
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => scrollToSection('servicos')}
                className="btn-outline-premium flex items-center justify-center gap-3"
              >
                Ver Serviços
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-white tracking-tighter">+50</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Projetos</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-white tracking-tighter">+30</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Clientes</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-white tracking-tighter">99%</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Satisfação</p>
              </div>
            </div>
          </div>

          {/* Right Content - Sophisticated Mockup */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl -z-10 opacity-30"></div>
              <img
                src={heroMockup}
                alt="Dashboard Mockup Premium"
                className="w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] rounded-2xl border border-white/5"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
