'use client';

import { useState, useEffect, useRef } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebaseConfig';
import { db } from '@/lib/firebaseConfig';
import { useAuthStore } from '@/store/useAuthStore';
import { FoodItem, MealEntry } from '@/types';
import { Search, X, Sparkles, Loader2, ChevronRight, Camera, Barcode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarcodeScanner } from './BarcodeScanner';

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealId: string;
  mealTitle: string;
  onAdd: (entry: MealEntry) => void;
}

export function AddFoodModal({ isOpen, onClose, mealId, mealTitle, onAdd }: AddFoodModalProps) {
  const { user, userProfile, setUserProfile } = useAuthStore();
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [search, setSearch] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [loadingFoods, setLoadingFoods] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Detalhes do alimento selecionado
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [amount, setAmount] = useState<string>('100');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const manualFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && foods.length === 0) {
      const fetchFoods = async () => {
        const snapshot = await getDocs(collection(db, 'foods'));
        const foodsData = snapshot.docs.map(doc => doc.data() as FoodItem);
        setFoods(foodsData);
        setLoadingFoods(false);
      };
      fetchFoods();
    }
  }, [isOpen, foods.length]);

  if (!isOpen) return null;

  const filteredFoods = foods.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  const saveToRecent = async (entry: MealEntry) => {
    if (!user || !userProfile) return;
    const currentRecents = userProfile.recentFoods || [];
    const filtered = currentRecents.filter((f: any) => f.name !== entry.name);
    const newRecents = [entry, ...filtered].slice(0, 10);
    
    await updateDoc(doc(db, 'users', user.uid), {
      recentFoods: newRecents
    });
    setUserProfile({ ...userProfile, recentFoods: newRecents });
  };

  const handleAddManual = () => {
    if (!selectedFood) return;
    const qty = parseFloat(amount) || 0;
    const ratio = qty / selectedFood.baseAmount;
    
    const entry = {
      foodId: selectedFood.id,
      name: selectedFood.name,
      amount: qty,
      unit: selectedFood.baseUnit,
      calories: Math.round(selectedFood.calories * ratio),
      protein: Math.round(selectedFood.protein * ratio * 10) / 10,
      carbs: Math.round(selectedFood.carbs * ratio * 10) / 10,
      fat: Math.round(selectedFood.fat * ratio * 10) / 10,
      photoUrl: photoUrl || undefined,
    };
    
    onAdd(entry);
    saveToRecent(entry);
    
    setSelectedFood(null);
    setSearch('');
    setPhotoUrl('');
    onClose();
  };

  const handleManualPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    setIsUploadingPhoto(true);
    try {
      const storageRef = ref(storage, `mealPhotos/${user.uid}_${Date.now()}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      const downloadUrl = await getDownloadURL(uploadTask.ref);
      setPhotoUrl(downloadUrl);
    } catch (err) {
      alert("Erro ao fazer upload da foto.");
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleAiSubmit = async () => {
    if (!aiPrompt.trim()) return;
    setLoadingAi(true);
    
    try {
      const res = await fetch('/api/parse-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.details || errData.error || 'Erro na API');
      }
      
      const data = await res.json();
      
      if (data.macros) {
        const entry = {
          name: data.name,
          amount: data.amount,
          unit: data.unit,
          calories: data.macros.calories,
          protein: data.macros.protein,
          carbs: data.macros.carbs,
          fat: data.macros.fat,
        };
        onAdd(entry);
        saveToRecent(entry);
        setAiPrompt('');
        onClose();
      } else {
        alert("Não foi possível identificar o alimento. Tente novamente.");
      }
    } catch (error: any) {
      alert(`Não foi possível identificar o alimento. Detalhe: ${error.message}`);
    } finally {
      setLoadingAi(false);
    }
  };

  // Função para comprimir foto da câmera no navegador antes do envio (Velocidade 50x maior)
  const compressImage = (file: File, maxWidth = 800, maxHeight = 800, quality = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxWidth || h > maxHeight) {
          if (w > h) {
            h = Math.round((h * maxWidth) / w);
            w = maxWidth;
          } else {
            w = Math.round((w * maxHeight) / h);
            h = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, w, h);
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        URL.revokeObjectURL(img.src);
        resolve(compressedBase64);
      };
      img.onerror = err => reject(err);
    });
  };

  const handleImageCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingAi(true);

    try {
      // 1. Comprimir imagem para ~50KB instantaneamente no navegador
      const compressedBase64 = await compressImage(file);

      // 2. Upload para o Firebase Storage vinculado à conta do usuário (user.uid)
      let photoUrlToSave = '';
      if (user) {
        try {
          const storageRef = ref(storage, `mealPhotos/${user.uid}_${Date.now()}.jpg`);
          const resBlob = await fetch(compressedBase64);
          const blob = await resBlob.blob();
          const uploadTask = await uploadBytesResumable(storageRef, blob, { contentType: 'image/jpeg' });
          photoUrlToSave = await getDownloadURL(uploadTask.ref);
        } catch (storageErr) {
          console.warn("Upload no Firebase Storage falhou, usando base64 fallback", storageErr);
          photoUrlToSave = compressedBase64;
        }
      } else {
        photoUrlToSave = compressedBase64;
      }

      // 3. Enviar para a API de visão com payload ultra-leve
      const res = await fetch('/api/parse-food-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: compressedBase64, mimeType: 'image/jpeg' })
      });

      if (!res.ok) {
        throw new Error('Falha na API de visão');
      }
      
      const data = await res.json();
      
      if (data.macros) {
        const entry = {
          name: data.name,
          amount: data.amount,
          unit: data.unit,
          calories: data.macros.calories,
          protein: data.macros.protein,
          carbs: data.macros.carbs,
          fat: data.macros.fat,
          photoUrl: photoUrlToSave || undefined,
        };

        onAdd(entry);
        saveToRecent(entry);
        onClose();
      } else {
        alert("Não foi possível identificar o alimento na imagem.");
      }
    } catch (err: any) {
      alert(`Erro ao analisar a imagem: ${err.message || 'Tente novamente'}`);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleBarcodeResult = async (barcode: string) => {
    setIsScanning(false);
    setLoadingAi(true);
    
    try {
      // Buscar via OpenFoodFacts API v2 filtrada por campos essenciais (Super rápida)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=product_name,product_name_pt,nutriments`, {
        signal: controller.signal,
        headers: { 'User-Agent': 'CalorieTrackApp - Brazil/Nutri' }
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      const p = data.product || data;

      if ((data.status === 1 || data.status_verbose === "product found") && p) {
        const name = p.product_name_pt || p.product_name || "Produto Desconhecido";
        const nut = p.nutriments || {};
        
        const rawCalories = nut['energy-kcal_100g'] ?? nut['energy-kcal'] ?? nut['energy-kcal_value'] ?? (nut['energy_100g'] ? Math.round(nut['energy_100g'] / 4.184) : 0);

        const entry = {
          name: name,
          amount: 100,
          unit: 'g/ml',
          calories: Math.round(rawCalories),
          protein: Math.round((nut.proteins_100g || nut.proteins || 0) * 10) / 10,
          carbs: Math.round((nut.carbohydrates_100g || nut.carbohydrates || 0) * 10) / 10,
          fat: Math.round((nut.fat_100g || nut.fat || 0) * 10) / 10,
        };
        
        onAdd(entry);
        saveToRecent(entry);
        onClose();
      } else {
        alert("Produto não encontrado no banco mundial de código de barras.");
      }
    } catch (err: any) {
      alert("Erro ao consultar código de barras. Tente buscar pelo nome ou usar a IA.");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[var(--color-surface)] w-full max-w-lg rounded-3xl shadow-xl border border-[var(--color-border)] overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-[var(--color-border)]">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-text)]">Adicionar a {mealTitle}</h2>
              <p className="text-sm text-[var(--color-text-muted)]">Busque ou descreva o que comeu</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-[var(--color-background)] rounded-full text-[var(--color-text-muted)] transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
            
            {/* Opção IA */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/30">
              <div className="flex items-center gap-2 mb-3 text-emerald-700 dark:text-emerald-400 font-semibold">
                <Sparkles size={18} />
                <span>Sugestão Inteligente (IA)</span>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ex: 2 fatias de pão com queijo e 1 copo de suco de laranja" 
                  className="flex-1 bg-white dark:bg-[var(--color-surface)] border border-emerald-200 dark:border-emerald-800/50 rounded-xl px-4 py-2 outline-none focus:border-emerald-500 text-sm text-[var(--color-text)]"
                  value={aiPrompt}
                  onChange={e => setAiPrompt(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAiSubmit()}
                />
                <button 
                  onClick={handleAiSubmit}
                  disabled={loadingAi || !aiPrompt.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 rounded-xl font-medium transition-colors disabled:opacity-70 flex items-center justify-center min-w-[48px]"
                >
                  {loadingAi ? <Loader2 size={18} className="animate-spin" /> : <ChevronRight size={20} />}
                </button>
              </div>
              
              <div className="mt-3 flex items-center justify-between border-t border-emerald-200/50 dark:border-emerald-800/30 pt-3">
                <span className="text-xs text-emerald-600/80 dark:text-emerald-400/80">Ou tire uma foto do prato:</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  ref={fileInputRef}
                  onChange={handleImageCapture}
                  className="hidden" 
                />
                <div className="flex gap-2">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loadingAi}
                    className="flex items-center gap-2 bg-white dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/50 transition-colors disabled:opacity-50"
                  >
                    <Camera size={16} /> Foto
                  </button>
                  <button 
                    onClick={() => setIsScanning(true)}
                    disabled={loadingAi}
                    className="flex items-center gap-2 bg-white dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/50 transition-colors disabled:opacity-50"
                  >
                    <Barcode size={16} /> Escanear
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-[var(--color-border)]"></div>
              <span className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wider">OU BUSQUE NO BANCO</span>
              <div className="h-[1px] flex-1 bg-[var(--color-border)]"></div>
            </div>

            {/* Busca Manual */}
            {!selectedFood ? (
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <input 
                    type="text" 
                    placeholder="Buscar alimento..." 
                    className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[var(--color-primary)] text-[var(--color-text)]"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  {loadingFoods ? (
                    <div className="text-center py-4 text-[var(--color-text-muted)] text-sm">Carregando alimentos...</div>
                  ) : filteredFoods.map(food => (
                    <button 
                      key={food.id}
                      onClick={() => setSelectedFood(food)}
                      className="flex justify-between items-center p-3 rounded-xl hover:bg-[var(--color-background)] transition-colors border border-transparent hover:border-[var(--color-border)] text-left"
                    >
                      <div>
                        <div className="font-medium text-[var(--color-text)]">{food.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{food.baseAmount}{food.baseUnit}</div>
                      </div>
                      <div className="text-sm font-semibold text-[var(--color-primary)]">
                        {food.calories} kcal
                      </div>
                    </button>
                  ))}
                  {filteredFoods.length === 0 && !loadingFoods && search === '' && (!userProfile?.recentFoods || userProfile.recentFoods.length === 0) && (
                    <div className="text-center py-6 px-4 bg-[var(--color-background)] rounded-xl border border-[var(--color-border)]">
                      <p className="text-[var(--color-text-muted)] text-sm mb-2">Seu banco de alimentos rápidos está vazio.</p>
                      <p className="text-xs text-[var(--color-text)] font-medium">Use a <strong className="text-emerald-500">Sugestão Inteligente (IA)</strong> acima para adicionar qualquer comida do mundo!</p>
                    </div>
                  )}

                  {search === '' && userProfile?.recentFoods && userProfile.recentFoods.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wider mb-2">Comidos Recentemente</div>
                      <div className="flex flex-col gap-2">
                        {userProfile.recentFoods.map((recent: any, idx: number) => (
                          <button 
                            key={`recent_${idx}`}
                            onClick={() => {
                              onAdd(recent);
                              onClose();
                            }}
                            className="flex justify-between items-center p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-background)] transition-colors text-left"
                          >
                            <div>
                              <div className="font-medium text-[var(--color-text)]">{recent.name}</div>
                              <div className="text-xs text-[var(--color-text-muted)]">{recent.amount}{recent.unit}</div>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-semibold text-[var(--color-primary)]">
                              <span>{recent.calories} kcal</span>
                              <div className="bg-[var(--color-background)] p-1.5 rounded-full text-[var(--color-text-muted)] group-hover:text-emerald-500 transition-colors">
                                <ChevronRight size={16} />
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredFoods.length === 0 && !loadingFoods && search !== '' && (
                    <div className="text-center py-4 text-[var(--color-text-muted)] text-sm">Nenhum alimento encontrado para "{search}". Use a IA acima!</div>
                  )}
                </div>
              </div>
            ) : (
              /* Configurar Quantidade */
              <div className="bg-[var(--color-background)] p-5 rounded-2xl border border-[var(--color-border)] flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-[var(--color-text)]">{selectedFood.name}</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">Base: {selectedFood.baseAmount}{selectedFood.baseUnit} ({selectedFood.calories} kcal)</p>
                  </div>
                  <button onClick={() => setSelectedFood(null)} className="text-xs text-[var(--color-primary)] hover:underline">Trocar</button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--color-text)]">Quantidade ({selectedFood.baseUnit})</label>
                  <input 
                    type="number"
                    className="w-full bg-white dark:bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-primary)] text-[var(--color-text)] text-lg font-medium"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[var(--color-border)] mt-2">
                  <div className="text-center">
                    <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Kcal</div>
                    <div className="font-bold text-sm text-[var(--color-text)]">{Math.round(selectedFood.calories * (parseFloat(amount)/selectedFood.baseAmount) || 0)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Carb</div>
                    <div className="font-bold text-sm text-[var(--color-text)]">{Math.round(selectedFood.carbs * (parseFloat(amount)/selectedFood.baseAmount) * 10)/10 || 0}g</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Prot</div>
                    <div className="font-bold text-sm text-[var(--color-text)]">{Math.round(selectedFood.protein * (parseFloat(amount)/selectedFood.baseAmount) * 10)/10 || 0}g</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Gord</div>
                    <div className="font-bold text-sm text-[var(--color-text)]">{Math.round(selectedFood.fat * (parseFloat(amount)/selectedFood.baseAmount) * 10)/10 || 0}g</div>
                  </div>
                </div>

                <div className="mt-2 border-t border-[var(--color-border)] pt-4">
                  <span className="block text-sm font-medium mb-2 text-[var(--color-text)]">Foto do prato (opcional)</span>
                  <div className="flex items-center gap-4">
                    {photoUrl ? (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[var(--color-border)]">
                        <img src={photoUrl} alt="Prato" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => setPhotoUrl('')}
                          className="absolute top-0 right-0 bg-black/50 text-white p-1 rounded-bl-lg"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => manualFileInputRef.current?.click()}
                        disabled={isUploadingPhoto}
                        className="w-16 h-16 rounded-xl border-2 border-dashed border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors disabled:opacity-50"
                      >
                        {isUploadingPhoto ? <Loader2 size={20} className="animate-spin" /> : <Camera size={20} />}
                      </button>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      ref={manualFileInputRef}
                      onChange={handleManualPhotoUpload}
                      className="hidden" 
                    />
                  </div>
                </div>

                <button 
                  onClick={handleAddManual}
                  disabled={isUploadingPhoto}
                  className="w-full bg-[var(--color-primary)] text-white font-medium py-3 rounded-xl hover:bg-[var(--color-primary-dark)] transition-colors mt-2 disabled:opacity-50"
                >
                  Confirmar Adição
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      {isScanning && (
        <BarcodeScanner 
          onResult={handleBarcodeResult} 
          onClose={() => setIsScanning(false)} 
        />
      )}
    </AnimatePresence>
  );
}
