export type ProjectType = 
  | 'landing_page' 
  | 'website' 
  | 'system' 
  | 'dashboard' 
  | 'ecommerce' 
  | 'app' 
  | 'automation';

export type PortfolioCategory = 
  | 'Sistemas Web' 
  | 'E-commerce' 
  | 'Landing Pages' 
  | 'Dashboards & SaaS' 
  | 'Aplicativos';

export type ProjectStatus = 
  | 'lead' 
  | 'in_progress' 
  | 'review' 
  | 'delivered' 
  | 'maintenance';

export type PaymentStatus = 'paid' | 'pending' | 'overdue';

export interface MonthlyPaymentRecord {
  status: PaymentStatus;
  paidAt?: string;
  receiptId?: string;
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  companyName: string;
  phone: string;
  email: string;
  document?: string; // CPF or CNPJ
  projectTitle: string;
  projectType: ProjectType;
  projectDescription: string;
  projectUrl: string; // Live site URL
  showInPortfolio: boolean;
  portfolioCategory: PortfolioCategory;
  thumbnailUrl: string;
  tags: string[];
  metricsHighlight?: string; // e.g. "+250% Leads", "100/100 PageSpeed"
  status: ProjectStatus;
  startDate: string;
  deliveryDate?: string;
  projectValue: number; // Development cost
  initialDeposit?: number;
  installmentsRemaining?: number;
  hasMonthlyFee: boolean;
  monthlyFeeValue: number;
  monthlyFeeDueDay: number; // 1 - 31
  monthlyPayments: Record<string, MonthlyPaymentRecord>; // "YYYY-MM" -> record
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadEstimate {
  id: string;
  name: string;
  phone: string;
  company?: string;
  serviceType: string;
  features: string[];
  deadline: string;
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  estimatedTime: string;
  message?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'converted' | 'archived';
}

export interface AdminConfig {
  adminEmail: string;
  adminPassword: string;
  pixKey: string;
  pixKeyType: 'email' | 'phone' | 'cpf' | 'cnpj' | 'random';
  pixName: string;
  pixCity: string;
  companyPhone: string;
  companyEmail: string;
  instagram: string;
}

export interface ReceiptData {
  id: string;
  receiptNumber: string;
  clientName: string;
  companyName: string;
  document?: string;
  amount: number;
  amountInWords?: string;
  serviceDescription: string;
  referenceMonthYear?: string;
  paymentDate: string;
  paymentMethod: string;
  emitterName: string;
  emitterDocument: string;
  emitterPhone: string;
  emitterEmail: string;
}
