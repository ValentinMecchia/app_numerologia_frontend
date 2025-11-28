interface InsightPayload {
  id: string;
  type?: string;
  summary_text?: string;
  created_at?: string;
  createdAt?: string;
  payload?: Record<string, unknown>;
  daily?: Record<string, unknown>;
  numerology?: Record<string, unknown>;
  astrology?: Record<string, unknown>;
  mantra?: string;
}

interface InsightProps {
  insight: InsightPayload;
}

export function CardInsight({ insight }: InsightProps) {
  const createdIso = insight.created_at ?? insight.createdAt;
  const created = createdIso ? new Date(createdIso).toLocaleDateString('es-ES') : '';
  const summary =
    insight.summary_text ??
    (typeof insight.daily?.message === 'string' ? insight.daily?.message : undefined) ??
    (insight.mantra ? `Mantra sugerido: ${insight.mantra}` : 'Tu energía se alinea con nuevas comprensiones.');
  const payload =
    insight.payload ??
    {
      mantra: insight.mantra,
      daily: insight.daily,
      numerology: insight.numerology,
      astrology: insight.astrology,
    };
  const title = insight.type ?? (typeof insight.daily?.title === 'string' ? insight.daily?.title : 'Insight');

  return (
    <article className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70">
      <header className="flex flex-wrap items-center justify-between gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-aura-500">
        <span className="truncate text-xs font-semibold tracking-[0.2em]">{title}</span>
        <time className="text-slate-500">{created}</time>
      </header>
      <p className="mt-3 text-base font-semibold leading-relaxed text-slate-900 dark:text-white sm:text-lg">{summary}</p>
      <pre className="mt-4 max-h-48 overflow-auto rounded-2xl bg-slate-900/5 p-3 text-[0.7rem] leading-relaxed text-slate-600 whitespace-pre-wrap break-words dark:bg-white/5 dark:text-slate-200">
        {JSON.stringify(payload ?? {}, null, 2)}
      </pre>
    </article>
  );
}
