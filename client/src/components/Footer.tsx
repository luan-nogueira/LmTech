import { Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#000B1A] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#001533] to-[#001B3D] border border-white/10 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg tracking-tighter">LM</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-lg leading-none tracking-tight">LM TECH</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Soluções digitais inovadoras para empresas que buscam excelência e crescimento sustentável através da tecnologia.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-6">Links Rápidos</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-light">
              <li><a href="#servicos" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/50"></span>Serviços</a></li>
              <li><a href="#sobre" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/50"></span>Sobre</a></li>

              <li><a href="#contato" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/50"></span>Contato</a></li>
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-6">Soluções</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-light">
              <li><a href="#servicos" className="hover:text-primary transition-colors">Sites Profissionais</a></li>
              <li><a href="#servicos" className="hover:text-primary transition-colors">Sistemas Sob Medida</a></li>
              <li><a href="#servicos" className="hover:text-primary transition-colors">Dashboards de Gestão</a></li>
              <li><a href="#servicos" className="hover:text-primary transition-colors">Automações</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-6">Fale Conosco</h4>
            <div className="space-y-4">
              <a href="tel:22999032342" className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors text-sm font-light">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Phone size={14} /></div>
                (22) 99903-2342
              </a>
              <a href="mailto:contato@lmtech.com.br" className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors text-sm font-light">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Mail size={14} /></div>
                contato@lmtech.com.br
              </a>
              <a href="https://instagram.com/lmtech_br" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors text-sm font-light">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Instagram size={14} /></div>
                @lmtech_br
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-light">
          <p>&copy; 2026 LM Tech. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors uppercase tracking-widest text-[9px] font-bold">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors uppercase tracking-widest text-[9px] font-bold">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
