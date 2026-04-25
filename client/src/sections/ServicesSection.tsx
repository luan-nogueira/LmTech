import { Globe, Cog, BarChart3, Zap, Smartphone, Rocket, ArrowRight } from 'lucide-react';

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
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="glass-card-hover p-8 group border-white/5"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon Container with Glow */}
                <div className="relative w-14 h-14 mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:bg-primary/40 transition-colors"></div>
                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#001533] to-[#001B3D] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/40 transition-all duration-500">
                    <Icon size={28} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors tracking-tight">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light mb-6">{service.description}</p>

                {/* Subtle Interactive Link */}
                <div className="flex items-center text-[11px] uppercase tracking-[0.2em] font-bold text-primary/60 group-hover:text-primary transition-all duration-300">
                  <span>Explorar Detalhes</span>
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
