'use client';

import { useState, useRef } from 'react';
import { X, Printer, Download, CheckCircle, Sparkles, Building, Calendar, DollarSign } from 'lucide-react';
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

  const [receiptNumber] = useState(`REC-${Date.now().toString().slice(-6)}`);
  const [serviceDescription, setServiceDescription] = useState(
    `Serviços de Hospedagem em Nuvem, Manutenção Técnica, Otimização de Performance e Suporte Prioritário da Plataforma Web.`
  );
  const [amount, setAmount] = useState(client.monthlyFeeValue || 150);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));

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

        {/* Printable Receipt Body */}
        <div ref={receiptRef} className="p-8 sm:p-10 bg-white text-slate-900 space-y-6">
          
          {/* Receipt Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6">
            <div>
              <div className="text-2xl font-black tracking-tight text-blue-900">LM TECH</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-600">
                Soluções Digitais & Desenvolvimento Web
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {adminConfig.companyPhone} • {adminConfig.companyEmail}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xl font-black text-slate-900">RECIBO DE PAGAMENTO</div>
              <div className="text-xs font-bold text-blue-700 mt-0.5">Nº {receiptNumber}</div>
              <div className="text-xs text-slate-500">Data: {new Date(paymentDate).toLocaleDateString('pt-BR')}</div>
            </div>
          </div>

          {/* Amount Box */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">VALOR RECEBIDO:</span>
            <span className="text-2xl font-black text-blue-950">
              R$ {Number(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Text Statement */}
          <div className="text-sm leading-relaxed text-slate-700 space-y-4">
            <p>
              Recebemos de <strong>{client.companyName}</strong>
              {client.document ? ` (Doc/CNPJ: ${client.document})` : ''}, representado(a) por{' '}
              <strong>{client.name}</strong>, a quantia supra de{' '}
              <strong>R$ {Number(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>, referente a:
            </p>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800">
              {serviceDescription} (Competência: {monthName}/{year})
            </div>

            <p className="text-xs text-slate-600">
              Forma de Pagamento: <strong>Pix / Transferência Bancária</strong>. Damos por este instrumento plena, rasa e irrevogável quitação pelo valor recebido.
            </p>
          </div>

          {/* Signatures Footer */}
          <div className="pt-8 mt-6 border-t border-slate-300 flex items-center justify-between text-xs text-slate-600">
            <div>
              <p className="font-bold text-slate-900">{adminConfig.pixName}</p>
              <p className="text-[11px] text-slate-500">LM Tech — Soluções Digitais</p>
              <p className="text-[11px] text-slate-500">Chave Pix: {adminConfig.pixKey}</p>
            </div>

            <div className="text-center">
              <div className="w-48 border-b border-slate-900 pb-1 mb-1 font-bold text-slate-900">
                Luan Nogueira
              </div>
              <span className="text-[10px] text-slate-500">Assinatura Digital do Emissor</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
