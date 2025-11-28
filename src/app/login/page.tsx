"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthShell } from '@/components/AuthShell';
import { useAuth } from '@/hooks/useAuth';

const schema = z.object({
  email: z.string().email('Ingresa un correo válido'),
  password: z.string().min(6, 'Tu contraseña debe tener al menos 6 caracteres'),
});

type LoginValues = z.infer<typeof schema>;

const inputClass =
  'w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 text-slate-900 shadow-sm focus:border-aura-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white';

export default function LoginPage() {
  const { login, loading, user } = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (user) {
      router.replace('/perfil');
    }
  }, [user, router]);

  const onSubmit = async (values: LoginValues) => {
    setErrorMessage(null);
    try {
      await login(values);
      router.replace('/perfil');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No pudimos iniciar sesión. Intenta de nuevo.';
      setErrorMessage(message);
    }
  };

  return (
    <AuthShell
      title="Bienvenida de regreso"
      subtitle="Actualiza tu perfil energético y desbloquea los rituales del día."
      footer={{ label: '¿Aún no tienes cuenta?', link: { href: '/register', text: 'Crear perfil' } }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
          <span>Correo electrónico</span>
          <input type="email" className={`${inputClass} mt-2`} {...register('email')} placeholder="tu@email.com" />
          {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
        </label>
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
          <span>Contraseña</span>
          <input type="password" className={`${inputClass} mt-2`} {...register('password')} placeholder="•••••••" />
          {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>}
        </label>
        {errorMessage && <p className="text-sm text-rose-500">{errorMessage}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-aura-400 to-aura-500 py-3 text-sm font-semibold text-white shadow-sm disabled:opacity-70"
        >
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>
    </AuthShell>
  );
}
