import { Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">LM</span>
              </div>
              <span className="text-white font-bold text-xl">LM Tech</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Soluções digitais inovadoras para empresas que desejam crescer com tecnologia.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#servicos" className="hover:text-primary transition-colors">Serviços</a></li>
              <li><a href="#sobre" className="hover:text-primary transition-colors">Sobre</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition-colors">Portfólio</a></li>
              <li><a href="#contato" className="hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="text-white font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Sites Profissionais</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sistemas Sob Medida</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Dashboards</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Aplicativos</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <a href="tel:22999032342" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Phone size={16} />
                (22) 99903-2342
              </a>
              <a href="mailto:contato@lmtech.com.br" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Mail size={16} />
                contato@lmtech.com.br
              </a>
              <a href="https://instagram.com/lmtech_br" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Instagram size={16} />
                @lmtech_br
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; 2026 LM Tech — Soluções Digitais. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Termos</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
