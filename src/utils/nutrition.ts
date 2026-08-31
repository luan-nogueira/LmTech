/**
 * Utilitário de Nutrição Científica
 * Utiliza a fórmula Mifflin-St Jeor para TMB/TDEE
 */

export interface UserBodyProfile {
  gender: string; // 'male' | 'female'
  age: number;
  weight: number; // kg
  height: number; // cm
  activityLevel: string | number; // '1.2' | '1.375' | '1.55' | '1.725' | '1.9'
  goal: string; // 'lose' | 'maintain' | 'gain'
}

export interface MacroGoals {
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionCalculationResult {
  bmr: number;
  tdee: number;
  dailyCalories: number;
  waterGoal: number;
  macroGoals: MacroGoals;
}

/**
 * Calcula a Taxa Metabólica Basal (TMB) usando a equação Mifflin-St Jeor
 */
export function calculateBMR(gender: string, age: number, weightKg: number, heightCm: number): number {
  if (!weightKg || !heightCm || !age) return 1500;
  
  if (gender === 'female') {
    return (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  }
  // male or default
  return (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
}

/**
 * Retorna o fator numérico de atividade física a partir do valor (numérico ou string)
 */
export function getActivityFactor(activityLevel: string | number): number {
  if (typeof activityLevel === 'number' && !isNaN(activityLevel)) return activityLevel;
  
  const str = String(activityLevel || '').toLowerCase();
  
  // Tenta converter se for string numérica ("1.2", "1.55", "1.725")
  const parsed = parseFloat(str);
  if (!isNaN(parsed) && parsed >= 1.0 && parsed <= 2.5) {
    return parsed;
  }

  // Mapeamento por texto em português
  if (str.includes('muito') || str.includes('6 a 7') || str.includes('extremo')) return 1.725;
  if (str.includes('moderad') || str.includes('3 a 5')) return 1.55;
  if (str.includes('leve') || str.includes('1 a 3')) return 1.375;
  if (str.includes('seden') || str.includes('pouco')) return 1.2;

  return 1.375; // Padrão ativo moderado seguro
}

/**
 * Calcula o Gasto Calórico Total Diário (TDEE)
 */
export function calculateTDEE(bmr: number, activityLevel: string | number): number {
  const factor = getActivityFactor(activityLevel);
  return bmr * factor;
}

/**
 * Calcula calorias diárias recomendadas com limites de segurança contra déficits perigosos
 */
export function calculateDailyCalories(
  bmr: number, 
  tdee: number, 
  goal: string, 
  gender: string
): number {
  let target = tdee;

  if (goal === 'lose') {
    // Déficit seguro de ~18% (evita reduções brutas de 500 kcal que derrubam quem tem pouca massa)
    target = tdee * 0.82;
    
    // Trava de segurança: Nunca cair abaixo da TMB nem do piso mínimo biológico (1200kcal F / 1500kcal M)
    const minFloor = gender === 'female' ? 1200 : 1500;
    const safetyMinimum = Math.max(Math.round(bmr), minFloor);
    
    if (target < safetyMinimum) {
      target = safetyMinimum;
    }
  } else if (goal === 'gain') {
    // Superávit controlado de 12%
    target = tdee * 1.12;
  }

  return Math.round(target);
}

/**
 * Calcula a meta de água diária recomendada (35ml por kg)
 */
export function calculateWaterGoal(weightKg: number): number {
  if (!weightKg || weightKg <= 0) return 2000;
  return Math.round(weightKg * 35);
}

/**
 * Calcula distribuição equilibrada de macronutrientes sem valores negativos ou irreais
 */
export function calculateMacros(dailyCalories: number, weightKg: number): MacroGoals {
  const safeWeight = weightKg > 0 ? weightKg : 70;
  
  // Proteína: 1.8g / kg
  let proteinGrams = Math.round(safeWeight * 1.8);
  let proteinKcal = proteinGrams * 4;
  
  // Não permitir que a proteína consuma mais de 35% das calorias totais em dietas com calorias baixas
  if (proteinKcal > dailyCalories * 0.35) {
    proteinGrams = Math.round((dailyCalories * 0.30) / 4);
    proteinKcal = proteinGrams * 4;
  }

  // Gordura: 0.9g / kg (ou ~25% das calorias)
  let fatGrams = Math.round(safeWeight * 0.9);
  let fatKcal = fatGrams * 9;
  
  if (fatKcal > dailyCalories * 0.30) {
    fatGrams = Math.round((dailyCalories * 0.25) / 9);
    fatKcal = fatGrams * 9;
  }

  // Carboidratos: Restante das calorias
  let remainingKcal = dailyCalories - proteinKcal - fatKcal;
  let carbsGrams = Math.round(remainingKcal / 4);

  // Garantir mínimo razoável de carboidratos
  if (carbsGrams < 50) {
    carbsGrams = Math.round((dailyCalories * 0.30) / 4);
  }

  return {
    protein: Math.max(30, proteinGrams),
    carbs: Math.max(50, carbsGrams),
    fat: Math.max(20, fatGrams)
  };
}

/**
 * Função completa para obter todas as métricas nutricionais de uma vez
 */
export function calculateFullNutrition(profile: UserBodyProfile): NutritionCalculationResult {
  const age = typeof profile.age === 'string' ? parseInt(profile.age) || 25 : profile.age || 25;
  const weight = typeof profile.weight === 'string' ? parseFloat(profile.weight) || 70 : profile.weight || 70;
  const height = typeof profile.height === 'string' ? parseFloat(profile.height) || 170 : profile.height || 170;
  
  const bmr = calculateBMR(profile.gender, age, weight, height);
  const tdee = calculateTDEE(bmr, profile.activityLevel);
  const dailyCalories = calculateDailyCalories(bmr, tdee, profile.goal, profile.gender);
  const waterGoal = calculateWaterGoal(weight);
  const macroGoals = calculateMacros(dailyCalories, weight);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    dailyCalories,
    waterGoal,
    macroGoals
  };
}
