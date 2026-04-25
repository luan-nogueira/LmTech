import { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, ArrowRight } from 'lucide-react';

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
    <section id="contato" className="py-24 bg-[#000B1A] relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-float"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1.5s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left - Info */}
          <div className="space-y-12">
            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/20">
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Contato Direto</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Vamos Criar Algo <span className="gradient-text">Extraordinário?</span>
              </h2>
              <p className="text-lg text-slate-400 font-light max-w-lg leading-relaxed">
                Pronto para elevar o patamar do seu negócio? Fale com nossos especialistas e descubra o poder da tecnologia personalizada.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                  <Phone size={24} className="text-primary group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-white text-xs uppercase tracking-widest font-bold mb-1 opacity-60">WhatsApp</h3>
                  <a href="tel:22999032342" className="text-xl text-white font-medium hover:text-primary transition-colors">
                    (22) 99903-2342
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                  <Mail size={24} className="text-primary group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-white text-xs uppercase tracking-widest font-bold mb-1 opacity-60">Email Oficial</h3>
                  <a href="mailto:contato@lmtech.com.br" className="text-xl text-white font-medium hover:text-primary transition-colors">
                    contato@lmtech.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                  <MessageSquare size={24} className="text-primary group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-white text-xs uppercase tracking-widest font-bold mb-1 opacity-60">Instagram</h3>
                  <a href="https://instagram.com/lmtech_br" target="_blank" rel="noopener noreferrer" className="text-xl text-white font-medium hover:text-primary transition-colors">
                    @lmtech_br
                  </a>
                </div>
              </div>
            </div>

            {/* Response Time Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#001533] border border-primary/20 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-xs text-slate-300 font-medium">
                <span className="text-white">Online:</span> Respondemos em até 2 horas.
              </p>
            </div>
          </div>

          {/* Right - Sophisticated Form */}
          <div className="glass-card p-10 relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">Nome Completo</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:bg-white/[0.08] focus:outline-none transition-all text-white placeholder-slate-600 font-light"
                    placeholder="Seu nome"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">Empresa</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:bg-white/[0.08] focus:outline-none transition-all text-white placeholder-slate-600 font-light"
                    placeholder="Sua empresa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:bg-white/[0.08] focus:outline-none transition-all text-white placeholder-slate-600 font-light"
                    placeholder="(XX) XXXXX-XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">Serviço</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-[#001533] border border-white/10 focus:border-primary/50 focus:outline-none transition-all text-white font-light cursor-pointer appearance-none"
                  >
                    <option value="">Selecione...</option>
                    <option value="Site Profissional">Site Profissional</option>
                    <option value="Sistema Sob Medida">Sistema Sob Medida</option>
                    <option value="Dashboard">Dashboard</option>
                    <option value="Automação">Automação</option>
                    <option value="Aplicativo">Aplicativo</option>
                    <option value="Landing Page">Landing Page</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">Mensagem</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:bg-white/[0.08] focus:outline-none transition-all text-white placeholder-slate-600 font-light resize-none"
                  placeholder="Conte-nos sobre seu projeto..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-premium flex items-center justify-center gap-3 group"
              >
                Solicitar via WhatsApp
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
