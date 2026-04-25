import { CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-card relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Sobre a <span className="gradient-text">LM Tech</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              A LM Tech nasceu para trazer inovação, autonomia e praticidade através da tecnologia, criando soluções personalizadas para cada negócio. Nosso time é formado por profissionais apaixonados por desenvolvimento, design e inovação digital.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Com mais de 5 anos de experiência, ajudamos empresas de todos os tamanhos a transformar seus processos e alcançar seus objetivos através de tecnologia de ponta.
            </p>

            {/* Values */}
            <div className="space-y-3 pt-4">
              {['Inovação constante', 'Qualidade premium', 'Suporte dedicado', 'Resultados mensuráveis'].map((value, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                  <span className="text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { number: '+50', label: 'Projetos Entregues', icon: '🚀' },
              { number: '+30', label: 'Clientes Atendidos', icon: '👥' },
              { number: '99%', label: 'Taxa de Satisfação', icon: '⭐' },
              { number: '5+', label: 'Anos de Experiência', icon: '📅' },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-card p-6 text-center space-y-3 hover:border-primary/50 transition-colors"
              >
                <div className="text-4xl">{stat.icon}</div>
                <p className="text-3xl font-bold gradient-text">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
