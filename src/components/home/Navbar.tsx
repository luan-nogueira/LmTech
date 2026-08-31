'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Simulador', href: '#calculadora' },
    { label: 'Metodologia', href: '#metodologia' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090e]/85 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-blue-950/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-600/30 group-hover:shadow-blue-500/50 transition-all">
            <div className="w-full h-full bg-[#07090e] rounded-[11px] flex items-center justify-center font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              LM
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-lg text-white group-hover:text-blue-400 transition-colors">
                LM TECH
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                PRO
              </span>
            </div>
            <span className="text-[10px] tracking-wider text-slate-400 uppercase font-medium">
              Soluções Digitais
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-blue-500 after:to-cyan-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Admin Area Button */}
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 transition-all"
            title="Painel de Gestão e Clientes"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Área do Admin</span>
          </Link>

          {/* Primary Budget CTA */}
          <a
            href="#calculadora"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-600/25 hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>Simular Projeto</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-700/50"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1d]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-200 hover:text-cyan-400 py-2 border-b border-slate-800/60"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-slate-300 bg-slate-900 border border-slate-700/80"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Acessar Painel Admin</span>
            </Link>

            <a
              href="#calculadora"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-600/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simular Orçamento Online</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
