'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, Activity, Sparkles, Shield } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export function BottomNav() {
  const pathname = usePathname();
  const { user, userProfile } = useAuthStore();
  const isAdmin = user?.email === 'luanmnogueira@gmail.com';
  
  if (!user || !userProfile || pathname === '/login' || pathname === '/onboarding') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 w-full bg-[var(--color-surface)] border-t border-[var(--color-border)] pb-4 pt-3 px-6 flex justify-around items-center z-40 left-1/2 -translate-x-1/2 h-[72px] sm:max-w-3xl sm:rounded-t-3xl sm:shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <Link href="/" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}>
        <Home size={24} className={pathname === '/' ? 'animate-bounce' : ''} />
        <span className="text-[10px] font-medium">Diário</span>
      </Link>
      
      <Link href="/treinos" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/treinos' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}>
        <Dumbbell size={24} className={pathname === '/treinos' ? 'animate-bounce' : ''} />
        <span className="text-[10px] font-medium">Treinos</span>
      </Link>

      <Link href="/historico" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/historico' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}>
        <Activity size={24} className={pathname === '/historico' ? 'animate-bounce' : ''} />
        <span className="text-[10px] font-medium">Evolução</span>
      </Link>

      <Link href="/assistente" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/assistente' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}>
        <Sparkles size={24} className={pathname === '/assistente' ? 'animate-bounce' : ''} />
        <span className="text-[10px] font-medium">Nutri+</span>
      </Link>

      {isAdmin && (
        <Link href="/admin" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/admin' ? 'text-purple-500' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}>
          <Shield size={24} className={pathname === '/admin' ? 'animate-bounce text-purple-500' : ''} />
          <span className="text-[10px] font-medium">Admin</span>
        </Link>
      )}
    </nav>
  );
}
