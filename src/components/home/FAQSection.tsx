'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Quanto tempo leva para o meu site ou sistema ficar pronto?',
      a: 'O prazo varia conforme a complexidade. Landing pages costumam ser entregues entre 5 a 10 dias úteis. Sites institucionais completos levam em média de 10 a 18 dias, enquanto sistemas e dashboards sob medida levam de 20 a 40 dias. Todos os prazos são acordados previamente em cronograma.',
    },
    {
      q: 'Como funciona o pagamento e as mensalidades?',
      a: 'Geralmente trabalhamos com 50% de entrada no início do projeto e o saldo na entrega, ou parcelamento facilitado. Além do desenvolvimento, oferecemos planos acessíveis de mensalidade para cobrir hospedagem de alta performance, backups diários, suporte prioritário e atualizações contínuas.',
    },
    {
      q: 'O site será meu ou fico preso à agência?',
      a: 'O projeto e o código-fonte são 100% seus! Registramos o domínio no seu nome/CPF/CNPJ e entregamos todos os acessos do ambiente. Você tem total liberdade e soberania sobre o seu patrimônio digital.',
    },
    {
      q: 'O site funciona perfeitamente no celular?',
      a: 'Sim, absolutamente! Adotamos a metodologia Mobile-First. Seu site é otimizado para carregar de forma instantânea em smartphones Android, iPhones, tablets e desktops de qualquer resolução.',
    },
    {
      q: 'Vocês realizam alterações e manutenções após o site ir para o ar?',
      a: 'Com certeza. Oferecemos suporte completo para eventuais ajustes, inclusão de novos produtos/serviços, banners promocionais e relatórios de métricas. Seu negócio nunca fica desamparado.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 relative bg-[#090d16] border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tire Suas Dúvidas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Perguntas Frequentes
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Respostas claras para as dúvidas mais comuns antes de começar seu projeto.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-cyan-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-cyan-300' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
