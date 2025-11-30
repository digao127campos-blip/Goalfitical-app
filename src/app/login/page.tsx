'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/custom/Card';
import { FormInput } from '@/components/custom/FormInput';
import { api } from '@/lib/api';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const response = await api.login({
          email: formData.email,
          password: formData.password,
        });

        if (response.success) {
          router.push('/');
        } else {
          setError(response.error?.message || 'Erro ao fazer login');
        }
      } else {
        // Registro
        const response = await api.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          goal_type: 'lose_weight',
          activity_level: 'moderate',
        });

        if (response.success) {
          // Redirecionar para onboarding para completar perfil
          router.push('/onboarding');
        } else {
          setError(response.error?.message || 'Erro ao criar conta');
        }
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24">
              <Image
                src="/icon.svg"
                alt="Goalfitical Logo"
                width={96}
                height={96}
                className="drop-shadow-2xl"
                priority
              />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            Goalfitical
          </h1>
          <p className="text-blue-100 text-lg">
            Seu coach fitness pessoal
          </p>
        </div>

        {/* Card de Login/Registro */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>
              {isLogin ? 'Entrar na sua conta' : 'Criar nova conta'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Bem-vindo de volta! Entre para continuar.' 
                : 'Comece sua jornada fitness hoje.'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome (apenas no registro) */}
              {!isLogin && (
                <FormInput
                  label="Nome completo"
                  type="text"
                  placeholder="João Silva"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  leftIcon={<User className="w-5 h-5" />}
                  required
                />
              )}

              {/* Email */}
              <FormInput
                label="Email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                leftIcon={<Mail className="w-5 h-5" />}
                required
              />

              {/* Senha */}
              <FormInput
                label="Senha"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                leftIcon={<Lock className="w-5 h-5" />}
                required
                helperText={!isLogin ? 'Mínimo 6 caracteres' : undefined}
              />

              {/* Erro */}
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Botão Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    {isLogin ? 'Entrar' : 'Criar conta'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Login/Registro */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {isLogin 
                  ? 'Não tem uma conta? Criar conta' 
                  : 'Já tem uma conta? Entrar'}
              </button>
            </div>

            {/* Contas de Teste */}
            {isLogin && (
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-900 dark:text-blue-200 mb-3 font-semibold flex items-center gap-2">
                  <span className="text-lg">🔑</span>
                  Contas de teste disponíveis:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="font-medium text-gray-900 dark:text-white mb-1">👤 João Silva</p>
                    <p className="text-gray-600 dark:text-gray-400">📧 joao@example.com</p>
                    <p className="text-gray-600 dark:text-gray-400">🔑 senha123</p>
                  </div>
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="font-medium text-gray-900 dark:text-white mb-1">👤 Mariana Costa</p>
                    <p className="text-gray-600 dark:text-gray-400">📧 mariana@example.com</p>
                    <p className="text-gray-600 dark:text-gray-400">🔑 senha123</p>
                  </div>
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="font-medium text-gray-900 dark:text-white mb-1">👤 Admin</p>
                    <p className="text-gray-600 dark:text-gray-400">📧 admin@goalfitical.com</p>
                    <p className="text-gray-600 dark:text-gray-400">🔑 admin123</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-blue-100 mt-6">
          © 2025 Goalfitical. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
