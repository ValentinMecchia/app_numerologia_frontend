"use client";

import { Fragment, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { DashboardShell } from '@/components/DashboardShell';
import { CardInsight } from '@/components/CardInsight';
import { useInsights, type Insight } from '@/hooks/useInsights';
import { apiFetch } from '@/lib/api';

export default function InsightsPage() {
  const [page, setPage] = useState(1);
  const { data, meta, isLoading, isFetching, refetch } = useInsights(page, 6);
  const [status, setStatus] = useState<string | null>(null);

  const generateMutation = useMutation({
    mutationFn: () => apiFetch('/profile/generate', { method: 'POST' }),
    onSuccess: async () => {
      setStatus('Generamos un nuevo insight. Refresca la lista para verlo.');
      await refetch();
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'No pudimos generar el insight.';
      setStatus(message);
    },
  });

  const canGoBack = page > 1;
  const canAdvance = meta ? page < meta.pages : false;

  const handleNext = () => {
    if (canAdvance) {
      setPage((prev: number) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canGoBack) {
      setPage((prev: number) => Math.max(1, prev - 1));
    }
  };

  return (
    <div className="space-y-8">
      <DashboardShell
        title="Insights accionables"
        description="Registra snapshots combinando numerología, astrología y tu mantra personal."
        actions={
          <button
            type="button"
            onClick={() => generateMutation.mutate()}
            disabled={generateMutation.isPending}
            className="rounded-full bg-gradient-to-r from-aura-400 to-aura-500 px-5 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-70"
          >
            {generateMutation.isPending ? 'Generando...' : 'Crear nuevo snapshot'}
          </button>
        }
      >
        {status && <p className="rounded-2xl bg-aura-500/10 px-4 py-2 text-sm text-aura-600 dark:text-aura-400">{status}</p>}
        {isLoading ? (
          <p className="text-sm text-slate-500">Cargando insights...</p>
        ) : data.length === 0 ? (
          <p className="text-sm text-slate-500">Aún no generas snapshots. Completa tu perfil y crea el primero.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {data.map((insight: Insight) => (
              <Fragment key={insight.id}>
                <CardInsight insight={insight} />
              </Fragment>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-4 text-sm text-slate-500">
          <p>
            Página {meta?.page ?? page} de {meta?.pages ?? '—'} • {meta?.total ?? data.length} registros
            {isFetching && <span className="ml-2 text-xs text-aura-500">Actualizando…</span>}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canGoBack}
              className="rounded-full border border-slate-300 px-4 py-2 text-slate-600 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!canAdvance}
              className="rounded-full border border-slate-300 px-4 py-2 text-slate-600 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200"
            >
              Siguiente
            </button>
          </div>
        </div>
      </DashboardShell>
    </div>
  );
}
