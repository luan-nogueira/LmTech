import { Zap, Shield, TrendingUp, Headphones, Rocket, Lock } from 'lucide-react';

const differentials = [
  {
    icon: Zap,
    title: 'Atendimento Rápido',
    description: 'Resposta ágil às suas demandas e suporte prioritário em projetos.',
  },
  {
    icon: Rocket,
    title: 'Design Moderno',
    description: 'Interfaces atualizadas, intuitivas e alinhadas com as tendências de mercado.',
  },
  {
    icon: TrendingUp,
    title: 'SEO Otimizado',
    description: 'Todos os projetos são desenvolvidos com as melhores práticas de SEO.',
  },
  {
    icon: Zap,
    title: 'Performance Alta',
    description: 'Velocidade de carregamento otimizada para melhor experiência do usuário.',
  },
  {
    icon: Shield,
    title: 'Segurança',
    description: 'Implementação de protocolos de segurança e criptografia de dados.',
  },
  {
    icon: Headphones,
    title: 'Suporte Contínuo',
    description: 'Acompanhamento pós-projeto e suporte técnico dedicado.',
  },
];

export default function DifferentialsSection() {
  return (
    <section className="py-20 bg-card relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Por que escolher a <span className="gradient-text">LM Tech</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Diferenciais que garantem qualidade, eficiência e resultados excepcionais em cada projeto.
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentials.map((differential, index) => {
            const Icon = differential.icon;
            return (
              <div
                key={index}
                className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={28} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">{differential.title}</h3>
                <p className="text-muted-foreground text-sm">{differential.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
