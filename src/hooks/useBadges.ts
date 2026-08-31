import { useAuthStore } from '@/store/useAuthStore';
import { useDateStore } from '@/store/useDateStore';
import { useDailyLog } from '@/hooks/useDailyLog';
import { useStreak } from '@/hooks/useStreak';

export type BadgeId = 'camel' | 'machine' | 'consistent' | 'perfect_day';

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
}

export function useBadges() {
  const { userProfile } = useAuthStore();
  const selectedDate = useDateStore((state) => state.selectedDate);
  const { log } = useDailyLog(selectedDate);
  const { currentStreak } = useStreak();

  const BADGES_DEF = [
    {
      id: 'camel' as BadgeId,
      name: 'Camelo do Deserto',
      description: 'Bateu a meta de água.',
      icon: '🐪',
      color: 'bg-blue-500'
    },
    {
      id: 'machine' as BadgeId,
      name: 'Máquina de Combustão',
      description: 'Queimou mais de 500kcal em treinos no dia.',
      icon: '🚀',
      color: 'bg-orange-500'
    },
    {
      id: 'consistent' as BadgeId,
      name: 'Consistência de Ferro',
      description: 'Ofensiva (foguinho) chegou a 7 dias seguidos.',
      icon: '🛡️',
      color: 'bg-indigo-500'
    },
    {
      id: 'perfect_day' as BadgeId,
      name: 'Dia Perfeito',
      description: 'Bateu a meta de água E não ultrapassou as calorias.',
      icon: '⭐',
      color: 'bg-yellow-500'
    }
  ];

  // Logic to evaluate if a badge is unlocked TODAY (or overall)
  // To be super accurate, we would look at the entire historical logs in Firebase.
  // For simplicity and speed, we evaluate based on today's log and streak!
  const unlockedIds = new Set<string>();

  // 1. Camelo
  if (log && userProfile && log.water >= userProfile.waterGoal) {
    unlockedIds.add('camel');
  }

  // 2. Máquina
  const totalBurned = log?.workouts?.reduce((acc, w) => acc + w.caloriesBurned, 0) || 0;
  if (totalBurned >= 500) {
    unlockedIds.add('machine');
  }

  // 3. Consistente
  if (currentStreak >= 7) {
    unlockedIds.add('consistent');
  }

  // 4. Dia Perfeito
  let consumed = 0;
  if (log) {
    Object.values(log.meals).forEach(mealList => {
      mealList.forEach(item => { consumed += item.calories; });
    });
  }
  const remaining = userProfile ? ((userProfile.dailyCalories + totalBurned) - consumed) : 0;
  
  if (log && userProfile && remaining >= 0 && log.water >= userProfile.waterGoal) {
    unlockedIds.add('perfect_day');
  }

  const badges: Badge[] = BADGES_DEF.map(b => ({
    ...b,
    unlocked: unlockedIds.has(b.id)
  }));

  return { badges };
}
