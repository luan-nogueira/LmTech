'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  X, Image as ImageIcon, Upload, Check, Sparkles, 
  Globe, LayoutGrid, Link as LinkIcon, Save, CheckCircle2, ArrowUpRight 
} from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';
import { Client, PortfolioCategory } from '@/types/client';

interface EditProjectCoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
}

export const COVER_PRESETS = [
  { 
    label: 'Academia & Fitness', 
    category: 'Fitness',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    label: 'Logística & Frotas', 
    category: 'Logística',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    label: 'Imobiliária Premium', 
    category: 'Imóveis',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    label: 'Odontologia & Saúde', 
    category: 'Saúde',
    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    label: 'Dashboard SaaS & BI', 
    category: 'SaaS',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    label: 'E-commerce & Varejo', 
    category: 'E-commerce',
    url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    label: 'Advocacia & Jurídico', 
    category: 'Direito',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    label: 'Finanças & Gestão', 
    category: 'Finanças',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    label: 'Aplicativo Mobile', 
    category: 'Mobile',
    url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    label: 'Restaurante & Gastronomia', 
    category: 'Gastronomia',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    label: 'Tech & Startup', 
    category: 'Startup',
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    label: 'Clínica & Medicina', 
    category: 'Saúde',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop' 
  },
];

export function EditProjectCoverModal({ isOpen, onClose, client }: EditProjectCoverModalProps) {
  const { updateProjectCoverAndTitle } = useClientStore();

  const [projectTitle, setProjectTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [portfolioCategory, setPortfolioCategory] = useState<PortfolioCategory>('Sistemas Web');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [imageSourceMode, setImageSourceMode] = useState<'presets' | 'upload' | 'url'>('presets');
  const [isSaved, setIsSaved] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (client) {
      setProjectTitle(client.projectTitle || '');
      setCompanyName(client.companyName || '');
      setPortfolioCategory(client.portfolioCategory || 'Sistemas Web');
      setThumbnailUrl(client.thumbnailUrl || COVER_PRESETS[0].url);
      setIsSaved(false);
      setUploadError('');
    }
  }, [client, isOpen]);

  if (!isOpen || !client) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('A imagem deve ter no máximo 5MB.');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setThumbnailUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim()) {
      alert('Por favor, informe o título do projeto.');
      return;
    }

    updateProjectCoverAndTitle(client.id, {
      projectTitle: projectTitle.trim(),
      thumbnailUrl: thumbnailUrl.trim() || COVER_PRESETS[0].url,
      companyName: companyName.trim() || client.companyName,
      portfolioCategory,
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#0d121d] border border-blue-500/40 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-[#090d16]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/30 to-cyan-500/30 border border-blue-500/40 flex items-center justify-center text-cyan-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Editar Capa & Título do Projeto</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-blue-950 text-cyan-400 border border-blue-800">
                  {client.companyName}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Altere a imagem de destaque, título e categoria para exibição no portfólio do site.
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

        {/* Modal Body: Two Columns (Controls & Live Preview) */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[82vh] overflow-y-auto">
          
          {/* Left Column: Form Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Project Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>Título do Projeto no Portfólio *</span>
                <span className="text-[11px] text-cyan-400 font-normal">Exibido em destaque no card</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Mega Gym — Plataforma Digital & Gestão de Treinos"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm font-semibold text-white focus:border-cyan-400"
              />
            </div>

            {/* 2. Company Name & Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nome da Empresa / Cliente</label>
                <input
                  type="text"
                  placeholder="Ex: Mega Gym Fitness"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Categoria no Portfólio</label>
                <select
                  value={portfolioCategory}
                  onChange={(e) => setPortfolioCategory(e.target.value as PortfolioCategory)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm bg-slate-900 text-white"
                >
                  <option value="Sistemas Web">Sistemas Web</option>
                  <option value="Landing Pages">Landing Pages</option>
                  <option value="Dashboards & SaaS">Dashboards & SaaS</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Aplicativos">Aplicativos</option>
                </select>
              </div>
            </div>

            {/* 3. Cover Selection Modes */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>Escolher Imagem de Capa:</span>
                <span className="text-[11px] text-slate-400">Upload do PC, Galeria ou Link</span>
              </label>

              {/* Mode Tabs */}
              <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setImageSourceMode('presets')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    imageSourceMode === 'presets'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Galeria Pronta</span>
                </button>

                <button
                  type="button"
                  onClick={() => setImageSourceMode('upload')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    imageSourceMode === 'upload'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload do PC</span>
                </button>

                <button
                  type="button"
                  onClick={() => setImageSourceMode('url')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    imageSourceMode === 'url'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>URL da Web</span>
                </button>
              </div>

              {/* Tab 1: Presets Gallery */}
              {imageSourceMode === 'presets' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-1 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  {COVER_PRESETS.map((preset, idx) => {
                    const isSelected = thumbnailUrl === preset.url;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setThumbnailUrl(preset.url)}
                        className={`group relative rounded-xl border p-1.5 flex flex-col text-left transition-all ${
                          isSelected
                            ? 'bg-blue-950/80 border-cyan-400 ring-1 ring-cyan-400 shadow-lg shadow-cyan-500/20'
                            : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="relative h-16 w-full rounded-lg overflow-hidden bg-slate-950 mb-1.5">
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-md">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <span className="text-[11px] font-semibold text-slate-200 truncate">{preset.label}</span>
                        <span className="text-[9px] text-slate-500">{preset.category}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tab 2: Upload from PC */}
              {imageSourceMode === 'upload' && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-dashed border-slate-700 hover:border-blue-500 text-center space-y-3 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/jpg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 mx-auto flex items-center justify-center text-cyan-400">
                    <Upload className="w-6 h-6" />
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all"
                    >
                      Selecionar Arquivo do Computador
                    </button>
                    <p className="text-[11px] text-slate-400 mt-2">
                      Formatos suportados: PNG, JPG, JPEG, WebP (até 5MB)
                    </p>
                  </div>

                  {uploadError && (
                    <p className="text-xs text-red-400 font-medium">{uploadError}</p>
                  )}
                </div>
              )}

              {/* Tab 3: URL Direct Input */}
              {imageSourceMode === 'url' && (
                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... ou link direto da imagem"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs placeholder-slate-500"
                  />
                  <p className="text-[11px] text-slate-400">
                    💡 Cole o link direto de uma imagem hospedada no Unsplash, Imgur, Cloudinary ou no seu servidor.
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* Right Column: Live Card Preview (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Pré-visualização do Card ao Vivo</span>
            </label>

            {/* Preview Card */}
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-[#0c121e] border border-blue-500/40 shadow-2xl overflow-hidden flex flex-col">
              
              {/* Thumbnail with overlay */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                <img
                  src={thumbnailUrl || COVER_PRESETS[0].url}
                  alt={projectTitle || 'Capa do Projeto'}
                  className="w-full h-full object-cover object-center"
                />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                    {portfolioCategory}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online no Ar
                  </span>
                </div>

                {client.metricsHighlight && (
                  <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-blue-950/90 text-blue-200 border border-blue-500/40 text-[10px] font-semibold backdrop-blur-md">
                    ✨ {client.metricsHighlight}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                    {companyName || client.companyName}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {projectTitle || 'Título do Projeto'}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {client.projectDescription || 'Solução digital completa desenvolvida sob medida pela LM Tech.'}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {(client.tags || ['Next.js', 'React', 'Tailwind']).slice(0, 3).map((t, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-800 text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Button Mock */}
                <div className="pt-2 border-t border-white/5">
                  <div className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-bold text-white bg-blue-600 shadow-md">
                    <Globe className="w-3.5 h-3.5 text-cyan-200" />
                    <span>Visitar Projeto no Ar</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>

            </div>

            <p className="text-[11px] text-slate-400 text-center italic">
              É exatamente assim que os visitantes verão o card na página inicial.
            </p>

          </div>

          {/* Modal Footer Buttons (Span 12) */}
          <div className="lg:col-span-12 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
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
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                  <span>Salvo com Sucesso!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Salvar Capa & Título</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
