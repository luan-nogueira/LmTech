import { Zap, Shield, TrendingUp, Headphones, Rocket, Lock } from 'lucide-react';

const differentials = [
  {
    icon: Zap,
    title: 'Atendimento Ágil',
    description: 'Resposta rápida às suas demandas e suporte prioritário para garantir que seu projeto nunca pare.',
  },
  {
    icon: Rocket,
    title: 'Design Sofisticado',
    description: 'Interfaces elegantes, intuitivas e alinhadas com as tendências visuais globais.',
  },
  {
    icon: TrendingUp,
    title: 'SEO Estratégico',
    description: 'Arquitetura desenvolvida com as melhores práticas para destacar sua marca nos motores de busca.',
  },
  {
    icon: Zap,
    title: 'Alta Performance',
    description: 'Código otimizado para um carregamento instantâneo, elevando a experiência do usuário.',
  },
  {
    icon: Shield,
    title: 'Segurança Robusta',
    description: 'Implementação de protocolos de segurança avançados e criptografia de dados.',
  },
  {
    icon: Headphones,
    title: 'Suporte Dedicado',
    description: 'Acompanhamento pós-projeto e parceria contínua para escalar seus resultados.',
  },
];

export default function DifferentialsSection() {
  return (
    <section className="py-24 bg-[#000B1A] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-4 animate-fade-in-up">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/20 mb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Vantagem Competitiva</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Por que a <span className="gradient-text">LM Tech</span>?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Nossos diferenciais são construídos com foco em entregar o mais alto padrão de qualidade e resultado.
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {differentials.map((differential, index) => {
            const Icon = differential.icon;
            return (
              <div
                key={index}
                className="glass-card p-4 md:p-8 group border-white/5 hover:border-primary/30 transition-all duration-500"
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
                <h3 className="text-sm md:text-xl font-bold text-white mb-2 md:mb-4 group-hover:text-primary transition-colors tracking-tight">{differential.title}</h3>
                <p className="text-slate-400 text-[10px] md:text-sm leading-relaxed font-light">{differential.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
