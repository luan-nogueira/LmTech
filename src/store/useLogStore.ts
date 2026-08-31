import { create } from 'zustand';
import { DailyLog } from '@/types';

interface LogState {
  logs: Record<string, DailyLog>; // Cache de logs por data
  setLog: (date: string, log: DailyLog) => void;
}

export const useLogStore = create<LogState>((set) => ({
  logs: {},
  setLog: (date, log) => set((state) => ({
    logs: { ...state.logs, [date]: log }
  })),
}));
