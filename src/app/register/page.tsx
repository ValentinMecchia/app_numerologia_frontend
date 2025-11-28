"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthShell } from '@/components/AuthShell';
import { useAuth } from '@/hooks/useAuth';

const schema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre'),
  apellido: z.string().min(2, 'Ingresa tu apellido'),
  email: z.string().email('Usa un correo válido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type RegisterValues = z.infer<typeof schema>;

const inputClass =
  'w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 text-slate-900 shadow-sm focus:border-aura-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white';

export default function RegisterPage() {
  const { register: registerUser, loading, user } = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(schema),
    defaultValues: { nombre: '', apellido: '', email: '', password: '' },
  });

  useEffect(() => {
    if (user) {
      router.replace('/perfil');
    }
  }, [user, router]);

  const onSubmit = async (values: RegisterValues) => {
    setErrorMessage(null);
    try {
      await registerUser(values);
      router.replace('/perfil');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No pudimos crear tu perfil, intenta nuevamente.';
      setErrorMessage(message);
    }
  };

  return (
    <AuthShell
      title="Crea tu perfil energético"
      subtitle="Conecta tu numerología y astrología en una sola práctica diaria."
      footer={{ label: '¿Ya tienes cuenta?', link: { href: '/login', text: 'Inicia sesión' } }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
            <span>Nombre</span>
            <input className={`${inputClass} mt-2`} {...register('nombre')} placeholder="María" />
            {errors.nombre && <p className="mt-1 text-xs text-rose-500">{errors.nombre.message}</p>}
          </label>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
            <span>Apellido</span>
            <input className={`${inputClass} mt-2`} {...register('apellido')} placeholder="González" />
            {errors.apellido && <p className="mt-1 text-xs text-rose-500">{errors.apellido.message}</p>}
          </label>
        </div>
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
          {loading ? 'Creando perfil...' : 'Comenzar mi práctica'}
        </button>
      </form>
    </AuthShell>
  );
}
