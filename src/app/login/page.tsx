'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-slate-400 text-sm">
      Redirecionando para o login do painel administrativo...
    </div>
  );
}
