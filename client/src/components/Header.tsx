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
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">LM</span>
          </div>
          <span className="text-white font-bold text-xl hidden sm:inline">LM Tech</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('servicos')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Serviços
          </button>
          <button
            onClick={() => scrollToSection('sobre')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Sobre
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Portfólio
          </button>
          <button
            onClick={() => scrollToSection('contato')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Contato
          </button>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => scrollToSection('contato')}
            className="btn-neon text-sm"
          >
            Solicitar Orçamento
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('servicos')}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              Portfólio
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              Contato
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="btn-neon text-sm w-full"
            >
              Solicitar Orçamento
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
