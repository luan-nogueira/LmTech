'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, CreditCard, MessageSquare, 
  Settings, ShieldCheck, Plus, Globe, Sparkles 
} from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { MetricsOverview } from '@/components/admin/MetricsOverview';
import { ClientsTable } from '@/components/admin/ClientsTable';
import { MonthlyBillingTable } from '@/components/admin/MonthlyBillingTable';
import { LeadsTable } from '@/components/admin/LeadsTable';
import { SettingsPanel } from '@/components/admin/SettingsPanel';

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated, activeAdminTab, setActiveAdminTab, leads, clients } = useClientStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-slate-400 text-sm">
        Carregando painel administrativo...
      </div>
    );
  }

  const currentMonthKey = new Date().toISOString().slice(0, 7);
  const pendingCount = clients.filter(
    (c) => c.hasMonthlyFee && c.monthlyPayments?.[currentMonthKey]?.status !== 'paid'
  ).length;

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  const tabs = [
    {
      id: 'dashboard',
      label: 'Visão Geral',
      icon: LayoutDashboard,
    },
    {
      id: 'clients',
      label: 'Clientes & Portfólio',
      icon: Users,
      badge: `${clients.length}`,
    },
    {
      id: 'subscriptions',
      label: 'Mensalidades & MRR',
      icon: CreditCard,
      badge: pendingCount > 0 ? `${pendingCount} a receber` : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    {
      id: 'leads',
      label: 'Leads & Orçamentos',
      icon: MessageSquare,
      badge: newLeadsCount > 0 ? `${newLeadsCount} novos` : undefined,
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f8fafc] flex flex-col">
      
      {/* Top Header */}
      <AdminHeader />

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs Pill */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                      tab.badgeColor || 'bg-blue-950 text-cyan-300 border-blue-400/40'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="animate-in fade-in duration-200">
          {activeAdminTab === 'dashboard' && (
            <div className="space-y-10">
              <MetricsOverview />
              <ClientsTable />
            </div>
          )}

          {activeAdminTab === 'clients' && <ClientsTable />}

          {activeAdminTab === 'subscriptions' && <MonthlyBillingTable />}

          {activeAdminTab === 'leads' && <LeadsTable />}

          {activeAdminTab === 'settings' && <SettingsPanel />}
        </div>

      </main>

    </div>
  );
}
