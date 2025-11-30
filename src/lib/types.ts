export interface User {
  id: string;
  email: string;
  name: string;
  height_cm?: number;
  weight_kg?: number;
  birth_date?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  goal_type: 'lose_weight' | 'gain_weight' | 'maintain' | 'gain_muscle';
  activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  calories_goal?: number;
  protein_goal_g?: number;
  carbs_goal_g?: number;
  fats_goal_g?: number;
  subscription_status: 'free' | 'basic' | 'pro' | 'premium';
  subscription_expires_at?: string;
  preferred_language: string;
  timezone: string;
  notifications_enabled: boolean;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
  email_verified: boolean;
  is_active: boolean;
}

export interface Food {
  id: string;
  name: string;
  brand?: string;
  calories_per_100g: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
  fiber_g?: number;
  sodium_mg?: number;
  sugar_g?: number;
  barcode?: string;
  category?: string;
  serving_size_g?: number;
  serving_description?: string;
  is_public: boolean;
  created_by_user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Meal {
  id: string;
  user_id: string;
  meal_type: 'breakfast' | 'morning_snack' | 'lunch' | 'afternoon_snack' | 'dinner' | 'evening_snack' | 'other';
  meal_date: string;
  meal_time?: string;
  total_calories: number;
  total_protein_g: number;
  total_carbs_g: number;
  total_fats_g: number;
  notes?: string;
  photo_url?: string;
  created_at: string;
  updated_at: string;
  items?: MealItem[];
}

export interface MealItem {
  id: string;
  meal_id: string;
  food_id: string;
  food?: Food;
  quantity_g: number;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
  created_at: string;
}

export interface Workout {
  id: string;
  user_id: string;
  workout_type: 'cardio' | 'strength' | 'flexibility' | 'sports' | 'other';
  workout_name?: string;
  workout_date: string;
  duration_minutes: number;
  calories_burned: number;
  intensity?: 'low' | 'moderate' | 'high' | 'very_high';
  notes?: string;
  created_at: string;
  updated_at: string;
  exercises?: WorkoutExercise[];
}

export interface WorkoutExercise {
  id: string;
  workout_id: string;
  exercise_name: string;
  sets?: number;
  reps?: number;
  weight_kg?: number;
  duration_seconds?: number;
  notes?: string;
  created_at: string;
}

export interface WeightLog {
  id: string;
  user_id: string;
  weight_kg: number;
  log_date: string;
  notes?: string;
  created_at: string;
}

export interface ProgressPhoto {
  id: string;
  user_id: string;
  photo_url: string;
  photo_date: string;
  weight_kg?: number;
  notes?: string;
  photo_type?: 'front' | 'side' | 'back' | 'other';
  created_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  goal_type: 'weight' | 'calories' | 'protein' | 'workouts' | 'water' | 'steps' | 'custom';
  title: string;
  description?: string;
  target_value: number;
  current_value: number;
  unit?: string;
  start_date: string;
  target_date: string;
  status: 'active' | 'completed' | 'abandoned';
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  duration_days: number;
  difficulty: 'fácil' | 'médio' | 'difícil';
  category?: string;
  points_reward: number;
  badge_icon?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserChallenge {
  id: string;
  user_id: string;
  challenge_id: string;
  challenge?: Challenge;
  start_date: string;
  end_date: string;
  current_day: number;
  completed_days: number;
  status: 'active' | 'completed' | 'failed' | 'abandoned';
  completed_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AIMessage {
  id: string;
  user_id: string;
  message_type: 'user' | 'assistant';
  message_content: string;
  context_data?: Record<string, any>;
  tokens_used?: number;
  model_used?: string;
  response_time_ms?: number;
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  payment_provider: 'stripe' | 'mercadopago';
  payment_id: string;
  subscription_id?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  plan_type?: 'basic' | 'pro' | 'premium';
  billing_period?: 'monthly' | 'yearly';
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  notification_type: 'goal_reminder' | 'challenge_update' | 'weight_log' | 'achievement' | 'system' | 'other';
  is_read: boolean;
  read_at?: string;
  action_url?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

// ========================================
// API Request/Response Types
// ========================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  height_cm?: number;
  weight_kg?: number;
  birth_date?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  goal_type: 'lose_weight' | 'gain_weight' | 'maintain' | 'gain_muscle';
  activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export interface DailyStats {
  date: string;
  calories_consumed: number;
  calories_goal: number;
  calories_burned: number;
  calories_remaining: number;
  protein_consumed: number;
  protein_goal: number;
  carbs_consumed: number;
  carbs_goal: number;
  fats_consumed: number;
  fats_goal: number;
  meals_count: number;
  workouts_count: number;
  water_intake_ml?: number;
}

export interface CreateMealRequest {
  meal_type: Meal['meal_type'];
  meal_date: string;
  meal_time?: string;
  notes?: string;
  items: {
    food_id: string;
    quantity_g: number;
  }[];
}

export interface CreateWorkoutRequest {
  workout_type: Workout['workout_type'];
  workout_name?: string;
  workout_date: string;
  duration_minutes: number;
  calories_burned: number;
  intensity?: Workout['intensity'];
  notes?: string;
  exercises?: {
    exercise_name: string;
    sets?: number;
    reps?: number;
    weight_kg?: number;
    duration_seconds?: number;
    notes?: string;
  }[];
}

export interface ChatRequest {
  message: string;
  context?: {
    current_weight?: number;
    calories_today?: number;
    last_meal?: string;
  };
}

export interface ChatResponse {
  message: string;
  suggestions?: string[];
  action_items?: string[];
  tokens_used: number;
  model_used: string;
}

export interface CreateSubscriptionRequest {
  plan_type: 'basic' | 'pro' | 'premium';
  billing_period: 'monthly' | 'yearly';
  payment_provider: 'stripe' | 'mercadopago';
}

export interface CreateSubscriptionResponse {
  checkout_url: string;
  session_id: string;
}

// ========================================
// Utility Types
// ========================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface DateRangeParams {
  start_date?: string;
  end_date?: string;
}

export interface SearchParams {
  query?: string;
  category?: string;
  is_public?: boolean;
}

// ========================================
// Form Types
// ========================================

export interface OnboardingFormData {
  name: string;
  email: string;
  password: string;
  height_cm: number;
  weight_kg: number;
  birth_date: string;
  gender: User['gender'];
  goal_type: User['goal_type'];
  activity_level: User['activity_level'];
}

export interface ProfileUpdateData {
  name?: string;
  height_cm?: number;
  weight_kg?: number;
  birth_date?: string;
  gender?: User['gender'];
  goal_type?: User['goal_type'];
  activity_level?: User['activity_level'];
  calories_goal?: number;
  protein_goal_g?: number;
  carbs_goal_g?: number;
  fats_goal_g?: number;
  preferred_language?: string;
  timezone?: string;
  notifications_enabled?: boolean;
}

// ========================================
// Chart Data Types
// ========================================

export interface WeightChartData {
  date: string;
  weight: number;
}

export interface CaloriesChartData {
  date: string;
  consumed: number;
  burned: number;
  goal: number;
}

export interface MacrosChartData {
  protein: number;
  carbs: number;
  fats: number;
}

// ========================================
// Constants
// ========================================

export const MEAL_TYPES = {
  breakfast: 'Café da Manhã',
  morning_snack: 'Lanche da Manhã',
  lunch: 'Almoço',
  afternoon_snack: 'Lanche da Tarde',
  dinner: 'Jantar',
  evening_snack: 'Ceia',
  other: 'Outro'
} as const;

export const WORKOUT_TYPES = {
  cardio: 'Cardio',
  strength: 'Musculação',
  flexibility: 'Flexibilidade',
  sports: 'Esportes',
  other: 'Outro'
} as const;

export const GOAL_TYPES = {
  lose_weight: 'Perder Peso',
  gain_weight: 'Ganhar Peso',
  maintain: 'Manter Peso',
  gain_muscle: 'Ganhar Massa Muscular'
} as const;

export const ACTIVITY_LEVELS = {
  sedentary: 'Sedentário',
  light: 'Levemente Ativo',
  moderate: 'Moderadamente Ativo',
  active: 'Muito Ativo',
  very_active: 'Extremamente Ativo'
} as const;

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Gratuito',
    price_monthly: 0,
    price_yearly: 0,
    features: [
      'Contagem básica de calorias',
      'Registro de refeições',
      'Base de alimentos limitada',
      'Anúncios'
    ]
  },
  basic: {
    name: 'Básico',
    price_monthly: 19.90,
    price_yearly: 199.00,
    features: [
      'Tudo do plano Gratuito',
      'Sem anúncios',
      'Base completa de alimentos',
      'Registro de treinos',
      'Gráficos de progresso'
    ]
  },
  pro: {
    name: 'Pro',
    price_monthly: 39.90,
    price_yearly: 399.00,
    features: [
      'Tudo do plano Básico',
      'Chat com IA Coach ilimitado',
      'Planos de refeições personalizados',
      'Desafios exclusivos',
      'Fotos de progresso ilimitadas'
    ]
  },
  premium: {
    name: 'Premium',
    price_monthly: 59.90,
    price_yearly: 599.00,
    features: [
      'Tudo do plano Pro',
      'Consultoria nutricional mensal',
      'Planos de treino personalizados',
      'Suporte prioritário',
      'Acesso antecipado a novos recursos'
    ]
  }
} as const;
