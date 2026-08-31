import { useState, useEffect } from 'react';
import { db } from '@/lib/firebaseConfig';
import { collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { DailyLog } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';

export function useHistoryLogs(days: number = 30) {
  const { user } = useAuthStore();
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      setLoading(true);
      try {
        const logsRef = collection(db, 'users', user.uid, 'daily_logs');
        
        // Pega os últimos 'days' registros ordenados por data decrescente
        const q = query(
          logsRef,
          orderBy('date', 'desc'),
          limit(days)
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedLogs: DailyLog[] = [];
        
        querySnapshot.forEach((doc) => {
          fetchedLogs.push(doc.data() as DailyLog);
        });

        // Inverter para ficar em ordem cronológica (mais antigo primeiro, para o gráfico)
        setLogs(fetchedLogs.reverse());
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, days]);

  return { logs, loading };
}
