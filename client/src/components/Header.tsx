import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#000B1A]/70 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo - Sophisticated */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('inicio')}>
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:bg-primary/40 transition-colors"></div>
            <div className="relative w-12 h-12 bg-gradient-to-br from-[#001533] to-[#001B3D] border border-white/10 rounded-xl flex items-center justify-center group-hover:border-primary/50 transition-all duration-500">
              <span className="text-white font-black text-xl tracking-tighter">LM</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-extrabold text-xl leading-none tracking-tight">LM TECH</span>
            <span className="text-[9px] text-primary font-bold tracking-[0.3em] uppercase">Inovação</span>
          </div>
        </div>

        {/* Desktop Navigation - Clean & Sophisticated */}
        <nav className="hidden lg:flex items-center gap-10">
          {['Serviços', 'Sobre', 'Portfólio', 'Contato'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 hover:text-primary transition-all duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => scrollToSection('contato')}
            className="btn-premium !py-2.5 !px-6 !text-[10px]"
          >
            Orçamento
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center text-primary bg-primary/5 rounded-lg border border-primary/20"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="lg:hidden bg-[#000B1A] border-b border-white/5 animate-fade-in-up">
          <div className="container mx-auto px-6 py-10 flex flex-col gap-6">
            {['Serviços', 'Sobre', 'Portfólio', 'Contato'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-lg font-bold text-white hover:text-primary transition-colors text-left"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contato')}
              className="btn-premium text-sm w-full mt-4"
            >
              Solicitar Orçamento
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
