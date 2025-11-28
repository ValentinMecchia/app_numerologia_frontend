"use client";

import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre'),
  apellido: z.string().min(2, 'Ingresa tu apellido'),
  fecha_nac: z.string().min(10, 'Formato YYYY-MM-DD'),
  hora_nac: z.string().optional(),
  frase_favorita: z.string().min(3, 'Comparte una frase favorita'),
  estado_animo: z.object({
    tag: z.string().min(2),
    note: z.string().optional(),
  }),
  meta_actual: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<ProfileFormValues>;
  onSubmit: (values: ProfileFormValues) => Promise<void> | void;
  loading?: boolean;
}

const inputClass =
  'w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 text-slate-900 shadow-sm focus:border-aura-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white';

export function FormProfile({ defaultValues, onSubmit, loading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form
      className="space-y-6 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70"
      onSubmit={handleSubmit((values: ProfileFormValues) => onSubmit(values))}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nombre" error={errors.nombre?.message}>
          <input className={inputClass} {...register('nombre')} placeholder="María" />
        </Field>
        <Field label="Apellido" error={errors.apellido?.message}>
          <input className={inputClass} {...register('apellido')} placeholder="González" />
        </Field>
        <Field label="Fecha de nacimiento" error={errors.fecha_nac?.message}>
          <input className={inputClass} type="date" {...register('fecha_nac')} />
        </Field>
        <Field label="Hora (opcional)" error={errors.hora_nac?.message}>
          <input className={inputClass} type="time" {...register('hora_nac')} />
        </Field>
      </div>

      <Field label="Frase favorita" error={errors.frase_favorita?.message}>
        <textarea className={inputClass} rows={2} {...register('frase_favorita')} placeholder="Respira y avanza" />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Estado emocional" error={errors.estado_animo?.tag?.message}>
          <input className={inputClass} {...register('estado_animo.tag')} placeholder="Ansiosa" />
        </Field>
        <Field label="Detalle del estado" error={errors.estado_animo?.note?.message}>
          <input className={inputClass} {...register('estado_animo.note')} placeholder="Muchos frentes abiertos" />
        </Field>
      </div>

      <Field label="Meta actual" error={errors.meta_actual?.message}>
        <input className={inputClass} {...register('meta_actual')} placeholder="Soltar el control" />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-gradient-to-r from-aura-400 to-aura-500 py-3 text-center text-sm font-semibold text-white transition hover:shadow-lg disabled:opacity-70"
      >
        {loading ? 'Guardando...' : 'Guardar y generar mapa'}
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-medium text-slate-600 dark:text-slate-200">
      <span>{label}</span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </label>
  );
}
