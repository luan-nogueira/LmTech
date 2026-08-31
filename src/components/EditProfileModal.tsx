'use client';

import { useState, useEffect, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db, storage, auth } from '@/lib/firebaseConfig';
import { useAuthStore } from '@/store/useAuthStore';
import { Camera, X, Calculator, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PushNotificationManager } from './PushNotificationManager';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { calculateFullNutrition } from '@/utils/nutrition';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { user, userProfile, setUserProfile } = useAuthStore();
  
  const [formData, setFormData] = useState({
    gender: userProfile?.profile?.gender || 'female',
    age: userProfile?.profile?.age || '25',
    height: userProfile?.profile?.height || '165',
    weight: userProfile?.profile?.weight || '60',
    activityLevel: userProfile?.profile?.activityLevel || '1.2',
    goal: userProfile?.profile?.goal || 'lose',
    dailyCalories: userProfile?.dailyCalories || '',
    waterGoal: userProfile?.waterGoal || '',
  });

  const [weeklyReminder, setWeeklyReminder] = useState<boolean>(
    userProfile?.weeklyWeightReminder !== false
  );

  const [loading, setLoading] = useState(false);
  const [recalculatedFeedback, setRecalculatedFeedback] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(userProfile?.theme || 'emerald');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(userProfile?.photoUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const THEMES = [
    { id: 'emerald', color: 'bg-emerald-500', name: 'Esmeralda' },
    { id: 'rose', color: 'bg-rose-500', name: 'Rosa' },
    { id: 'violet', color: 'bg-violet-500', name: 'Roxo' },
    { id: 'amber', color: 'bg-amber-500', name: 'Laranja' },
    { id: 'sky', color: 'bg-sky-500', name: 'Azul' }
  ];

  useEffect(() => {
    if (userProfile && isOpen) {
      const p = userProfile.profile || {};
      setFormData({
        gender: p.gender || 'female',
        age: p.age || '25',
        height: p.height || '165',
        weight: p.weight || '60',
        activityLevel: p.activityLevel || '1.2',
        goal: p.goal || 'lose',
        dailyCalories: userProfile.dailyCalories || '',
        waterGoal: userProfile.waterGoal || '',
      });
      setPhotoPreview(userProfile.photoUrl || '');
      setSelectedTheme(userProfile.theme || 'emerald');
      setWeeklyReminder(userProfile.weeklyWeightReminder !== false);
    }
  }, [isOpen, userProfile]);

  if (!isOpen) return null;

  const handleRecalculate = (overrideData?: any) => {
    const data = overrideData || formData;
    const w = parseFloat(data.weight?.toString() || '60');
    const h = parseFloat(data.height?.toString() || '165');
    const a = parseInt(data.age?.toString() || '25');

    if (!w || isNaN(w)) return;

    const result = calculateFullNutrition({
      gender: data.gender || 'female',
      age: a || 25,
      weight: w,
      height: h || 165,
      activityLevel: data.activityLevel || '1.2',
      goal: data.goal || 'lose',
    });

    setFormData(prev => ({
      ...prev,
      dailyCalories: result.dailyCalories,
      waterGoal: result.waterGoal
    }));

    setRecalculatedFeedback(true);
    setTimeout(() => setRecalculatedFeedback(false), 2500);
  };

  const handleFieldChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    // Recalcular automaticamente ao alterar qualquer parâmetro corporal
    if (['weight', 'height', 'age', 'gender', 'activityLevel', 'goal'].includes(field)) {
      handleRecalculate(updated);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    setIsUploadingPhoto(true);
    try {
      // Comprimir a imagem antes do upload (canvas → JPEG 80%)
      const compressedDataUrl = await new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          const maxSize = 400;
          let w = img.width, h = img.height;
          if (w > h) { h = Math.round(h * maxSize / w); w = maxSize; }
          else { w = Math.round(w * maxSize / h); h = maxSize; }
          const canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.onerror = reject;
      });

      // Converter dataURL para Blob
      const res = await fetch(compressedDataUrl);
      const blob = await res.blob();

      const storageRef = ref(storage, `profilePhotos/${user.uid}`);
      const uploadTask = await uploadBytesResumable(storageRef, blob, { contentType: 'image/jpeg' });
      const downloadUrl = await getDownloadURL(uploadTask.ref);
      setPhotoPreview(downloadUrl);

      // Salva imediatamente no Firebase Auth e no Firestore sem precisar clicar em Salvar
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { photoURL: downloadUrl }).catch(console.error);
      }
      await updateDoc(doc(db, 'users', user.uid), { photoUrl: downloadUrl });
      if (userProfile) setUserProfile({ ...userProfile, photoUrl: downloadUrl });

    } catch (err: any) {
      console.error('Erro ao fazer upload:', err);
      alert(`Erro ao fazer upload da foto: ${err?.message || 'Verifique as permissões do Firebase Storage.'}`);
    } finally {
      setIsUploadingPhoto(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userProfile) return;
    setLoading(true);

    try {
      const updatedCalories = parseInt(formData.dailyCalories.toString()) || 2000;
      const updatedWater = parseInt(formData.waterGoal.toString()) || 2000;
      const updatedWeight = parseFloat(formData.weight.toString()) || 60;
      const updatedHeight = parseFloat(formData.height.toString()) || 165;
      const updatedAge = parseInt(formData.age.toString()) || 25;

      const nutritionResults = calculateFullNutrition({
        gender: formData.gender,
        age: updatedAge,
        weight: updatedWeight,
        height: updatedHeight,
        activityLevel: formData.activityLevel,
        goal: formData.goal,
      });

      const todayStr = new Date().toISOString().split('T')[0];
      const previousHistory = userProfile.weightHistory || [];
      const weightChanged = userProfile.profile?.weight !== updatedWeight;

      let newHistory = [...previousHistory];
      if (weightChanged || newHistory.length === 0) {
        newHistory.push({ date: todayStr, weight: updatedWeight });
      }

      const userRef = doc(db, 'users', user.uid);
      
      const newProfile = {
        ...userProfile,
        dailyCalories: updatedCalories,
        waterGoal: updatedWater,
        macroGoals: nutritionResults.macroGoals,
        weeklyWeightReminder: weeklyReminder,
        lastWeightUpdate: weightChanged ? new Date().toISOString() : (userProfile.lastWeightUpdate || new Date().toISOString()),
        weightHistory: newHistory,
        theme: selectedTheme,
        photoUrl: photoPreview,
        profile: {
          gender: formData.gender,
          age: updatedAge,
          height: updatedHeight,
          weight: updatedWeight,
          activityLevel: formData.activityLevel,
          goal: formData.goal
        }
      };

      await updateDoc(userRef, {
        dailyCalories: updatedCalories,
        waterGoal: updatedWater,
        macroGoals: nutritionResults.macroGoals,
        weeklyWeightReminder: weeklyReminder,
        lastWeightUpdate: weightChanged ? new Date().toISOString() : (userProfile.lastWeightUpdate || new Date().toISOString()),
        weightHistory: newHistory,
        theme: selectedTheme,
        photoUrl: photoPreview,
        profile: {
          gender: formData.gender,
          age: updatedAge,
          height: updatedHeight,
          weight: updatedWeight,
          activityLevel: formData.activityLevel,
          goal: formData.goal
        }
      });

      setUserProfile(newProfile as any);
      
      if (selectedTheme === 'emerald') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', selectedTheme);
      }
      
      onClose();
    } catch (error) {
      alert("Erro ao atualizar o perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[var(--color-surface)] w-full max-w-md rounded-3xl shadow-xl border border-[var(--color-border)] overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex justify-between items-center p-5 border-b border-[var(--color-border)]">
            <h2 className="text-lg font-bold text-[var(--color-text)]">Perfil & Metas Nutricionais</h2>
            <button onClick={onClose} className="p-2 hover:bg-[var(--color-background)] rounded-full text-[var(--color-text-muted)] transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
              
              {/* Foto de Perfil */}
              <div className="flex flex-col items-center justify-center mb-2">
                <div 
                  className="relative w-24 h-24 rounded-full bg-[var(--color-background)] border-2 border-[var(--color-border)] flex items-center justify-center overflow-hidden cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Perfil" className="w-full h-full object-cover" />
                  ) : (
                    <Camera size={32} className="text-[var(--color-text-muted)]" />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={24} className="text-white" />
                  </div>
                  {isUploadingPhoto && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={isUploadingPhoto}
                />
                <span className="text-xs text-[var(--color-text-muted)] mt-2">Alterar foto</span>
              </div>
              
              {/* Dados Corporais */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-[var(--color-text-muted)]">Sexo</label>
                  <select 
                    className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-2 py-2 outline-none focus:border-[var(--color-primary)] text-[var(--color-text)] text-xs font-medium"
                    value={formData.gender}
                    onChange={e => handleFieldChange('gender', e.target.value)}
                  >
                    <option value="female">Feminino</option>
                    <option value="male">Masculino</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1 text-[var(--color-text-muted)]">Idade</label>
                  <input 
                    type="number" required min="10" max="120"
                    className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-3 py-2 outline-none focus:border-[var(--color-primary)] text-[var(--color-text)] text-xs font-medium"
                    value={formData.age}
                    onChange={e => handleFieldChange('age', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1 text-[var(--color-text-muted)]">Altura (cm)</label>
                  <input 
                    type="number" required min="100" max="250"
                    className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-3 py-2 outline-none focus:border-[var(--color-primary)] text-[var(--color-text)] text-xs font-medium"
                    value={formData.height}
                    onChange={e => handleFieldChange('height', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-[var(--color-text-muted)]">Peso (kg)</label>
                  <input 
                    type="number" step="0.1" required
                    className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-3 py-2 outline-none focus:border-[var(--color-primary)] text-[var(--color-text)] text-sm font-semibold"
                    value={formData.weight}
                    onChange={e => handleFieldChange('weight', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1 text-[var(--color-text-muted)]">Objetivo</label>
                  <select 
                    className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-2 py-2 outline-none focus:border-[var(--color-primary)] text-[var(--color-text)] text-xs font-semibold"
                    value={formData.goal}
                    onChange={e => handleFieldChange('goal', e.target.value)}
                  >
                    <option value="lose">Déficit Calórico</option>
                    <option value="maintain">Manter Peso</option>
                    <option value="gain">Ganho de Massa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-[var(--color-text-muted)]">Nível de Atividade Físico</label>
                <select 
                  className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-3 py-2 outline-none focus:border-[var(--color-primary)] text-[var(--color-text)] text-xs"
                  value={formData.activityLevel}
                  onChange={e => handleFieldChange('activityLevel', e.target.value)}
                >
                  <option value="1.2">Sedentário (pouco ou nenhum exercício)</option>
                  <option value="1.375">Levemente ativo (exercício leve 1 a 3 dias/semana)</option>
                  <option value="1.55">Moderadamente ativo (3 a 5 dias/semana)</option>
                  <option value="1.725">Muito ativo (6 a 7 dias/semana)</option>
                  <option value="1.9">Extremamente ativo (treino pesado diário)</option>
                </select>
              </div>

              {/* Botão de Recalcular com Alerta */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 p-3 rounded-xl text-xs flex justify-between items-center border border-emerald-200 dark:border-emerald-800/40">
                <span className="flex items-center gap-1.5 font-medium">
                  {recalculatedFeedback ? <Check size={14} className="text-emerald-500" /> : <Calculator size={14} />}
                  {recalculatedFeedback ? 'Calorias & Água atualizados!' : 'Cálculo automático ativo'}
                </span>
                <button 
                  type="button" 
                  onClick={() => handleRecalculate()} 
                  className="font-bold underline text-xs hover:text-emerald-800 dark:hover:text-emerald-200 transition-colors"
                >
                  Recalcular Agora
                </button>
              </div>

              {/* Metas Resultantes */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--color-text)]">Meta (Kcal)</label>
                  <input 
                    type="number" required
                    className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-4 py-2 outline-none focus:border-[var(--color-primary)] text-[var(--color-text)] font-bold text-lg"
                    value={formData.dailyCalories}
                    onChange={e => setFormData({...formData, dailyCalories: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--color-text)]">Água (ml)</label>
                  <input 
                    type="number" required
                    className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-4 py-2 outline-none focus:border-[var(--color-primary)] text-[var(--color-text)] font-bold text-lg"
                    value={formData.waterGoal}
                    onChange={e => setFormData({...formData, waterGoal: e.target.value})}
                  />
                </div>
              </div>

              {/* Lembrete Semanal de Peso */}
              <div className="flex items-center justify-between p-3.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl">
                <div>
                  <div className="font-semibold text-xs text-[var(--color-text)]">Lembrete Semanal de Peso</div>
                  <div className="text-[11px] text-[var(--color-text-muted)]">Aviso no dashboard a cada 7 dias para atualizar o peso</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={weeklyReminder}
                  onChange={e => setWeeklyReminder(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
              </div>

            <div className="pt-2 border-t border-[var(--color-border)]">
              <label className="block text-sm font-medium mb-3 text-[var(--color-text)]">Cor do Aplicativo (Tema)</label>
              <div className="flex gap-3 justify-between">
                {THEMES.map(theme => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform ${theme.color} ${selectedTheme === theme.id ? 'ring-4 ring-offset-2 ring-offset-[var(--color-surface)] ring-[var(--color-primary)] scale-110' : 'hover:scale-110'}`}
                    title={theme.name}
                  >
                    {selectedTheme === theme.id && <span className="text-white">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--color-border)] mt-2">
              <PushNotificationManager />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[var(--color-primary)] text-white font-medium py-3 rounded-xl hover:bg-[var(--color-primary-dark)] transition-colors mt-2"
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
