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
    <section id="portfolio" className="py-24 bg-[#000B1A] relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-4 animate-fade-in-up">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/20 mb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Casos de Sucesso</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Nossos <span className="gradient-text">Projetos</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Uma seleção de soluções digitais de alto impacto que entregamos para nossos parceiros.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass-card-hover p-4 md:p-8 group cursor-pointer border-white/5"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Category Badge */}
              <div className="inline-block px-2 md:px-4 py-1 rounded-lg bg-primary/10 border border-primary/30 text-primary text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-3 md:mb-6">
                {project.category}
              </div>

              {/* Title */}
              <h3 className="text-sm md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-primary transition-colors tracking-tight">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-[10px] md:text-sm font-light leading-relaxed mb-4 md:mb-6 hidden sm:block">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-8">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-[7px] md:text-[9px] px-2 md:px-3 py-0.5 md:py-1 rounded-md bg-white/5 text-slate-400 border border-white/5 group-hover:border-primary/20 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div className="flex items-center text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <span>Ver Detalhes</span>
                <ExternalLink size={12} className="ml-1 md:ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
