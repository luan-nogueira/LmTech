import { useState, useEffect } from 'react';
import { db } from '@/lib/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { DailyLog, MealEntry, WorkoutEntry } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';
import { useLogStore } from '@/store/useLogStore';

export function useDailyLog(dateStr: string) {
  const { user } = useAuthStore();
  const { logs, setLog: setGlobalLog } = useLogStore();
  
  const log = logs[dateStr] || null;
  const [loading, setLoading] = useState(!log);

  useEffect(() => {
    if (!user) return;
    if (logs[dateStr]) {
      setLoading(false);
      return;
    }

    const fetchLog = async () => {
      setLoading(true);
      const logRef = doc(db, 'users', user.uid, 'daily_logs', dateStr);
      const logSnap = await getDoc(logRef);

      if (logSnap.exists()) {
        setGlobalLog(dateStr, logSnap.data() as DailyLog);
      } else {
        const newLog: DailyLog = {
          id: dateStr,
          userId: user.uid,
          date: dateStr,
          meals: {},
          water: 0,
          workouts: []
        };
        await setDoc(logRef, newLog);
        setGlobalLog(dateStr, newLog);
      }
      setLoading(false);
    };

    fetchLog();
  }, [user, dateStr, logs, setGlobalLog]);

  const addFood = async (mealType: string, entry: MealEntry) => {
    if (!user || !log) return;
    
    const currentMeals = log.meals || {};
    const mealList = currentMeals[mealType] || [];
    const updatedMeals = {
      ...currentMeals,
      [mealType]: [...mealList, entry]
    };
    
    const logRef = doc(db, 'users', user.uid, 'daily_logs', dateStr);
    
    await updateDoc(logRef, {
      meals: updatedMeals
    });

    setGlobalLog(dateStr, { ...log, meals: updatedMeals });
  };

  const updateWater = async (amount: number) => {
    if (!user || !log) return;
    const newWater = Math.max(0, log.water + amount);
    const logRef = doc(db, 'users', user.uid, 'daily_logs', dateStr);
    
    await updateDoc(logRef, {
      water: newWater
    });

    setGlobalLog(dateStr, { ...log, water: newWater });
  };

  const resetWater = async () => {
    if (!user || !log) return;
    const logRef = doc(db, 'users', user.uid, 'daily_logs', dateStr);
    
    await updateDoc(logRef, {
      water: 0
    });

    setGlobalLog(dateStr, { ...log, water: 0 });
  };

  const addWorkout = async (entry: WorkoutEntry) => {
    if (!user || !log) return;
    
    const updatedWorkouts = [...(log.workouts || []), entry];
    const logRef = doc(db, 'users', user.uid, 'daily_logs', dateStr);
    
    await updateDoc(logRef, {
      workouts: updatedWorkouts
    });

    setGlobalLog(dateStr, { ...log, workouts: updatedWorkouts });
  };

  const removeWorkout = async (index: number) => {
    if (!user || !log) return;
    
    const currentWorkouts = log.workouts || [];
    if (index < 0 || index >= currentWorkouts.length) return;
    
    const newWorkouts = [...currentWorkouts];
    newWorkouts.splice(index, 1);
    
    const logRef = doc(db, 'users', user.uid, 'daily_logs', dateStr);
    
    await updateDoc(logRef, {
      workouts: newWorkouts
    });

    setGlobalLog(dateStr, { ...log, workouts: newWorkouts });
  };

  const updateWorkout = async (index: number, entry: WorkoutEntry) => {
    if (!user || !log) return;
    
    const currentWorkouts = log.workouts || [];
    if (index < 0 || index >= currentWorkouts.length) return;
    
    const newWorkouts = [...currentWorkouts];
    newWorkouts[index] = entry;
    
    const logRef = doc(db, 'users', user.uid, 'daily_logs', dateStr);
    
    await updateDoc(logRef, {
      workouts: newWorkouts
    });

    setGlobalLog(dateStr, { ...log, workouts: newWorkouts });
  };

  const removeFood = async (mealType: string, index: number) => {
    if (!user || !log) return;
    
    const currentMeals = log.meals || {};
    const mealList = currentMeals[mealType] || [];
    
    if (index < 0 || index >= mealList.length) return;
    
    const newMealList = [...mealList];
    newMealList.splice(index, 1);
    
    const updatedMeals = {
      ...currentMeals,
      [mealType]: newMealList
    };
    
    const logRef = doc(db, 'users', user.uid, 'daily_logs', dateStr);
    
    await updateDoc(logRef, {
      meals: updatedMeals
    });

    setGlobalLog(dateStr, { ...log, meals: updatedMeals });
  };

  return { log, loading, addFood, removeFood, updateWater, resetWater, addWorkout, removeWorkout, updateWorkout };
}
