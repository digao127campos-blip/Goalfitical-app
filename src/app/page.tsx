'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Target, 
  TrendingUp, 
  Apple, 
  Dumbbell, 
  Plus,
  Calendar,
  Award,
  MessageCircle,
  User,
  LogOut
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/custom/Card';
import { api, isAuthenticated } from '@/lib/api';
import type { DailyStats, User as UserType } from '@/lib/types';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);
  const [stats, setStats] = useState<DailyStats | null>(null);

  useEffect(() => {
    // Verificar autenticação
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    loadData();
  }, [router]);

  const loadData = async () => {
    try {
      setLoading(true);

      // Carregar perfil do usuário
      const profileResponse = await api.getProfile();
      if (profileResponse.success && profileResponse.data) {
        setUser(profileResponse.data);
      }

      // Carregar estatísticas do dia
      const statsResponse = await api.getDailyStats();
      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await api.logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  const caloriesPercentage = stats 
    ? Math.round((stats.calories_consumed / stats.calories_goal) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎯</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Goalfitical
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Olá, {user?.name || 'Usuário'}!
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Calorias */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="w-5 h-5 text-blue-600" />
                Calorias Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stats?.calories_consumed || 0}
                  </span>
                  <span className="text-lg text-gray-500 dark:text-gray-400 mb-1">
                    / {stats?.calories_goal || 2000} kcal
                  </span>
                </div>

                {/* Barra de Progresso */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(caloriesPercentage, 100)}%` }}
                  />
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Restam <span className="font-semibold text-blue-600">{stats?.calories_remaining || 0} kcal</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Macros */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Macros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Proteína</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {stats?.protein_g || 0}g
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Carboidratos</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {stats?.carbs_g || 0}g
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Gorduras</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {stats?.fats_g || 0}g
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Atividades */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Dumbbell className="w-5 h-5 text-orange-600" />
                Atividades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Refeições</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats?.meals_count || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Treinos</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats?.workouts_count || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 group">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <Apple className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Adicionar Refeição
              </span>
            </button>

            <button className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-200 group">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <Dumbbell className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Registrar Treino
              </span>
            </button>

            <button className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-all duration-200 group">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Ver Progresso
              </span>
            </button>

            <button className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-200 group">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Chat IA Coach
              </span>
            </button>
          </div>
        </div>

        {/* Dica do Dia */}
        <Card variant="elevated" className="bg-gradient-to-r from-blue-500 to-blue-600">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">
                  💡 Dica do Dia
                </h3>
                <p className="text-blue-50">
                  Beba pelo menos 2 litros de água hoje! A hidratação adequada ajuda no metabolismo 
                  e na recuperação muscular.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modo Demo Alert */}
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ <strong>Modo Demo:</strong> Você está usando o app em modo de demonstração. 
            Para funcionalidades completas, configure o Supabase nas configurações do projeto.
          </p>
        </div>
      </main>
    </div>
  );
}
