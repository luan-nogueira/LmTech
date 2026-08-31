'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, adminConfig } = useClientStore();

  const [email, setEmail] = useState('luanmnogueira@gmail.com');
  const [password, setPassword] = useState('LnKo2025@');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const success = login(email, password);
    if (success) {
      router.push('/admin');
    } else {
      setErrorMsg('E-mail ou senha incorretos. Verifique suas credenciais.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      
      {/* Glow Backdrops */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-cyan-500/10 blur-[90px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10 space-y-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-xl shadow-blue-600/30">
              <div className="w-full h-full bg-[#07090e] rounded-[15px] flex items-center justify-center font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                LM
              </div>
            </div>
          </Link>

          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Painel Administrativo</h1>
            <p className="text-xs text-slate-400 mt-1">
              Gestão de Clientes, Contratos e Mensalidades da LM Tech
            </p>
          </div>
        </div>

        {/* Login Box */}
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-blue-500/30 shadow-2xl shadow-blue-950/60 backdrop-blur-xl space-y-6">
          
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Acesso Restrito ao Gestor</span>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">E-mail do Administrador</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="luanmnogueira@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Senha Master</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl glass-input text-xs sm:text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Autenticando...' : 'Entrar no Painel'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              ← Voltar ao site público da LM Tech
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
