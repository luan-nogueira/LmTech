import { useState, useEffect } from 'react';
import { db } from '@/lib/firebaseConfig';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { DailyLog } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';

export function useStreak() {
  const { user } = useAuthStore();
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchStreak = async () => {
      try {
        const logsRef = collection(db, 'users', user.uid, 'daily_logs');
        const q = query(
          logsRef,
          orderBy('date', 'desc'),
          limit(30) // Checar últimos 30 dias
        );
        
        const querySnapshot = await getDocs(q);
        const logs: DailyLog[] = [];
        querySnapshot.forEach((doc) => logs.push(doc.data() as DailyLog));

        let streak = 0;
        const today = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        
        let currentDate = new Date(today);
        const todayStr = currentDate.toISOString().split('T')[0];
        
        const logDates = logs.map(l => l.date);
        
        if (!logDates.includes(todayStr)) {
          currentDate.setDate(currentDate.getDate() - 1);
        }

        for (let i = 0; i < 30; i++) {
          const checkDateStr = currentDate.toISOString().split('T')[0];
          const logFound = logs.find(l => l.date === checkDateStr);
          
          if (logFound) {
            const allMealsForDay = logFound.meals ? Object.values(logFound.meals).flat() : [];
            const consumed = allMealsForDay.reduce((acc: any, m: any) => acc + (m.calories || 0), 0);
            if (consumed > 0 || (logFound.water && logFound.water > 0)) {
              streak++;
            } else {
              break;
            }
          } else {
            break;
          }
          currentDate.setDate(currentDate.getDate() - 1);
        }

        setCurrentStreak(streak);
      } catch (error) {
        console.error('Erro ao calcular ofensiva:', error);
      }
    };

    fetchStreak();
  }, [user]);

  return { currentStreak };
}
