'use client';

import { useDateStore } from '@/store/useDateStore';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export function DateSelector() {
  const { selectedDate, setSelectedDate } = useDateStore();

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const displayDate = new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  return (
    <div className="flex items-center justify-between bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-4 py-2 shadow-sm w-full max-w-[280px]">
      <button 
        onClick={handlePrevDay} 
        className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      
      <div className="flex items-center gap-2 relative cursor-pointer flex-1 justify-center">
        <Calendar size={18} className="text-[var(--color-primary)]" />
        <span className="font-medium text-sm capitalize">{displayDate}</span>
        <input 
          type="date" 
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full"
        />
      </div>

      <button 
        onClick={handleNextDay} 
        className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
