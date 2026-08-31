'use client';

import Link from 'next/link';
import { ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';

export function Footer() {
  const { adminConfig } = useClientStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070b] border-t border-white/10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#07090e] rounded-[11px] flex items-center justify-center font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  LM
                </div>
              </div>
              <span className="font-extrabold tracking-tight text-lg text-white">
                LM TECH <span className="text-cyan-400">INOVAÇÃO</span>
              </span>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Desenvolvimento de sites de alta performance, sistemas corporativos sob medida, dashboards em tempo real e automações digitais que impulsionam resultados empresariais.
            </p>

            <div className="pt-2 text-slate-500 text-[11px]">
              Rio de Janeiro • Atendimento em todo o Brasil
            </div>
          </div>

          {/* Col 3: Navegação Rápida */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Navegação</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">Início</a></li>
              <li><a href="#servicos" className="hover:text-cyan-400 transition-colors">Serviços</a></li>
              <li><a href="#portfolio" className="hover:text-cyan-400 transition-colors">Portfólio Vivo</a></li>
              <li><a href="#calculadora" className="hover:text-cyan-400 transition-colors">Simulador de Projeto</a></li>
              <li><a href="#metodologia" className="hover:text-cyan-400 transition-colors">Como Trabalhamos</a></li>
              <li><a href="#depoimentos" className="hover:text-cyan-400 transition-colors">Depoimentos</a></li>
            </ul>
          </div>

          {/* Col 4: Soluções */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Soluções</h4>
            <ul className="space-y-2">
              <li><span className="text-slate-400">Sites Institucionais</span></li>
              <li><span className="text-slate-400">Sistemas Web Sob Medida</span></li>
              <li><span className="text-slate-400">Dashboards & Relatórios BI</span></li>
              <li><span className="text-slate-400">Landing Pages de Conversão</span></li>
              <li><span className="text-slate-400">Automação de Processos</span></li>
              <li><span className="text-slate-400">E-commerce Personalizado</span></li>
            </ul>
          </div>

          {/* Col 5: Contato & Acesso Restrito */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Canais Diretos</h4>
            <ul className="space-y-2">
              <li>
                <a href={`tel:${adminConfig.companyPhone.replace(/\D/g, '')}`} className="hover:text-cyan-400 transition-colors">
                  {adminConfig.companyPhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${adminConfig.companyEmail}`} className="hover:text-cyan-400 transition-colors">
                  {adminConfig.companyEmail}
                </a>
              </li>
              <li>
                <a href={`https://instagram.com/${adminConfig.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  {adminConfig.instagram}
                </a>
              </li>
            </ul>

            <div className="pt-4">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-[11px] font-semibold"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Painel Administrativo</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} LM Tech — Soluções Digitais. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-6">
            <span>Desenvolvido com excelência técnica</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
