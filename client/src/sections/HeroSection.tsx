import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-screen pt-20 pb-20 overflow-hidden flex items-center"
      style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663529153293/7pDi4eoXgtcLF2YPgS9jbb/lm-tech-hero-bg-jfBaZ4t7giTmMwV5iTizhC.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm"></div>

      {/* Animated Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 w-fit">
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm text-primary font-medium">Inovação Digital</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Transformamos
              <span className="gradient-text block">ideias em soluções</span>
              digitais.
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground max-w-lg">
              Desenvolvemos sites, sistemas e automações para empresas que desejam crescer com tecnologia. Somos especialistas em criar soluções personalizadas que geram resultados reais.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => scrollToSection('contato')}
                className="btn-neon flex items-center justify-center gap-2 group"
              >
                Solicitar Orçamento
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('servicos')}
                className="btn-outline-neon flex items-center justify-center gap-2"
              >
                Ver Serviços
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50">
              <div>
                <p className="text-2xl font-bold text-primary">+50</p>
                <p className="text-sm text-muted-foreground">Projetos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">+30</p>
                <p className="text-sm text-muted-foreground">Clientes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">99%</p>
                <p className="text-sm text-muted-foreground">Satisfação</p>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 animate-float" style={{ animationDelay: '0.5s' }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663529153293/7pDi4eoXgtcLF2YPgS9jbb/lm-tech-dashboard-mockup-5yPFq9vS7TWS9xnVE386Ae.webp"
                alt="Dashboard Mockup"
                className="w-full drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
