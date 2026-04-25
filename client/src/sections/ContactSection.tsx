import { useState } from 'react';
import { Mail, Phone, MessageSquare, Send } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construir mensagem para WhatsApp
    const whatsappMessage = `Olá, vim pelo site da LM Tech e gostaria de um orçamento.\n\nDados:\nNome: ${formData.name}\nEmpresa: ${formData.company}\nTelefone: ${formData.phone}\nServiço: ${formData.service}\nMensagem: ${formData.message}`;

    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/5522999032342?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Limpar formulário
    setFormData({ name: '', company: '', phone: '', service: '', message: '' });
  };

  return (
    <section id="contato" className="py-20 bg-card relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Entre em <span className="gradient-text">contato</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Pronto para transformar sua ideia em realidade? Fale com nosso time e descubra como podemos ajudar seu negócio.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Telefone / WhatsApp</h3>
                  <a href="tel:22999032342" className="text-muted-foreground hover:text-primary transition-colors">
                    (22) 99903-2342
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <a href="mailto:contato@lmtech.com.br" className="text-muted-foreground hover:text-primary transition-colors">
                    contato@lmtech.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Redes Sociais</h3>
                  <a href="https://instagram.com/lmtech_br" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    @lmtech_br
                  </a>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="glass-card p-4 border-l-2 border-primary">
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-semibold">Tempo de resposta:</span> Respondemos em até 2 horas durante o horário comercial.
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Nome *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors text-white placeholder-muted-foreground"
                  placeholder="Seu nome completo"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Empresa *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors text-white placeholder-muted-foreground"
                  placeholder="Nome da sua empresa"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Telefone / WhatsApp *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors text-white placeholder-muted-foreground"
                  placeholder="(XX) XXXXX-XXXX"
                />
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Serviço Desejado *</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors text-white"
                >
                  <option value="">Selecione um serviço</option>
                  <option value="Site Profissional">Site Profissional</option>
                  <option value="Sistema Sob Medida">Sistema Sob Medida</option>
                  <option value="Dashboard">Dashboard</option>
                  <option value="Automação">Automação</option>
                  <option value="Aplicativo">Aplicativo</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Mensagem *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors text-white placeholder-muted-foreground resize-none"
                  placeholder="Conte-nos sobre seu projeto..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-neon flex items-center justify-center gap-2 group mt-6"
              >
                Enviar via WhatsApp
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Ao enviar, você será redirecionado para o WhatsApp com a mensagem pré-preenchida.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
