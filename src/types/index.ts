export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  baseUnit: string; // ex: "100g", "1 unidade"
  baseAmount: number; // ex: 100, 1
}

export interface MealEntry {
  foodId?: string;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  photoUrl?: string;
}

export interface WorkoutEntry {
  id: string;
  type: string; // Ex: Musculação, Corrida, etc
  duration: number; // em minutos
  caloriesBurned: number;
}

export interface MealCategory {
  id: string;
  name: string;
  icon: string;
}

export interface DailyLog {
  id: string; // YYYY-MM-DD
  userId: string;
  date: string;
  meals: Record<string, MealEntry[]>;
  water: number;
  workouts?: WorkoutEntry[];
}
