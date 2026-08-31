import { create } from 'zustand';
import { User } from 'firebase/auth';

export interface UserProfile {
  email?: string;
  createdAt?: any;
  dailyCalories: number;
  waterGoal: number;
  macroGoals?: {
    protein: number;
    carbs: number;
    fat: number;
  };
  mealCategories?: {
    id: string;
    name: string;
    icon: string;
  }[];
  profile?: any;
  totalWorkouts?: number;
  recentFoods?: any[];
  pushSubscription?: any;
  waterReminderInterval?: number;
  lastWaterNotification?: any;
  theme?: string;
  photoUrl?: string;
  weeklyWeightReminder?: boolean;
  lastWeightUpdate?: string;
  weightHistory?: { date: string; weight: number }[];
}

export const DEFAULT_MEALS = [
  { id: 'breakfast', name: 'Café da manhã', icon: '🍳' },
  { id: 'lunch', name: 'Almoço', icon: '🍽️' },
  { id: 'snack', name: 'Lanche', icon: '☕' },
  { id: 'dinner', name: 'Janta', icon: '🌙' }
];

interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userProfile: null,
  loading: true,
  setUser: (user) => set({ user }),
  setUserProfile: (userProfile) => set({ userProfile }),
  setLoading: (loading) => set({ loading }),
}));
