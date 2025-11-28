"use client";

import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { DashboardShell } from '@/components/DashboardShell';
import { MetricCard } from '@/components/MetricCard';
import { FormProfile, ProfileFormValues } from '@/components/FormProfile';
import { useProfile } from '@/hooks/useProfile';
import { apiFetch } from '@/lib/api';

export default function PerfilPage() {
  const { data, isLoading, updateProfile, updating } = useProfile();
  const [status, setStatus] = useState<string | null>(null);

  const generateMutation = useMutation({
    mutationFn: () => apiFetch('/profile/generate', { method: 'POST' }),
    onSuccess: () => setStatus('Generamos un nuevo insight. Revisa la sección Insights para leerlo.'),
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'No pudimos generar el mapa energético.';
      setStatus(message);
    },
  });

  const defaultValues = useMemo<ProfileFormValues>(() => {
    return {
      nombre: data?.user.nombre ?? '',
      apellido: data?.user.apellido ?? '',
      fecha_nac: (data?.user as { fechaNac?: string })?.fechaNac ?? '',
      hora_nac: (data?.user as { horaNac?: string })?.horaNac ?? '',
      frase_favorita: data?.profile.fraseFavorita ?? '',
      estado_animo: data?.profile.estadoAnimo ?? { tag: '', note: '' },
      meta_actual: data?.profile.metaActual ?? '',
    };
  }, [data]);

  const handleSubmit = async (values: ProfileFormValues) => {
    setStatus(null);
    await updateProfile(values);
    setStatus('Perfil actualizado. Tu práctica se sincronizó.');
  };

  const handleGenerateMap = async () => {
    setStatus(null);
    await generateMutation.mutateAsync();
  };

  const toggleThemePreference = async () => {
    if (!data?.profile.theme) {
      return;
    }
    const nextTheme = data.profile.theme === 'dark' ? 'light' : 'dark';
    setStatus(null);
    await updateProfile({ theme: nextTheme });
    setStatus(`Tema sincronizado en modo ${nextTheme === 'dark' ? 'noche' : 'luz'}.`);
  };

  if (isLoading && !data) {
    return <div className="text-sm text-slate-500">Cargando tu perfil...</div>;
  }

  return (
    <div className="space-y-8">
      <DashboardShell
        title="Perfil energético"
        description="Actualiza tus datos base para que las lecturas sean precisas."
        actions={
          <button
            type="button"
            onClick={handleGenerateMap}
            disabled={generateMutation.isPending}
            className="rounded-full bg-gradient-to-r from-aura-400 to-aura-500 px-5 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-70"
          >
            {generateMutation.isPending ? 'Generando...' : 'Generar insight diario'}
          </button>
        }
      >
        {status && <p className="rounded-2xl bg-aura-500/10 px-4 py-2 text-sm text-aura-600 dark:text-aura-400">{status}</p>}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Estado emocional"
            value={data?.profile.estadoAnimo?.tag ?? 'Registra tu estado'}
            trend={data?.profile.estadoAnimo?.note}
          />
          <MetricCard
            label="Meta actual"
            value={data?.profile.metaActual ?? 'Define una intención'}
            trend={data?.profile.fraseFavorita ? 'Frase activadora guardada' : 'Agrega una frase favorita'}
          />
          <MetricCard
            label="Preferencia de tema"
            value={data?.profile.theme === 'dark' ? 'Modo noche' : 'Modo luz'}
            trend="Se sincroniza con el dashboard"
          />
        </div>
      </DashboardShell>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <FormProfile defaultValues={defaultValues} onSubmit={handleSubmit} loading={updating} />
        <aside className="space-y-4">
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 p-5 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300">
            <p className="text-xs uppercase tracking-[0.3em] text-aura-500">Modo temático</p>
            <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
              {data?.profile.theme === 'dark' ? 'Noche intuitiva' : 'Luz enfocada'}
            </p>
            <p className="mt-2">
              Este ajuste sincroniza la estética del dashboard con tu estado preferido. Puedes alternarlo cuando
              necesites una experiencia más danzante o más minimalista.
            </p>
            <button
              type="button"
              onClick={toggleThemePreference}
              className="mt-4 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-aura-500 dark:border-slate-600 dark:text-slate-100"
            >
              Alternar a modo {data?.profile.theme === 'dark' ? 'luz' : 'noche'}
            </button>
          </div>
          <div className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-xs uppercase tracking-[0.3em] text-aura-500">Sugerencias rápidas</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>• Completa tu hora de nacimiento para refinar la parte astrológica.</li>
              <li>• Usa la sección de objetivos para anclar un micro-hábito semanal.</li>
              <li>• Registra tu frase favorita; se mezclará con el mantra generado.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
