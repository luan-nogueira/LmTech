'use client';

import { useState } from 'react';
import { 
  ShieldCheck, Key, Lock, Phone, Mail, 
  Download, Upload, RotateCcw, Save, CheckCircle2, AlertTriangle 
} from 'lucide-react';
import { useClientStore } from '@/store/useClientStore';

export function SettingsPanel() {
  const { adminConfig, updateAdminConfig, clients, leads, importBackup, resetToDefaults } = useClientStore();

  const [adminEmail, setAdminEmail] = useState(adminConfig.adminEmail);
  const [adminPassword, setAdminPassword] = useState(adminConfig.adminPassword);
  
  const [pixKey, setPixKey] = useState(adminConfig.pixKey);
  const [pixName, setPixName] = useState(adminConfig.pixName);
  const [pixCity, setPixCity] = useState(adminConfig.pixCity);

  const [companyPhone, setCompanyPhone] = useState(adminConfig.companyPhone);
  const [companyEmail, setCompanyEmail] = useState(adminConfig.companyEmail);
  const [instagram, setInstagram] = useState(adminConfig.instagram);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();

    updateAdminConfig({
      adminEmail,
      adminPassword,
      pixKey,
      pixName,
      pixCity,
      companyPhone,
      companyEmail,
      instagram,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportBackup = () => {
    const data = {
      backupDate: new Date().toISOString(),
      adminConfig,
      clients,
      leads,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lmtech_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.clients && Array.isArray(json.clients)) {
          importBackup(json);
          alert('Backup restaurado com sucesso!');
        } else {
          alert('Arquivo de backup inválido.');
        }
      } catch (err) {
        alert('Erro ao ler o arquivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (confirm('Tem certeza de que deseja restaurar os dados iniciais de demonstração da LM Tech?')) {
      resetToDefaults();
      alert('Dados restaurados para os padrões com sucesso.');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white">Configurações & Chaves do Sistema</h2>
        <p className="text-xs text-slate-400">
          Atualize suas credenciais de acesso, chave Pix para cobranças e contatos públicos da LM Tech.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        
        {/* 1. Credenciais do Admin */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>Credenciais de Acesso ao Painel</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">E-mail de Login do Admin</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Senha Master</label>
              <input
                type="text"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono text-cyan-300"
              />
            </div>
          </div>
        </div>

        {/* 2. Dados de Cobrança Pix */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <Key className="w-4 h-4" />
            <span>Chave Pix para Cobranças Automáticas</span>
          </h3>

          <p className="text-xs text-slate-400">
            Esta chave Pix é inserida automaticamente nas mensagens de cobrança de mensalidade no WhatsApp e nos recibos digitais.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Chave Pix</label>
              <input
                type="text"
                required
                placeholder="luanmnogueira@gmail.com"
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nome do Favorecido / Empresa</label>
              <input
                type="text"
                required
                placeholder="Luan Nogueira"
                value={pixName}
                onChange={(e) => setPixName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Cidade do Favorecido</label>
              <input
                type="text"
                placeholder="Cabo Frio - RJ"
                value={pixCity}
                onChange={(e) => setPixCity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* 3. Canais de Contato da LM Tech */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>Contatos Públicos da LM Tech</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Telefone / WhatsApp</label>
              <input
                type="text"
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">E-mail Comercial</label>
              <input
                type="email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Instagram</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/30 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Todas as Configurações</span>
          </button>

          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Configurações salvas com sucesso!
            </span>
          )}
        </div>

      </form>

      {/* 4. Backup & Restauração */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span>Backup & Segurança de Dados</span>
        </h3>

        <p className="text-xs text-slate-400">
          Você pode salvar uma cópia completa de todos os seus clientes, contratos e histórico em um arquivo JSON para nunca perder suas informações.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportBackup}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Backup (JSON)</span>
          </button>

          <label className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Restaurar Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={handleResetData}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrões Iniciais</span>
          </button>
        </div>
      </div>

    </div>
  );
}
