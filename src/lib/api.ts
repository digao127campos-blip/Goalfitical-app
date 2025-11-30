import { supabase, authMode } from './supabase';
import type { ApiResponse, User, DailyStats, Meal, Workout } from './types';

// ========================================
// 🔐 Authentication (usando rotas backend)
// ========================================

export async function login(credentials: { email: string; password: string }): Promise<ApiResponse<{ user: User; token: string; refreshToken: string }>> {
  try {
    // Fazer requisição para a rota backend
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: {
          message: result.error?.message || 'Email ou senha inválidos.',
          code: 'AUTH_ERROR',
        },
      };
    }

    // Salvar tokens no localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', result.data.token);
      localStorage.setItem('refresh_token', result.data.refreshToken);
      localStorage.setItem('user_data', JSON.stringify(result.data.user));
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: 'Email ou senha inválidos.',
        code: 'NETWORK_ERROR',
      },
    };
  }
}

export async function register(userData: {
  name: string;
  email: string;
  password: string;
  goal_type: string;
  activity_level: string;
}): Promise<ApiResponse<{ user: User; token: string; refreshToken: string }>> {
  try {
    // Fazer requisição para a rota backend
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: {
          message: result.error?.message || 'Erro ao criar conta.',
          code: 'AUTH_ERROR',
        },
      };
    }

    // Salvar tokens no localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', result.data.token);
      localStorage.setItem('refresh_token', result.data.refreshToken);
      localStorage.setItem('user_data', JSON.stringify(result.data.user));
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: 'Erro ao criar conta. Tente novamente.',
        code: 'NETWORK_ERROR',
      },
    };
  }
}

export async function logout(): Promise<ApiResponse<void>> {
  try {
    // Limpar localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
    }

    // Chamar rota backend
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    // Fazer logout no Supabase também
    if (supabase) {
      await supabase.auth.signOut();
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: 'Erro ao fazer logout',
        code: error.code,
      },
    };
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('auth_token');
}

// ========================================
// 👤 User Profile
// ========================================

export async function getProfile(): Promise<ApiResponse<User>> {
  try {
    // Tentar obter do localStorage primeiro
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        const user = JSON.parse(userData);
        return {
          success: true,
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            height_cm: 170,
            weight_kg: 70,
            goal_type: 'lose_weight',
            activity_level: 'moderate',
            calories_goal: 2000,
            created_at: new Date().toISOString(),
          } as User,
        };
      }
    }

    // Se não tiver no localStorage, buscar do Supabase
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      return {
        success: true,
        data: data as User,
      };
    }

    throw new Error('Usuário não encontrado');
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: error.message || 'Erro ao buscar perfil',
        code: error.code,
      },
    };
  }
}

// ========================================
// 📊 Daily Stats
// ========================================

export async function getDailyStats(): Promise<ApiResponse<DailyStats>> {
  try {
    // Dados mock para demonstração
    return {
      success: true,
      data: {
        date: new Date().toISOString().split('T')[0],
        calories_consumed: 1450,
        calories_goal: 2000,
        calories_burned: 300,
        calories_remaining: 550,
        protein_consumed: 85,
        protein_goal: 150,
        carbs_consumed: 150,
        carbs_goal: 200,
        fats_consumed: 45,
        fats_goal: 60,
        meals_count: 3,
        workouts_count: 1,
        water_intake_ml: 1500,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: error.message || 'Erro ao buscar estatísticas',
        code: error.code,
      },
    };
  }
}

// ========================================
// 🍽️ Meals
// ========================================

export async function getMeals(date?: string): Promise<ApiResponse<Meal[]>> {
  try {
    // Dados mock para demonstração
    return {
      success: true,
      data: [
        {
          id: 'meal-1',
          user_id: 'user-1',
          meal_type: 'breakfast',
          meal_date: new Date().toISOString().split('T')[0],
          meal_time: '08:00',
          total_calories: 350,
          total_protein_g: 25,
          total_carbs_g: 30,
          total_fats_g: 15,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: error.message || 'Erro ao buscar refeições',
        code: error.code,
      },
    };
  }
}

// ========================================
// 💪 Workouts
// ========================================

export async function getWorkouts(date?: string): Promise<ApiResponse<Workout[]>> {
  try {
    // Dados mock para demonstração
    return {
      success: true,
      data: [
        {
          id: 'workout-1',
          user_id: 'user-1',
          workout_type: 'strength',
          workout_name: 'Treino de Peito',
          workout_date: new Date().toISOString().split('T')[0],
          duration_minutes: 45,
          calories_burned: 300,
          intensity: 'high',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: error.message || 'Erro ao buscar treinos',
        code: error.code,
      },
    };
  }
}

// Export all functions
export const api = {
  login,
  register,
  logout,
  getProfile,
  getDailyStats,
  getMeals,
  getWorkouts,
};
