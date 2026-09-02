'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Globe, Save, ExternalLink, Sparkles, Image as ImageIcon, DollarSign, Calendar, ShieldCheck, Upload, CheckCircle2 } from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';
import { Client, PortfolioCategory, ProjectStatus, ProjectType } from '@/types/client';
import { COVER_PRESETS } from './EditProjectCoverModal';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientToEdit?: Client | null;
}

export function ClientModal({ isOpen, onClose, clientToEdit }: ClientModalProps) {
  const { addClient, updateClient } = useClientStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  
  const [projectTitle, setProjectTitle] = useState('');
  const [projectType, setProjectType] = useState<ProjectType>('system');
  const [portfolioCategory, setPortfolioCategory] = useState<PortfolioCategory>('Sistemas Web');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [showInPortfolio, setShowInPortfolio] = useState(true);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [tagsStr, setTagsStr] = useState('');
  const [metricsHighlight, setMetricsHighlight] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('delivered');
  
  const [projectValue, setProjectValue] = useState<string | number>(3000);
  const [initialDeposit, setInitialDeposit] = useState<string | number>(1500);
  const [hasMonthlyFee, setHasMonthlyFee] = useState(true);
  const [monthlyFeeValue, setMonthlyFeeValue] = useState<string | number>(150);
  const [monthlyFeeDueDay, setMonthlyFeeDueDay] = useState<string | number>(10);
  const [notes, setNotes] = useState('');

  const parseMoneyValue = (val: string | number): number => {
    if (typeof val === 'number') return isNaN(val) ? 0 : val;
    if (!val || typeof val !== 'string') return 0;
    const clean = val.replace(/[^\d.,]/g, '').replace(/\./g, '').replace(',', '.');
    const parsed = parseFloat(clean);
    return isNaN(parsed) ? 0 : parsed;
  };

  useEffect(() => {
    if (clientToEdit) {
      setName(clientToEdit.name || '');
      setCompanyName(clientToEdit.companyName || '');
      setPhone(clientToEdit.phone || '');
      setEmail(clientToEdit.email || '');
      setDocument(clientToEdit.document || '');
      
      setProjectTitle(clientToEdit.projectTitle || '');
      setProjectType(clientToEdit.projectType || 'system');
      setPortfolioCategory(clientToEdit.portfolioCategory || 'Sistemas Web');
      setProjectDescription(clientToEdit.projectDescription || '');
      setProjectUrl(clientToEdit.projectUrl || '');
      setShowInPortfolio(clientToEdit.showInPortfolio ?? true);
      setThumbnailUrl(clientToEdit.thumbnailUrl || '');
      setTagsStr(clientToEdit.tags?.join(', ') || '');
      setMetricsHighlight(clientToEdit.metricsHighlight || '');
      setStatus(clientToEdit.status || 'delivered');
      
      setProjectValue(clientToEdit.projectValue ?? '');
      setInitialDeposit(clientToEdit.initialDeposit ?? '');
      setHasMonthlyFee(clientToEdit.hasMonthlyFee ?? false);
      setMonthlyFeeValue(clientToEdit.monthlyFeeValue ?? 150);
      setMonthlyFeeDueDay(clientToEdit.monthlyFeeDueDay || 10);
      setNotes(clientToEdit.notes || '');
    } else {
      // Defaults
      setName('');
      setCompanyName('');
      setPhone('');
      setEmail('');
      setDocument('');
      setProjectTitle('');
      setProjectType('website');
      setPortfolioCategory('Sistemas Web');
      setProjectDescription('');
      setProjectUrl('https://');
      setShowInPortfolio(true);
      setThumbnailUrl(COVER_PRESETS[0].url);
      setTagsStr('Next.js, React, Tailwind, TypeScript');
      setMetricsHighlight('+150% Conversão');
      setStatus('delivered');
      setProjectValue('');
      setInitialDeposit('');
      setHasMonthlyFee(true);
      setMonthlyFeeValue(150);
      setMonthlyFeeDueDay(10);
      setNotes('');
    }
  }, [clientToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setThumbnailUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !companyName) {
      alert('Preencha o Nome do Contato e o Nome da Empresa.');
      return;
    }

    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const parsedProjectValue = parseMoneyValue(projectValue);
    const parsedInitialDeposit = parseMoneyValue(initialDeposit);
    const parsedMonthlyFee = parseMoneyValue(monthlyFeeValue);

    const clientData = {
      name,
      companyName,
      phone,
      email,
      document: document || undefined,
      projectTitle: projectTitle || `${companyName} — Plataforma Digital`,
      projectType,
      portfolioCategory,
      projectDescription,
      projectUrl: projectUrl.trim(),
      showInPortfolio,
      thumbnailUrl: thumbnailUrl || COVER_PRESETS[0].url,
      tags: tags.length > 0 ? tags : ['Next.js', 'React', 'Tailwind'],
      metricsHighlight: metricsHighlight || undefined,
      status,
      startDate: clientToEdit?.startDate || new Date().toISOString().slice(0, 10),
      deliveryDate: clientToEdit?.deliveryDate,
      projectValue: parsedProjectValue,
      initialDeposit: parsedInitialDeposit,
      installmentsRemaining: clientToEdit?.installmentsRemaining ?? 0,
      hasMonthlyFee,
      monthlyFeeValue: hasMonthlyFee ? parsedMonthlyFee : 0,
      monthlyFeeDueDay: Number(monthlyFeeDueDay) || 10,
      notes: notes || undefined,
    };

    if (clientToEdit) {
      updateClient(clientToEdit.id, clientData);
    } else {
      addClient(clientData);
    }

    onClose();
  };

  const testProjectUrl = () => {
    if (!projectUrl || projectUrl === 'https://') {
      alert('Insira uma URL válida primeiro.');
      return;
    }
    window.open(projectUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[92vh] rounded-3xl bg-[#0d121d] border border-blue-500/40 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header (Fixed at top) */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-800 bg-[#090d16] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {clientToEdit ? 'Editar Cliente & Projeto' : 'Cadastrar Novo Cliente'}
              </h3>
              <p className="text-xs text-slate-400">
                Preencha os dados de contato, link do site no ar e valores cobrados.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form / Body (Scrollable with fixed bounds) */}
        <form onSubmit={handleSubmit} id="client-form" className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
          
          {/* 1. SEÇÃO: DADOS DO CLIENTE */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-wider text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              1. Identificação do Cliente / Empresa
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Empresa / Razão Social *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mega Gym Fitness"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nome do Contato Principal *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Medeiros"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">WhatsApp com DDD</label>
                <input
                  type="tel"
                  placeholder="(22) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">E-mail</label>
                <input
                  type="email"
                  placeholder="cliente@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">CPF ou CNPJ (Opcional)</label>
                <input
                  type="text"
                  placeholder="00.000.000/0001-00"
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* 2. SEÇÃO: DETALHES DO PROJETO & LINK NO AR */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h4 className="text-xs uppercase font-bold tracking-wider text-blue-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              2. Projeto & Publicação no Portfólio do Site
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Título do Projeto</label>
                <input
                  type="text"
                  placeholder="Ex: Mega Gym — Plataforma Digital de Treinos"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Categoria no Portfólio</label>
                <select
                  value={portfolioCategory}
                  onChange={(e) => setPortfolioCategory(e.target.value as PortfolioCategory)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm bg-slate-900"
                >
                  <option value="Sistemas Web">Sistemas Web</option>
                  <option value="Landing Pages">Landing Pages</option>
                  <option value="Dashboards & SaaS">Dashboards & SaaS</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Aplicativos">Aplicativos</option>
                </select>
              </div>
            </div>

            {/* URL DO SITE NO AR */}
            <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  Link do Site do Cliente no Ar (URL Completa):
                </label>

                {/* TOGGLE EXIBIR NO SITE */}
                <button
                  type="button"
                  onClick={() => setShowInPortfolio(!showInPortfolio)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    showInPortfolio
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${showInPortfolio ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                  <span>{showInPortfolio ? 'Exibindo no Portfólio' : 'Oculto do Portfólio'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="url"
                  placeholder="https://exemplo-cliente.vercel.app"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus:border-cyan-400"
                />
                <button
                  type="button"
                  onClick={testProjectUrl}
                  className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>Testar Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                💡 Ao colocar o link e marcar &ldquo;Exibir no Portfólio&rdquo;, o card do cliente aparecerá com botão clicável para o site dele na página inicial!
              </p>
            </div>

            {/* Mockup / Image presets & Upload */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Imagem de Capa / Mockup do Projeto:
                </label>
                
                {/* Upload Button */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-cyan-300 bg-blue-950/80 hover:bg-blue-900 border border-blue-600/40 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Imagem do PC</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 rounded-xl bg-slate-950/60 border border-slate-800">
                {COVER_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setThumbnailUrl(preset.url)}
                    className={`p-2 rounded-xl border text-left text-[11px] flex items-center gap-2 transition-all ${
                      thumbnailUrl === preset.url
                        ? 'bg-blue-950/80 border-cyan-400 text-white ring-1 ring-cyan-400'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <img src={preset.url} alt="" className="w-8 h-8 rounded-lg object-cover" />
                    <span className="truncate font-medium">{preset.label}</span>
                  </button>
                ))}
              </div>

              <input
                type="url"
                placeholder="Ou cole a URL da imagem de capa..."
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="w-full px-4 py-2 rounded-xl glass-input text-xs placeholder-slate-500 mt-2"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Tags de Tecnologias (separadas por vírgula)</label>
                <input
                  type="text"
                  placeholder="Next.js, React, Tailwind, Supabase"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Destaque de Resultado (Badge)</label>
                <input
                  type="text"
                  placeholder="Ex: +210% Matrículas Online"
                  value={metricsHighlight}
                  onChange={(e) => setMetricsHighlight(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Descrição Resumida da Solução</label>
              <textarea
                rows={2}
                placeholder="Breve resumo do que foi construído e benefícios gerados para o cliente..."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Status do Projeto</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm bg-slate-900"
              >
                <option value="delivered">🟢 Concluído / Online no Ar</option>
                <option value="in_progress">🚀 Em Desenvolvimento</option>
                <option value="review">🔍 Em Homologação / Testes</option>
                <option value="lead">⏳ Em Negociação</option>
              </select>
            </div>
          </div>

          {/* 3. SEÇÃO: FINANCEIRO & MENSALIDADES (Layout 100% Estável, sem saltos) */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h4 className="text-xs uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              3. Financeiro, Contratos & Mensalidades
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Valor Total do Desenvolvimento (R$)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 select-none">
                    R$
                  </span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0,00"
                    value={projectValue}
                    onChange={(e) => setProjectValue(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Entrada Recebida (R$)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 select-none">
                    R$
                  </span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0,00"
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            {/* MENSALIDADE CONTROLE COM OPÇÕES CLARAS E CAMPOS SEMPRE VISÍVEIS */}
            <div className={`p-4 rounded-2xl border transition-all ${
              hasMonthlyFee 
                ? 'bg-emerald-950/20 border-emerald-500/40 shadow-inner' 
                : 'bg-slate-900/60 border-slate-800'
            }`}>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    Cobrança de Mensalidade / Hospedagem & Suporte
                  </span>
                  <p className="text-[11px] text-slate-400">Rastreamento de recorrência mensal (MRR) no painel</p>
                </div>

                {/* Switch Tabs Claro: Sim / Não */}
                <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                  <button
                    type="button"
                    onClick={() => setHasMonthlyFee(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      hasMonthlyFee
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Sim, Cobrar Mensalidade
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasMonthlyFee(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      !hasMonthlyFee
                        ? 'bg-slate-700 text-slate-200 shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Sem Mensalidade
                  </button>
                </div>
              </div>

              {/* CAMPOS SEMPRE NA TELA (NÃO SOMEM NEM CAUSAM SALTOS) */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t ${
                hasMonthlyFee ? 'border-emerald-500/20 opacity-100' : 'border-slate-800 opacity-50'
              }`}>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Valor da Mensalidade (R$/mês)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 select-none">
                      R$
                    </span>
                    <input
                      type="text"
                      disabled={!hasMonthlyFee}
                      inputMode="decimal"
                      placeholder={hasMonthlyFee ? "150,00" : "0,00 (Desativado)"}
                      value={hasMonthlyFee ? monthlyFeeValue : ''}
                      onChange={(e) => setMonthlyFeeValue(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-medium disabled:bg-slate-950/60 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Dia de Vencimento todo mês (1 a 31)
                  </label>
                  <input
                    type="number"
                    disabled={!hasMonthlyFee}
                    min="1"
                    max="31"
                    placeholder="10"
                    value={hasMonthlyFee ? monthlyFeeDueDay : ''}
                    onChange={(e) => setMonthlyFeeDueDay(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-medium disabled:bg-slate-950/60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {!hasMonthlyFee && (
                <p className="text-[11px] text-slate-400 mt-2 italic">
                  ℹ️ Este cliente não terá cobranças mensais automáticas nem aparecerá na lista de faturamento recorrente.
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Anotações Internas (Privado)</label>
              <input
                type="text"
                placeholder="Observações contratuais, escopo, acessos..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>
          </div>

        </form>

        {/* Modal Footer Buttons (Fixed at bottom) */}
        <div className="flex items-center justify-end gap-3 p-4 sm:p-5 border-t border-slate-800 bg-[#090d16] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
          >
            Cancelar
          </button>

          <button
            type="submit"
            form="client-form"
            className="flex items-center gap-2 px-7 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{clientToEdit ? 'Salvar Alterações' : 'Cadastrar Cliente'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
