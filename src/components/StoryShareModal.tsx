'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { X, Share2, Loader2, Flame, Droplets, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { useDailyLog } from '@/hooks/useDailyLog';
import { useStreak } from '@/hooks/useStreak';
import { useDateStore } from '@/store/useDateStore';

interface StoryShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StoryShareModal({ isOpen, onClose }: StoryShareModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { userProfile } = useAuthStore();
  const selectedDate = useDateStore((state) => state.selectedDate);
  const { log } = useDailyLog(selectedDate);
  const { currentStreak } = useStreak();

  if (!isOpen) return null;

  const workouts = log?.workouts || [];
  const meals = log?.meals || {};
  let totalBurned = workouts.reduce((acc, w) => acc + w.caloriesBurned, 0);
  let consumed = 0;
  Object.values(meals).forEach(mealList => {
    mealList.forEach(item => { consumed += item.calories; });
  });

  const dailyGoal = userProfile?.dailyCalories || 0;
  const remaining = (dailyGoal + totalBurned) - consumed;
  const isGoalMet = remaining >= 0;

  const generateImage = async () => {
    if (!cardRef.current) return null;
    try {
      const canvas = await html2canvas(cardRef.current, { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#10b981', // emerald-500
        windowWidth: 380, // force mobile width for consistency
      });
      return canvas.toDataURL('image/png');
    } catch (e) {
      console.error('Error generating canvas:', e);
      return null;
    }
  };

  const handleShare = async () => {
    setIsGenerating(true);
    const dataUrl = await generateImage();
    setIsGenerating(false);
    
    if (!dataUrl) {
      alert("Erro ao gerar a imagem.");
      return;
    }

    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'calorietrack-resumo.png', { type: 'image/png' });
      
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Resumo Diário - CalorieTrack',
          text: 'Foco no progresso diário! 🔥 #CalorieTrack'
        });
      } else {
        // Fallback: download the image
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'calorietrack-resumo.png';
        a.click();
      }
    } catch (e) {
      console.log('Share canceled or not supported', e);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-sm flex flex-col items-center gap-6"
      >
        {/* Story Card Preview */}
        <div 
          ref={cardRef} 
          className="w-[300px] h-[533px] relative rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center p-6"
          style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }}
        >
          {/* Logo / Title */}
          <div className="text-emerald-100 font-bold tracking-widest uppercase text-xs mt-4 opacity-80">
            CalorieTrack
          </div>
          
          <h2 className="text-3xl font-black text-white mt-8 mb-1 leading-tight text-center">
            {isGoalMet ? 'META ALCANÇADA!' : 'QUASE LÁ!'}
          </h2>
          
          <p className="text-emerald-100 text-sm font-medium mb-10">
            Resumo de Hoje
          </p>

          {/* Stats Grid */}
          <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/20 flex flex-col gap-5">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Flame className="text-orange-300" size={24} fill="currentColor" />
              </div>
              <div>
                <div className="text-sm text-emerald-100 font-medium">Ofensiva</div>
                <div className="text-2xl font-bold">{currentStreak} Dias</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Dumbbell className="text-blue-300" size={24} />
              </div>
              <div>
                <div className="text-sm text-emerald-100 font-medium">Calorias Gastas</div>
                <div className="text-2xl font-bold">{totalBurned} kcal</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Droplets className="text-cyan-300" size={24} />
              </div>
              <div>
                <div className="text-sm text-emerald-100 font-medium">Água Bebida</div>
                <div className="text-2xl font-bold">{log?.water || 0} ml</div>
              </div>
            </div>

          </div>

          {/* Footer watermark */}
          <div className="absolute bottom-6 left-0 right-0 text-center opacity-60 text-[10px] font-medium tracking-wide">
            CRIE SEU HÁBITO TAMBÉM
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-[300px] flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center justify-center border border-white/20"
          >
            Cancelar
          </button>
          
          <button 
            onClick={handleShare}
            disabled={isGenerating}
            className="flex-2 py-4 px-6 rounded-2xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold transition-colors flex items-center justify-center gap-2 border border-emerald-400 disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Share2 size={20} />}
            {isGenerating ? 'Gerando...' : 'Compartilhar'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
