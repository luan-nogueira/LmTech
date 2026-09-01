import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Client, AdminConfig, LeadEstimate, MonthlyPaymentRecord } from '@/types/client';

const INITIAL_ADMIN_CONFIG: AdminConfig = {
  adminEmail: 'luanmnogueira@gmail.com',
  adminPassword: 'LnKo2025@',
  pixKey: 'luanmnogueira@gmail.com',
  pixKeyType: 'email',
  pixName: 'Luan Nogueira / LM Tech Soluções',
  pixCity: 'Cabo Frio - RJ',
  companyPhone: '(22) 99903-2342',
  companyEmail: 'contato@lmtech.com.br',
  instagram: '@lmtech_br',
};

const INITIAL_CLIENTS: Client[] = [
  {
    id: 'client-1',
    name: 'Carlos Medeiros',
    companyName: 'Mega Gym Fitness Club',
    phone: '(22) 99888-1122',
    email: 'contato@megagym.com.br',
    document: '12.345.678/0001-90',
    projectTitle: 'Mega Gym — Plataforma Digital & Gestão de Treinos',
    projectType: 'system',
    projectDescription: 'Ecossistema completo com landing page de alta conversão, planos de matrícula online, catálogo de treinos e integração com WhatsApp.',
    projectUrl: 'https://mgfmegagym.vercel.app/',
    showInPortfolio: true,
    portfolioCategory: 'Sistemas Web',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel', 'Automação'],
    metricsHighlight: '+210% Matrículas Online',
    status: 'delivered',
    startDate: '2026-01-15',
    deliveryDate: '2026-02-10',
    projectValue: 3500,
    initialDeposit: 1750,
    installmentsRemaining: 0,
    hasMonthlyFee: true,
    monthlyFeeValue: 180,
    monthlyFeeDueDay: 10,
    monthlyPayments: {
      '2026-08': { status: 'paid', paidAt: '2026-08-10' },
      '2026-09': { status: 'pending' },
    },
    notes: 'Cliente super satisfeito. Manutenção de hospedagem + suporte prioritário.',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-08-10T14:30:00Z',
  },
  {
    id: 'client-2',
    name: 'Marcos Barra',
    companyName: 'TransBarra Soluções em Transporte',
    phone: '(22) 99777-3344',
    email: 'diretoria@transbarra.com.br',
    document: '98.765.432/0001-10',
    projectTitle: 'TransBarra Web — Sistema de Gestão Financeira & Frota',
    projectType: 'dashboard',
    projectDescription: 'Painel corporativo completo para controle de frotas, ordens de serviço, contas a pagar/receber e relatórios executivos em tempo real.',
    projectUrl: 'https://transbarra.vercel.app/',
    showInPortfolio: true,
    portfolioCategory: 'Dashboards & SaaS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    tags: ['React', 'Dashboard BI', 'Relatórios PDF', 'Tailwind', 'Cloud'],
    metricsHighlight: '100% Processos Digitalizados',
    status: 'delivered',
    startDate: '2026-03-01',
    deliveryDate: '2026-04-15',
    projectValue: 5800,
    initialDeposit: 2900,
    installmentsRemaining: 0,
    hasMonthlyFee: true,
    monthlyFeeValue: 350,
    monthlyFeeDueDay: 5,
    monthlyPayments: {
      '2026-08': { status: 'paid', paidAt: '2026-08-05' },
      '2026-09': { status: 'pending' },
    },
    notes: 'Plano com suporte mensal e backup em nuvem diário.',
    createdAt: '2026-03-01T08:00:00Z',
    updatedAt: '2026-08-05T11:00:00Z',
  },
  {
    id: 'client-3',
    name: 'Juliana Alencar',
    companyName: 'Nexus Imóveis Premium',
    phone: '(21) 98888-5566',
    email: 'contato@nexusimoveis.com.br',
    document: '45.123.890/0001-55',
    projectTitle: 'Nexus Imóveis — Portal de Lançamentos de Alto Padrão',
    projectType: 'website',
    projectDescription: 'Portal imobiliário ultra-veloz com busca por filtros dinâmicos, mapa interativo, tour virtual e integração de leads com CRM via WhatsApp.',
    projectUrl: 'https://nexus-imoveis-demo.vercel.app',
    showInPortfolio: true,
    portfolioCategory: 'Landing Pages',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'SEO Avançado', 'Framer Motion', 'WhatsApp CRM'],
    metricsHighlight: '100/100 Google PageSpeed',
    status: 'delivered',
    startDate: '2026-05-10',
    deliveryDate: '2026-06-05',
    projectValue: 4200,
    initialDeposit: 2100,
    installmentsRemaining: 0,
    hasMonthlyFee: true,
    monthlyFeeValue: 220,
    monthlyFeeDueDay: 15,
    monthlyPayments: {
      '2026-08': { status: 'paid', paidAt: '2026-08-14' },
      '2026-09': { status: 'pending' },
    },
    notes: 'Hospedagem de alta performance e otimização SEO contínua.',
    createdAt: '2026-05-10T14:00:00Z',
    updatedAt: '2026-08-14T09:15:00Z',
  },
  {
    id: 'client-4',
    name: 'Dr. Roberto Silveira',
    companyName: 'Silveira Odontologia Estética',
    phone: '(22) 99123-4567',
    email: 'roberto@silveiraodonto.com.br',
    projectTitle: 'Silveira Odonto — Agendamento & Presença Digital',
    projectType: 'landing_page',
    projectDescription: 'Landing page premium para clínica odontológica com agendamento direto pelo WhatsApp, depoimentos em vídeo e apresentação de tratamentos.',
    projectUrl: 'https://silveiraodonto.vercel.app',
    showInPortfolio: true,
    portfolioCategory: 'Landing Pages',
    thumbnailUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'UI/UX Premium', 'SEO Local', 'WhatsApp'],
    metricsHighlight: '+140% Pacientes Novos',
    status: 'delivered',
    startDate: '2026-06-12',
    deliveryDate: '2026-07-02',
    projectValue: 2800,
    hasMonthlyFee: true,
    monthlyFeeValue: 150,
    monthlyFeeDueDay: 20,
    monthlyPayments: {
      '2026-08': { status: 'paid', paidAt: '2026-08-19' },
      '2026-09': { status: 'pending' },
    },
    createdAt: '2026-06-12T11:00:00Z',
    updatedAt: '2026-08-19T16:00:00Z',
  }
];

const INITIAL_LEADS: LeadEstimate[] = [
  {
    id: 'lead-1',
    name: 'Rodrigo Fontes',
    phone: '(22) 99222-7788',
    company: 'Fontes Advocacia',
    serviceType: 'Site Institucional com Área do Cliente',
    features: ['Área de Login', 'WhatsApp Integrado', 'SEO Avançado'],
    deadline: 'Normal (15 a 20 dias)',
    estimatedPriceMin: 2800,
    estimatedPriceMax: 3600,
    estimatedTime: '15-20 dias',
    message: 'Gostaria de reformular nosso site jurídico para passar mais credibilidade.',
    createdAt: '2026-08-30T16:45:00Z',
    status: 'new',
  }
];

interface ClientStoreState {
  clients: Client[];
  leads: LeadEstimate[];
  adminConfig: AdminConfig;
  isAuthenticated: boolean;
  activeAdminTab: 'dashboard' | 'clients' | 'subscriptions' | 'receipts' | 'leads' | 'settings';
  
  // Auth actions
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  setActiveAdminTab: (tab: 'dashboard' | 'clients' | 'subscriptions' | 'receipts' | 'leads' | 'settings') => void;
  updateAdminConfig: (newConfig: Partial<AdminConfig>) => void;
  
  // Client actions
  addClient: (clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt' | 'monthlyPayments'>) => Client;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  togglePortfolioVisibility: (id: string) => void;
  
  // Subscription / Monthly Payment actions
  setMonthlyPaymentStatus: (
    clientId: string, 
    yearMonth: string, 
    status: 'paid' | 'pending' | 'overdue', 
    notes?: string
  ) => void;
  
  // Lead actions
  addLead: (leadData: Omit<LeadEstimate, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: LeadEstimate['status']) => void;
  deleteLead: (id: string) => void;
  
  // Data actions
  resetToDefaults: () => void;
  importBackup: (backupData: { clients: Client[]; leads?: LeadEstimate[]; adminConfig?: Partial<AdminConfig> }) => void;
}

export const useClientStore = create<ClientStoreState>()(
  persist(
    (set, get) => ({
      clients: INITIAL_CLIENTS,
      leads: INITIAL_LEADS,
      adminConfig: INITIAL_ADMIN_CONFIG,
      isAuthenticated: false,
      activeAdminTab: 'dashboard',

      login: (email: string, pass: string) => {
        const { adminConfig } = get();
        const trimmedEmail = email.trim().toLowerCase();
        const configEmail = adminConfig.adminEmail.trim().toLowerCase();
        
        if (trimmedEmail === configEmail && pass === adminConfig.adminPassword) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false });
      },

      setActiveAdminTab: (tab) => {
        set({ activeAdminTab: tab });
      },

      updateAdminConfig: (newConfig) => {
        set((state) => ({
          adminConfig: { ...state.adminConfig, ...newConfig }
        }));
      },

      addClient: (clientData) => {
        const now = new Date().toISOString();
        const newClient: Client = {
          ...clientData,
          id: `client-${Date.now()}`,
          monthlyPayments: {},
          createdAt: now,
          updatedAt: now,
        };

        // Initialize current month payment if has monthly fee
        if (newClient.hasMonthlyFee) {
          const currentYearMonth = now.slice(0, 7); // "YYYY-MM"
          newClient.monthlyPayments[currentYearMonth] = {
            status: 'pending'
          };
        }

        set((state) => ({
          clients: [newClient, ...state.clients],
        }));

        return newClient;
      },

      updateClient: (id, updates) => {
        set((state) => ({
          clients: state.clients.map((c) =>
            c.id === id
              ? {
                  ...c,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : c
          ),
        }));
      },

      deleteClient: (id) => {
        set((state) => ({
          clients: state.clients.filter((c) => c.id !== id),
        }));
      },

      togglePortfolioVisibility: (id) => {
        set((state) => ({
          clients: state.clients.map((c) =>
            c.id === id
              ? {
                  ...c,
                  showInPortfolio: !c.showInPortfolio,
                  updatedAt: new Date().toISOString(),
                }
              : c
          ),
        }));
      },

      setMonthlyPaymentStatus: (clientId, yearMonth, status, notes) => {
        set((state) => ({
          clients: state.clients.map((c) => {
            if (c.id !== clientId) return c;
            const currentPayments = { ...c.monthlyPayments };
            const existing = currentPayments[yearMonth] || {};
            
            currentPayments[yearMonth] = {
              ...existing,
              status,
              paidAt: status === 'paid' ? new Date().toISOString().slice(0, 10) : undefined,
              notes: notes !== undefined ? notes : existing.notes,
            };

            return {
              ...c,
              monthlyPayments: currentPayments,
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      addLead: (leadData) => {
        const newLead: LeadEstimate = {
          ...leadData,
          id: `lead-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: 'new',
        };
        set((state) => ({
          leads: [newLead, ...state.leads],
        }));
      },

      updateLeadStatus: (id, status) => {
        set((state) => ({
          leads: state.leads.map((l) => (l.id === id ? { ...l, status } : l)),
        }));
      },

      deleteLead: (id) => {
        set((state) => ({
          leads: state.leads.filter((l) => l.id !== id),
        }));
      },

      resetToDefaults: () => {
        set({
          clients: INITIAL_CLIENTS,
          leads: INITIAL_LEADS,
          adminConfig: INITIAL_ADMIN_CONFIG,
        });
      },

      importBackup: (backupData) => {
        set((state) => ({
          clients: backupData.clients || state.clients,
          leads: backupData.leads || state.leads,
          adminConfig: backupData.adminConfig
            ? { ...state.adminConfig, ...backupData.adminConfig }
            : state.adminConfig,
        }));
      },
    }),
    {
      name: 'lmtech_client_database_v2',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' && window.localStorage
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
    }
  )
);

