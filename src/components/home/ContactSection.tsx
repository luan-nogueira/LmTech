'use client';

import { useState } from 'react';
import { Phone, Mail, Send, MapPin, Sparkles, MessageSquare } from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function ContactSection() {
  const { adminConfig, addLead } = useClientStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('Sites & Portais');
  const [message, setMessage] = useState('');

  const phoneClean = adminConfig.companyPhone.replace(/\D/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      alert('Por favor preencha seu Nome e WhatsApp.');
      return;
    }

    addLead({
      name,
      phone,
      company: company || undefined,
      serviceType: service,
      features: ['Formulário de Contato Direto'],
      deadline: 'A definir',
      estimatedPriceMin: 0,
      estimatedPriceMax: 0,
      estimatedTime: 'Sob consulta',
      message: message || undefined,
    });

    const msg = `*NOVO CONTATO VIA SITE — LM TECH*\n\n` +
      `👤 *Nome:* ${name}\n` +
      `🏢 *Empresa:* ${company || 'Não informada'}\n` +
      `📱 *WhatsApp:* ${phone}\n` +
      `✉️ *E-mail:* ${email || 'Não informado'}\n` +
      `🎯 *Serviço de Interesse:* ${service}\n` +
      (message ? `\n📝 *Mensagem:* ${message}\n` : '') +
      `\nOlá Luan! Aguardo seu retorno para batermos um papo!`;

    window.open(`https://wa.me/55${phoneClean}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="contato" className="py-24 relative bg-[#07090e] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Direct Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vamos Criar Algo Incrível?</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Pronto para Elevar o Patamar do seu{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300">
                  Negócio?
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Fale diretamente com quem vai desenhar e programar o seu projeto. Sem enrolação, com transparência e foco em gerar receita.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-4">
              
              {/* WhatsApp / Phone */}
              <a
                href={`https://wa.me/55${phoneClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-900/80 hover:bg-blue-950/40 border border-white/10 hover:border-blue-500/40 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">WhatsApp Direto</div>
                  <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {adminConfig.companyPhone}
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${adminConfig.companyEmail}`}
                className="p-4 rounded-2xl bg-slate-900/80 hover:bg-blue-950/40 border border-white/10 hover:border-blue-500/40 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">E-mail Comercial</div>
                  <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {adminConfig.companyEmail}
                  </div>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={`https://instagram.com/${adminConfig.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-900/80 hover:bg-blue-950/40 border border-white/10 hover:border-blue-500/40 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Instagram Oficial</div>
                  <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {adminConfig.instagram}
                  </div>
                </div>
              </a>

            </div>

          </div>

          {/* Right Column: Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Envie uma Mensagem</h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Preencha o formulário para receber uma proposta personalizada rapidamente.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Seu Nome *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João da Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm placeholder-slate-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(22) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm placeholder-slate-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Empresa / Negócio</label>
                    <input
                      type="text"
                      placeholder="Nome da sua empresa"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm placeholder-slate-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Serviço de Interesse</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm bg-slate-900 text-slate-200"
                    >
                      <option value="Sites & Portais Profissionais">Sites & Portais Profissionais</option>
                      <option value="Sistemas Web Sob Medida">Sistemas Web Sob Medida</option>
                      <option value="Dashboards & BI">Dashboards & BI</option>
                      <option value="Landing Pages de Conversão">Landing Pages de Conversão</option>
                      <option value="E-commerce & Catálogo">E-commerce & Catálogo</option>
                      <option value="Automação & APIs">Automação & APIs</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Mensagem / Ideia do Projeto</label>
                  <textarea
                    rows={4}
                    placeholder="Conte brevemente o que você precisa ou quais são os objetivos do seu negócio..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm placeholder-slate-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensagem para o WhatsApp</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
