import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'João Silva',
    company: 'Tech Solutions Brasil',
    text: 'A LM Tech transformou nossa presença digital. O site ficou incrível e as vendas aumentaram 40% em 3 meses.',
    rating: 5,
    avatar: '👨‍💼',
  },
  {
    name: 'Maria Santos',
    company: 'E-commerce Plus',
    text: 'Profissionalismo, qualidade e comprometimento. A equipe entregou exatamente o que prometeu, no prazo.',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    name: 'Carlos Oliveira',
    company: 'Consultoria Digital',
    text: 'O dashboard desenvolvido pela LM Tech revolucionou nossa análise de dados. Recomendo para todos!',
    rating: 5,
    avatar: '👨‍💻',
  },
  {
    name: 'Ana Costa',
    company: 'Startup Inovadora',
    text: 'Equipe atenciosa, criativa e com excelente conhecimento técnico. Parceria que recomendo muito.',
    rating: 5,
    avatar: '👩‍💻',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            O que nossos <span className="gradient-text">clientes</span> dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Histórias de sucesso e satisfação de empresas que confiaram em nosso trabalho.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-6 space-y-4"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground italic">"{testimonial.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
