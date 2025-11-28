"use client";

import { useMemo, useState } from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import { MantraPlayer } from '@/components/MantraPlayer';
import { MetricCard } from '@/components/MetricCard';
import { useDailyCard } from '@/hooks/useDailyCard';

const formatDate = (value: string) => {
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
};

export default function DiarioPage() {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [feedback, setFeedback] = useState<string | null>(null);
  const [streak, setStreak] = useState<number | null>(null);
  const { card, isLoading, completePractice, completing } = useDailyCard(selectedDate);

  const mantraData = useMemo(() => {
    return {
      short: card?.mantra ?? 'Respira con presencia',
      medium: card?.message ?? 'Integra el tono del día con pequeños rituales conscientes.',
      extended: {
        affirmation: card?.mantra ?? 'Mi calma crea espacio',
        practice: {
          duration: 6,
          steps: ['Inhala 4 tiempos', 'Sostén 4 tiempos', 'Exhala 6 tiempos', 'Integra con gratitud'],
        },
      },
    };
  }, [card]);

  const prompts = useMemo(() => {
    return Object.entries(card?.prompts ?? { journaling: 'Describe qué emoción necesitas soltar hoy.' });
  }, [card]);

  const handleComplete = async () => {
    setFeedback(null);
    try {
      const track = await completePractice(selectedDate);
      setStreak(track.streakCount);
      setFeedback(`Registramos tu práctica. Streak activo: ${track.streakCount} días.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No pudimos registrar tu práctica.';
      setFeedback(message);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardShell
        title="Ritual diario"
        description="Sincroniza respiración, mantra y journaling en menos de 15 minutos."
        actions={
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => {
              const value = event.target.value || new Date().toISOString().slice(0, 10);
              setSelectedDate(value);
            }}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-600 focus:border-aura-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-100"
          />
        }
      >
        {feedback && <p className="rounded-2xl bg-aura-500/10 px-4 py-2 text-sm text-aura-600 dark:text-aura-400">{feedback}</p>}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-xs uppercase tracking-[0.3em] text-aura-500">{formatDate(selectedDate)}</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{card?.title ?? 'Generando carta...'}</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{card?.message ?? 'Estamos preparando tu ritual. Cambia la fecha o actualiza para generar uno nuevo.'}</p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
                <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">Tono: {card?.tone ?? '—'}</span>
                <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">Mantra activo</span>
              </div>
              <button
                type="button"
                onClick={handleComplete}
                disabled={completing}
                className="mt-6 rounded-full bg-gradient-to-r from-aura-400 to-aura-500 px-5 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-70"
              >
                {completing ? 'Registrando...' : 'Marcar práctica completada'}
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-xs uppercase tracking-[0.3em] text-aura-500">Prompts del día</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {prompts.map(([key, value]) => (
                  <li key={key} className="rounded-2xl border border-slate-100/70 bg-white/70 p-3 dark:border-slate-800 dark:bg-slate-900/60">
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{key}</p>
                    <p className="mt-1 text-base text-slate-800 dark:text-white">{String(value)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <MantraPlayer mantra={mantraData} />
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard label="Streak consciente" value={streak ?? 'Marca tu ritual'} trend={streak ? 'Sigue respirando para mantenerlo' : undefined} />
              <MetricCard label="Duración sugerida" value="15 min" trend="Respiración guiada + journaling" />
            </div>
            {isLoading && <p className="text-sm text-slate-500">Buscando ritual del día...</p>}
          </div>
        </div>
      </DashboardShell>
    </div>
  );
}
