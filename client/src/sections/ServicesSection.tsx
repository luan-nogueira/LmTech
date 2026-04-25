import { Globe, Cog, BarChart3, Zap, Smartphone, Rocket, ExternalLink } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Sites Profissionais',
    description: 'Criação de sites modernos, responsivos e otimizados para conversão e SEO.',
  },
  {
    icon: Cog,
    title: 'Sistemas Sob Medida',
    description: 'Sistemas personalizados desenvolvidos especificamente para sua empresa.',
  },
  {
    icon: BarChart3,
    title: 'Dashboards e Relatórios',
    description: 'Painéis inteligentes com dados em tempo real e visualizações poderosas.',
  },
  {
    icon: Zap,
    title: 'Automação de Processos',
    description: 'Automatização de tarefas e integrações para aumentar produtividade.',
  },
  {
    icon: Smartphone,
    title: 'Aplicativos Web e Mobile',
    description: 'Apps modernos, performáticos e com excelente experiência de usuário.',
  },
  {
    icon: Rocket,
    title: 'Landing Pages que Convertem',
    description: 'Páginas focadas em vendas e captação de leads com alta taxa de conversão.',
  },
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="py-24 bg-[#000B1A] relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#00A3FF 1px, transparent 1px), linear-gradient(90deg, #00A3FF 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-4 animate-fade-in-up">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/20 mb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Nossa Expertise</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Serviços de <span className="gradient-text">Alta Performance</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Soluções digitais desenhadas sob medida para impulsionar resultados e escalar o seu negócio com tecnologia de ponta.
          </p>
          <div className="pt-4 flex justify-center">
            <a
              href="https://mgfmegagym.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-premium inline-flex items-center gap-3 py-2 px-6"
            >
              <span>Ver Exemplo de Site</span>
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="glass-card-hover p-4 md:p-8 group border-white/5"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon Container with Glow */}
                <div className="relative w-10 h-10 md:w-14 md:h-14 mb-4 md:mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:bg-primary/40 transition-colors"></div>
                  <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#001533] to-[#001B3D] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/40 transition-all duration-500">
                    <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-sm md:text-xl font-bold text-white mb-2 md:mb-4 group-hover:text-primary transition-colors tracking-tight">{service.title}</h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
