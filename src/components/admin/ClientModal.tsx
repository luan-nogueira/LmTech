'use client';

import { useState, useEffect } from 'react';
import { X, Globe, Save, ExternalLink, Sparkles, Image, DollarSign, Calendar, ShieldCheck } from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';
import { Client, PortfolioCategory, ProjectStatus, ProjectType } from '@/types/client';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientToEdit?: Client | null;
}

const PRESET_MOCKUPS = [
  { label: 'Academia / Fitness', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Logística / Frotas', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Imobiliária / Arquitetura', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Saúde / Odontologia', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Finanças / Corporativo', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop' },
  { label: 'E-commerce / Varejo', url: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?q=80&w=1200&auto=format&fit=crop' },
];

export function ClientModal({ isOpen, onClose, clientToEdit }: ClientModalProps) {
  const { addClient, updateClient } = useClientStore();

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
      setMonthlyFeeValue(clientToEdit.monthlyFeeValue ?? '');
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
      setThumbnailUrl(PRESET_MOCKUPS[0].url);
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
      thumbnailUrl: thumbnailUrl || PRESET_MOCKUPS[0].url,
      tags: tags.length > 0 ? tags : ['Next.js', 'React', 'Tailwind'],
      metricsHighlight: metricsHighlight || undefined,
      status,
      startDate: new Date().toISOString().slice(0, 10),
      projectValue: parsedProjectValue,
      initialDeposit: parsedInitialDeposit,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#0d121d] border border-blue-500/40 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-[#090d16]">
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
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
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

            {/* URL DO SITE NO AR (SUPER IMPORTANTE!) */}
            <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  Link do Site do Cliente no Ar (URL Completa):
                </label>

                {/* TOGGLE EXIBIR NO SITE */}
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showInPortfolio}
                    onChange={(e) => setShowInPortfolio(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500 relative"></div>
                  <span className="text-xs font-bold text-white">
                    {showInPortfolio ? 'Exibir no Portfólio' : 'Oculto do Portfólio'}
                  </span>
                </label>
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
                💡 Ao colocar o link e marcar &ldquo;Exibir no Portfólio&rdquo;, o card do cliente com botão clicável para o site dele aparecerá instantaneamente na página inicial!
              </p>
            </div>

            {/* Mockup / Image presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Imagem de Capa / Mockup do Projeto:</span>
                <span className="text-[11px] text-slate-400">Escolha um preset ou cole a URL</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PRESET_MOCKUPS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setThumbnailUrl(preset.url)}
                    className={`p-2 rounded-xl border text-left text-[11px] flex items-center gap-2 transition-all ${
                      thumbnailUrl === preset.url
                        ? 'bg-blue-950/60 border-cyan-400 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <img src={preset.url} alt="" className="w-8 h-8 rounded-lg object-cover" />
                    <span className="truncate">{preset.label}</span>
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

          {/* 3. SEÇÃO: FINANCEIRO & MENSALIDADES */}
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

            {/* MENSALIDADE CONTROLE */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white">Cobrança de Mensalidade / Hospedagem</span>
                  <p className="text-[11px] text-slate-400">Ativa o rastreamento mensal de recorrência (MRR)</p>
                </div>

                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasMonthlyFee}
                    onChange={(e) => setHasMonthlyFee(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500 relative"></div>
                  <span className="text-xs font-bold text-emerald-300">
                    {hasMonthlyFee ? 'Sim, possui mensalidade' : 'Sem mensalidade'}
                  </span>
                </label>
              </div>

              {hasMonthlyFee && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-emerald-500/20">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Valor da Mensalidade (R$/mês)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 select-none">
                        R$
                      </span>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="0,00"
                        value={monthlyFeeValue}
                        onChange={(e) => setMonthlyFeeValue(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Dia de Vencimento todo mês (1 a 31)</label>
                    <input
                      type="number"
                      min="1"
                      max="31"
                      placeholder="10"
                      value={monthlyFeeDueDay}
                      onChange={(e) => setMonthlyFeeDueDay(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-medium"
                    />
                  </div>
                </div>
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

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-7 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/30 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{clientToEdit ? 'Salvar Alterações' : 'Cadastrar Cliente'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
