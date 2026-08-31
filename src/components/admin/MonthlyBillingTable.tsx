'use client';

import { useState, useMemo } from 'react';
import { 
  Calendar, CheckCircle, Clock, AlertCircle, Phone, Send, 
  FileText, DollarSign, Filter, Search, ArrowRight 
} from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';
import { Client, PaymentStatus } from '@/types/client';
import { ReceiptModal } from './ReceiptModal';

export function MonthlyBillingTable() {
  const { clients, adminConfig, setMonthlyPaymentStatus } = useClientStore();

  const now = new Date();
  const defaultYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const [selectedMonth, setSelectedMonth] = useState<string>(defaultYearMonth);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');

  // Receipt Modal state
  const [receiptClient, setReceiptClient] = useState<Client | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Month options (past 3 months + next 2 months)
  const monthOptions = useMemo(() => {
    const list = [];
    for (let i = -3; i <= 2; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
      list.push({ ym, label: label.charAt(0).toUpperCase() + label.slice(1) });
    }
    return list;
  }, []);

  // Filter clients with monthly fee
  const subscriptionClients = useMemo(() => {
    return clients.filter((c) => {
      if (!c.hasMonthlyFee) return false;

      const record = c.monthlyPayments?.[selectedMonth];
      const status: PaymentStatus = record?.status || 'pending';

      const matchSearch =
        search === '' ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.companyName.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === 'Todos' || status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [clients, selectedMonth, search, statusFilter]);

  // Totals for this month
  const monthTotals = useMemo(() => {
    let expected = 0;
    let received = 0;
    let pending = 0;
    let paidCount = 0;

    clients.forEach((c) => {
      if (c.hasMonthlyFee) {
        expected += c.monthlyFeeValue || 0;
        const st = c.monthlyPayments?.[selectedMonth]?.status;
        if (st === 'paid') {
          received += c.monthlyFeeValue || 0;
          paidCount++;
        } else {
          pending += c.monthlyFeeValue || 0;
        }
      }
    });

    return { expected, received, pending, paidCount };
  }, [clients, selectedMonth]);

  const handleToggleStatus = (client: Client) => {
    const currentRecord = client.monthlyPayments?.[selectedMonth];
    const newStatus: PaymentStatus = currentRecord?.status === 'paid' ? 'pending' : 'paid';
    setMonthlyPaymentStatus(client.id, selectedMonth, newStatus);
  };

  const handleChargeWhatsApp = (client: Client) => {
    const cleanPhone = client.phone.replace(/\D/g, '');
    const [year, month] = selectedMonth.split('-');
    const monthName = new Date(Number(year), Number(month) - 1, 1).toLocaleDateString('pt-BR', {
      month: 'long',
    });

    const msg =
      `Olá ${client.name}! Tudo bem?\n\n` +
      `Aqui é o Luan da *LM Tech Soluções Digitais*.\n\n` +
      `Passando para lembrar que a mensalidade de hospedagem, segurança e suporte da *${client.companyName}* referente ao mês de *${monthName}/${year}* no valor de *R$ ${client.monthlyFeeValue.toFixed(2)}* vence no dia *${client.monthlyFeeDueDay}/${month}*.\n\n` +
      `🔑 *Chave Pix para Pagamento:* \`${adminConfig.pixKey}\`\n` +
      `👤 *Favorecido:* ${adminConfig.pixName}\n\n` +
      `Assim que efetuar o pagamento, basta enviar o comprovante por aqui para darmos baixa e emitirmos o seu recibo. Qualquer dúvida fico à disposição! 🚀`;

    window.open(`https://wa.me/55${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleOpenReceipt = (client: Client) => {
    setReceiptClient(client);
    setIsReceiptOpen(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Mensalidades & Cobranças Recorrentes</h2>
          <p className="text-xs text-slate-400">
            Controle os pagamentos de hospedagem e manutenção, envie cobranças formatadas no WhatsApp e emita recibos.
          </p>
        </div>

        {/* Month Selector */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 shadow-lg">
          <Calendar className="w-4 h-4 text-cyan-400 ml-2" />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-transparent text-xs sm:text-sm font-bold text-white pr-4 py-1.5 focus:outline-none cursor-pointer"
          >
            {monthOptions.map((opt) => (
              <option key={opt.ym} value={opt.ym} className="bg-slate-900 text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Month Summary KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-blue-400 uppercase">Previsão Mensal (Total)</span>
            <div className="text-xl font-extrabold text-white mt-1">
              R$ {monthTotals.expected.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <DollarSign className="w-8 h-8 text-blue-500/30" />
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase">Total Recebido</span>
            <div className="text-xl font-extrabold text-emerald-400 mt-1">
              R$ {monthTotals.received.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[10px] text-slate-400">{monthTotals.paidCount} cliente(s) pagos</span>
          </div>
          <CheckCircle className="w-8 h-8 text-emerald-500/30" />
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase">Pendente a Receber</span>
            <div className="text-xl font-extrabold text-amber-400 mt-1">
              R$ {monthTotals.pending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <Clock className="w-8 h-8 text-amber-500/30" />
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por cliente ou empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl glass-input placeholder-slate-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="Todos">Todos os Status</option>
            <option value="paid">Apenas Pagos</option>
            <option value="pending">Apenas Pendentes / A Pagar</option>
          </select>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#070b13] border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              <tr>
                <th className="px-6 py-4">Empresa / Cliente</th>
                <th className="px-6 py-4">Vencimento</th>
                <th className="px-6 py-4">Valor Mensal</th>
                <th className="px-6 py-4 text-center">Status do Pagamento</th>
                <th className="px-6 py-4 text-right">Ações de Cobrança & Recibo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {subscriptionClients.length > 0 ? (
                subscriptionClients.map((client) => {
                  const paymentRecord = client.monthlyPayments?.[selectedMonth];
                  const isPaid = paymentRecord?.status === 'paid';

                  return (
                    <tr key={client.id} className="hover:bg-slate-800/40 transition-colors">
                      
                      {/* 1. Empresa / Cliente */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="font-bold text-sm text-white">{client.companyName}</div>
                          <div className="text-xs text-slate-400 font-medium">{client.name}</div>
                          <div className="text-[11px] text-slate-500">{client.phone}</div>
                        </div>
                      </td>

                      {/* 2. Vencimento */}
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Todo dia {client.monthlyFeeDueDay}</span>
                        </div>
                      </td>

                      {/* 3. Valor Mensal */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-extrabold text-white">
                          R$ {client.monthlyFeeValue.toFixed(2)}
                        </div>
                        <span className="text-[10px] text-slate-400">Hospedagem & Suporte</span>
                      </td>

                      {/* 4. Status Toggle */}
                      <td className="px-6 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(client)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                            isPaid
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                          }`}
                          title="Clique para alternar entre Pago e Pendente"
                        >
                          {isPaid ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Pago</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3.5 h-3.5 text-amber-400" />
                              <span>Pendente</span>
                            </>
                          )}
                        </button>
                        {isPaid && paymentRecord?.paidAt && (
                          <div className="text-[10px] text-slate-500 mt-1">
                            Pago em: {paymentRecord.paidAt}
                          </div>
                        )}
                      </td>

                      {/* 5. Ações */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* Botão de Cobrança no WhatsApp */}
                          <button
                            type="button"
                            onClick={() => handleChargeWhatsApp(client)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 transition-all"
                            title="Enviar mensagem de cobrança com Pix no WhatsApp"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Cobrar WhatsApp</span>
                          </button>

                          {/* Botão de Gerar Recibo */}
                          <button
                            type="button"
                            onClick={() => handleOpenReceipt(client)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 transition-all"
                            title="Gerar e imprimir recibo digital"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Recibo</span>
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Nenhum cliente com mensalidade neste filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      {isReceiptOpen && receiptClient && (
        <ReceiptModal
          isOpen={isReceiptOpen}
          onClose={() => setIsReceiptOpen(false)}
          client={receiptClient}
          referenceMonthYear={selectedMonth}
        />
      )}

    </div>
  );
}
