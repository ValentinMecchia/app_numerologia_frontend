interface StudioCard {
  title: string;
  description: string;
  badge: string;
  action: string;
  highlights: string[];
}

const STUDIO_CARDS: StudioCard[] = [
  {
    title: 'Respiraciones dinámicas',
    description: 'Elige tu estado emocional y generamos una secuencia de respiración adaptativa con métricas en vivo.',
    badge: 'Nuevo',
    action: 'Diseñar secuencia',
    highlights: ['Modo ansioso ↔ modo foco', 'Temporizador háptico', 'Historial de repeticiones'],
  },
  {
    title: 'Visualizaciones AI',
    description: 'Crea guiones breves para tus meditaciones usando tu Carta Natal y el Insight diario como prompt.',
    badge: 'AI',
    action: 'Generar guion',
    highlights: ['Compatibilidad con audio', 'Exporta a PDF', 'Se sincroniza con Supabase'],
  },
  {
    title: 'Ritual blender',
    description: 'Combina numerología + astrología + tarot para un ritual express de 7 minutos.',
    badge: 'Beta',
    action: 'Mezclar ritual',
    highlights: ['Integración con tracks', 'Recordatorios push', 'Métricas de adherencia'],
  },
];

export function GenerativeStudio() {
  return (
    <section className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/40 sm:p-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-aura-500">Studio creativo</p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Acciones generativas que suman contexto</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Lleva tus insights a otro formato: audio, guiones o rituales listos para compartir.
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-500">Roadmap Q1 · Feedback abierto</span>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {STUDIO_CARDS.map((card) => (
          <article
            key={card.title}
            className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/60"
          >
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="rounded-full bg-aura-500/10 px-3 py-1 text-aura-500">{card.badge}</span>
            </div>
            <h4 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{card.title}</h4>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{card.description}</p>
            <ul className="mt-4 space-y-2 text-slate-500 dark:text-slate-200">
              {card.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-xs">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-aura-500" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-aura-400 hover:text-aura-500 dark:border-slate-700 dark:text-slate-100"
            >
              {card.action}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
