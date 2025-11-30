'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Target, Activity, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/custom/Card';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    height_cm: '',
    weight_kg: '',
    goal_type: 'lose_weight',
    activity_level: 'moderate',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Salvar dados do onboarding (em produção, enviaria para API)
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('mock_user');
      if (user) {
        const userData = JSON.parse(user);
        const updatedUser = {
          ...userData,
          height_cm: parseInt(formData.height_cm),
          weight_kg: parseFloat(formData.weight_kg),
          goal_type: formData.goal_type,
          activity_level: formData.activity_level,
        };
        localStorage.setItem('mock_user', JSON.stringify(updatedUser));
      }
    }

    // Redirecionar para dashboard
    router.push('/');
  };

  const goalTypes = [
    { value: 'lose_weight', label: 'Perder Peso', icon: '🎯', color: 'blue' },
    { value: 'gain_weight', label: 'Ganhar Peso', icon: '💪', color: 'green' },
    { value: 'maintain', label: 'Manter Peso', icon: '⚖️', color: 'purple' },
    { value: 'gain_muscle', label: 'Ganhar Músculo', icon: '🏋️', color: 'orange' },
  ];

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentário', description: 'Pouco ou nenhum exercício' },
    { value: 'light', label: 'Leve', description: '1-3 dias por semana' },
    { value: 'moderate', label: 'Moderado', description: '3-5 dias por semana' },
    { value: 'active', label: 'Ativo', description: '6-7 dias por semana' },
    { value: 'very_active', label: 'Muito Ativo', description: 'Exercício intenso diário' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Vamos configurar seu perfil
          </h1>
          <p className="text-blue-100 text-lg">
            Passo {step} de 3
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-blue-400/30 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <Card variant="elevated">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Medidas */}
            {step === 1 && (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-blue-600" />
                    Suas Medidas
                  </CardTitle>
                  <CardDescription>
                    Informe sua altura e peso atual
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Altura (cm)
                    </label>
                    <input
                      type="number"
                      value={formData.height_cm}
                      onChange={(e) => setFormData({ ...formData, height_cm: e.target.value })}
                      placeholder="175"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Peso (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.weight_kg}
                      onChange={(e) => setFormData({ ...formData, weight_kg: e.target.value })}
                      placeholder="70.5"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    Próximo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </CardContent>
              </>
            )}

            {/* Step 2: Objetivo */}
            {step === 2 && (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    Seu Objetivo
                  </CardTitle>
                  <CardDescription>
                    O que você deseja alcançar?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {goalTypes.map((goal) => (
                      <button
                        key={goal.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, goal_type: goal.value })}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          formData.goal_type === goal.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">{goal.icon}</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {goal.label}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                    >
                      Próximo
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </CardContent>
              </>
            )}

            {/* Step 3: Nível de Atividade */}
            {step === 3 && (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-6 h-6 text-blue-600" />
                    Nível de Atividade
                  </CardTitle>
                  <CardDescription>
                    Com que frequência você se exercita?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {activityLevels.map((level) => (
                      <button
                        key={level.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, activity_level: level.value })}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          formData.activity_level === level.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                        }`}
                      >
                        <div className="font-medium text-gray-900 dark:text-white mb-1">
                          {level.label}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {level.description}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 py-3 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                    >
                      Finalizar
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </CardContent>
              </>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}
