import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Plataforma E-commerce',
    category: 'Sistema Completo',
    description: 'Plataforma de vendas online com integração de pagamento e gestão de estoque.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Dashboard Financeiro',
    category: 'Dashboard',
    description: 'Painel de análise financeira com gráficos em tempo real e relatórios automáticos.',
    tags: ['React', 'Chart.js', 'API REST'],
  },
  {
    title: 'Site Institucional',
    category: 'Website',
    description: 'Site responsivo e otimizado para SEO com design moderno e conversão.',
    tags: ['Next.js', 'Tailwind', 'SEO'],
  },
  {
    title: 'App Mobile',
    category: 'Aplicativo',
    description: 'Aplicativo mobile para gerenciamento de tarefas com sincronização em nuvem.',
    tags: ['React Native', 'Firebase', 'UX/UI'],
  },
  {
    title: 'Sistema de Automação',
    category: 'Automação',
    description: 'Sistema de automação de processos com integração de múltiplas APIs.',
    tags: ['Python', 'Zapier', 'Integração'],
  },
  {
    title: 'Landing Page',
    category: 'Conversão',
    description: 'Landing page de alto desempenho com taxa de conversão de 12%.',
    tags: ['HTML/CSS', 'JavaScript', 'Otimização'],
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 bg-background relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663529153293/7pDi4eoXgtcLF2YPgS9jbb/lm-tech-portfolio-bg-635sqs7Y6kaXF5WJo8YpcN.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Nosso <span className="gradient-text">Portfólio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos para nossos clientes. Cada projeto é uma oportunidade de inovação.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass-card-hover p-6 group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Category Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-semibold mb-4">
                {project.category}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded bg-accent/20 text-accent">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-semibold">Ver projeto</span>
                <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
