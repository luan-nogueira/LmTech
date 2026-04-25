import { Globe, Cog, BarChart3, Zap, Smartphone, Rocket } from 'lucide-react';

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
    <section id="servicos" className="py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663529153293/7pDi4eoXgtcLF2YPgS9jbb/lm-tech-services-pattern-K9oKPy8oMswE9oV7guvKCD.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Nossos <span className="gradient-text">Serviços</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos soluções completas em desenvolvimento digital, desde sites até sistemas complexos e automações inteligentes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="glass-card-hover p-6 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={24} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>

                {/* Arrow */}
                <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-semibold">Saiba mais</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
