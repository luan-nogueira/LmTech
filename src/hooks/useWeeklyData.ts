import { useState, useEffect } from 'react';
import { db } from '@/lib/firebaseConfig';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { DailyLog } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';

export function useWeeklyData() {
  const { user, userProfile } = useAuthStore();
  const [weeklyLogs, setWeeklyLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    if (!user || !userProfile) return;

    const fetchWeekly = async () => {
      setLoading(true);
      try {
        // Obter data de 7 dias atrás no fuso local
        const today = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6); // Hoje + 6 dias pra trás = 7 dias
        const startDateStr = sevenDaysAgo.toISOString().split('T')[0];
        
        const logsRef = collection(db, 'users', user.uid, 'daily_logs');
        const q = query(
          logsRef,
          where('date', '>=', startDateStr),
          orderBy('date', 'desc'),
          limit(7)
        );

        const querySnapshot = await getDocs(q);
        const logs: DailyLog[] = [];
        
        querySnapshot.forEach((doc) => {
          logs.push(doc.data() as DailyLog);
        });

        // Ordenar do mais antigo para o mais novo (para o gráfico)
        logs.sort((a, b) => a.date.localeCompare(b.date));
        setWeeklyLogs(logs);

        // Calcular Ofensiva (Streak)
        // Regra simples: a partir de hoje (ou ontem), quantos dias consecutivos o log existe e atingiu alguma meta?
        // Vamos apenas contar quantos dias consecutivos o usuário registrou algo ou atingiu a meta.
        
        // Vamos checar os últimos 30 dias para a ofensiva
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        const streakStartDateStr = thirtyDaysAgo.toISOString().split('T')[0];
        
        const streakQ = query(
          logsRef,
          where('date', '>=', streakStartDateStr),
          orderBy('date', 'desc'),
          limit(30)
        );
        const streakSnap = await getDocs(streakQ);
        const allLogs: DailyLog[] = [];
        streakSnap.forEach((doc) => allLogs.push(doc.data() as DailyLog));
        
        // Conta a ofensiva verificando de "hoje para trás" se houve acesso
        const todayStr = today.toISOString().split('T')[0];
        let streak = 0;
        let currentDate = new Date(today);
        
        // Se não tem log hoje, checamos a partir de ontem para não quebrar a ofensiva se ele ainda não abriu hoje
        const hasLogToday = allLogs.find(l => l.date === todayStr);
        if (!hasLogToday) {
            currentDate.setDate(currentDate.getDate() - 1);
        }

        for (let i = 0; i < 30; i++) {
            const checkDateStr = currentDate.toISOString().split('T')[0];
            const logFound = allLogs.find(l => l.date === checkDateStr);
            
            if (logFound) {
                // Checar se bateu alguma meta ou se simplesmente interagiu.
                // Vamos dar o ponto de ofensiva se consumiu alguma caloria ou bebeu alguma água
                const consumedCalories = logFound.meals ? Object.values(logFound.meals).flat().reduce((acc, m) => acc + m.calories, 0) : 0;
                if (consumedCalories > 0 || logFound.water > 0) {
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
        console.error('Error fetching weekly data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeekly();
  }, [user, userProfile]);

  return { weeklyLogs, loading, currentStreak };
}
