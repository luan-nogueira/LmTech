'use client';

import { useState, useRef } from 'react';
import { X, Printer, Sparkles } from 'lucide-react';
import { Client } from '@/types/client';
import { useClientStore } from '@/store/useClientStore';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client;
  referenceMonthYear?: string;
}

export function ReceiptModal({ isOpen, onClose, client, referenceMonthYear }: ReceiptModalProps) {
  const { adminConfig } = useClientStore();
  const receiptRef = useRef<HTMLDivElement>(null);

  const [receiptNumber] = useState(() => `REC-${Math.floor(100000 + Math.random() * 900000)}`);
  const [serviceDescription, setServiceDescription] = useState(
    `Serviços de Hospedagem em Nuvem, Manutenção Técnica, Otimização de Performance e Suporte Prioritário da Plataforma Web.`
  );
  const [amount, setAmount] = useState(client.monthlyFeeValue || 150);
  const [paymentDate, setPaymentDate] = useState(() => new Date().toISOString().slice(0, 10));

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const [year, month] = (referenceMonthYear || new Date().toISOString().slice(0, 7)).split('-');
  const monthName = new Date(Number(year), Number(month) - 1, 1).toLocaleDateString('pt-BR', {
    month: 'long',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0d121d] border border-blue-500/40 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Action Bar (Don't print) */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#090d16] print:hidden">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Emissor de Recibo Digital LM Tech</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document */}
        <div ref={receiptRef} className="p-8 sm:p-10 bg-[#0c101a] text-slate-100 font-sans print:p-0 print:bg-white print:text-black">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 print:border-slate-300">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white print:text-black">
                  LM <span className="text-blue-400">TECH</span>
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20 print:border-slate-400 print:text-slate-700">
                  DIGITAL
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 print:text-slate-600">
                Soluções Digitais & Engenharia de Software
              </p>
              <p className="text-xs text-slate-400 print:text-slate-600">
                {adminConfig.supportEmail} • {adminConfig.supportPhone}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block print:text-slate-500">
                Comprovante de Pagamento
              </span>
              <span className="text-lg font-mono font-bold text-cyan-400 print:text-blue-700">
                #{receiptNumber}
              </span>
              <p className="text-xs text-slate-400 mt-0.5 print:text-slate-600">
                Emissão: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="py-8 space-y-6">
            <div className="p-4 rounded-2xl bg-[#141b2a] border border-slate-800 print:bg-slate-50 print:border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Recebemos de:
              </span>
              <p className="text-lg font-bold text-white print:text-black">
                {client.name} {client.companyName ? `(${client.companyName})` : ''}
              </p>
              {client.taxId && (
                <p className="text-xs text-slate-400 print:text-slate-600">
                  CPF/CNPJ: {client.taxId}
                </p>
              )}
              {client.email && (
                <p className="text-xs text-slate-400 print:text-slate-600">
                  E-mail: {client.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#141b2a] border border-slate-800 print:bg-slate-50 print:border-slate-200">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Valor Total Pago
                </span>
                <span className="text-2xl font-extrabold text-emerald-400 print:text-emerald-700">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#141b2a] border border-slate-800 print:bg-slate-50 print:border-slate-200">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Referência do Mês
                </span>
                <span className="text-lg font-bold text-white capitalize print:text-black">
                  {monthName} de {year}
                </span>
                <p className="text-xs text-slate-400 mt-1 print:text-slate-600">
                  Data do Pagamento: {new Date(paymentDate + 'T12:00:00').toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#141b2a] border border-slate-800 print:bg-slate-50 print:border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Referente aos Serviços de:
              </span>
              <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
                {serviceDescription}
              </p>
            </div>
          </div>

          {/* Footer & Signature */}
          <div className="pt-6 border-t border-slate-800 print:border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-xs text-slate-400 print:text-slate-600 text-center sm:text-left">
              <p className="font-semibold text-slate-300 print:text-slate-900">LM Tech — Soluções Digitais</p>
              <p>Chave Pix: {adminConfig.pixKey} ({adminConfig.pixBeneficiary})</p>
            </div>

            <div className="text-center sm:text-right">
              <div className="w-48 border-b border-slate-600 print:border-black mb-1 mx-auto sm:ml-auto"></div>
              <span className="text-xs font-bold text-slate-300 print:text-black block">
                {adminConfig.pixBeneficiary || 'Luan Nogueira'}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                Assinatura Autorizada
              </span>
            </div>
          </div>

        </div>

        {/* Edit fields toggle bar (hidden in print) */}
        <div className="p-5 border-t border-slate-800 bg-[#090d16] print:hidden">
          <p className="text-xs font-bold text-slate-400 mb-3">Ajustar Detalhes do Recibo:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Valor (R$)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Data Pagamento</label>
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Descrição</label>
              <input
                type="text"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
