import Link from 'next/link';
import { MantraPlayer } from '@/components/MantraPlayer';
import { CardInsight } from '@/components/CardInsight';
import { AudioMantraLab } from '@/components/AudioMantraLab';
import { GenerativeStudio } from '@/components/GenerativeStudio';

const HERO_MANTRA = {
  short: 'Respira y permite que tu intuición guíe los siguientes pasos',
  medium: 'Hoy tu vibración se abre a nuevas conversaciones internas. Crea un espacio de silencio para escucharte.',
  extended: {
    affirmation: 'Mi calma crea futuro',
    practice: {
      duration: 6,
      steps: ['Inhala 4 tiempos', 'Sostén 4 tiempos', 'Exhala 6 tiempos', 'Permanece en silencio'],
    },
  },
};

const FEATURE_CARDS = [
  {
    title: 'Numerología aplicada',
    description: 'Calculamos misión, sombra y oportunidades usando tus datos de nacimiento con un lenguaje accesible.',
  },
  {
    title: 'Astrología diaria',
    description: 'Orienta tus decisiones con arquetipos y tránsitos traducidos a rituales concretos.',
  },
  {
    title: 'Tracks guiados',
    description: 'Respiraciones, música y micro-retos que mantienen tu streak consciente con recordatorios suaves.',
  },
  {
    title: 'Insights accionables',
    description: 'Nuestro motor de AI resume tendencias emocionales y te sugiere el próximo micro paso.',
  },
];

const SAMPLE_INSIGHTS = [
  {
    id: '1',
    type: 'Numerología',
    summary_text: 'Tu número del día (5) pide ligereza y ensayos rápidos antes de decidir.',
    created_at: new Date().toISOString(),
    payload: { mineral: 'amatista', recomendacion: 'Anota 3 ideas sin filtro' },
  },
  {
    id: '2',
    type: 'Astro Daily',
    summary_text: 'La Luna en Cáncer activa la memoria emocional: observa qué historias necesitas renovar.',
    created_at: new Date().toISOString(),
    payload: { respiracion: '4-4-6', mantra: 'Yo decido habitarme' },
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="grid gap-6 rounded-[28px] border border-white/50 bg-white/70 p-6 shadow-xl shadow-aura-400/10 backdrop-blur-lg dark:border-slate-800/70 dark:bg-slate-900/70 md:grid-cols-[minmax(0,1fr)_420px] md:gap-8 md:p-8">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-aura-500">Perfil Espiritual</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Tu mapa energético, traducido a rituales cotidianos
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-200 sm:text-lg">
            Conecta numerología, astrología y respiración en una sola experiencia. Cada mañana recibe una hoja de ruta
            accionable para proteger tu energía creativa.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <Link
              href="/register"
              className="rounded-full bg-gradient-to-r from-aura-400 to-aura-500 px-6 py-3 text-white shadow-lg"
            >
              Crear mi perfil energético
            </Link>
            <Link
              href="/demo"
              className="rounded-full border border-slate-300 px-6 py-3 text-slate-600 transition hover:text-aura-500 dark:border-slate-700 dark:text-slate-200"
            >
              Ver demo interactiva
            </Link>
          </div>
          <dl className="mt-8 grid gap-6 text-sm text-slate-600 dark:text-slate-200 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-slate-500">Usuarios en beta</dt>
              <dd className="text-xl font-semibold sm:text-2xl">+320</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-slate-500">Rituales entregados</dt>
              <dd className="text-xl font-semibold sm:text-2xl">4.8k</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-slate-500">Promesa</dt>
              <dd className="text-xl font-semibold sm:text-2xl">15 min diarios</dd>
            </div>
          </dl>
        </div>
        <MantraPlayer mantra={HERO_MANTRA} />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">Lo esencial de tu práctica</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Unificamos información esotérica en planes accionables.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {FEATURE_CARDS.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-slate-200 bg-white/80 p-5 text-slate-700 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-aura-500">Insights en vivo</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Lecturas que terminan en acción</h2>
          </div>
          <Link
            href="/insights"
            className="text-sm font-semibold text-aura-500 underline-offset-4 hover:underline"
          >
            Explorar más
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {SAMPLE_INSIGHTS.map((insight) => (
            <CardInsight key={insight.id} insight={insight} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <AudioMantraLab mantra={HERO_MANTRA.short} affirmation={HERO_MANTRA.extended?.affirmation} />
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-6">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-aura-500">Track de respiración</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">Micro prácticas dirigidas</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Activa un set de respiraciones guiadas con vibración háptica y registra cómo cambia tu ánimo en 3 minutos.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-200">
            <li>• Balancea hemisferios con las manos en las costillas.</li>
            <li>• Guarda tu registro y sincroniza con la app móvil.</li>
            <li>• Exporta el audio generado para tu comunidad.</li>
          </ul>
          <Link
            href="/diario"
            className="mt-5 inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-aura-400 hover:text-aura-500 dark:border-slate-700 dark:text-slate-100"
          >
            Ver próximos lanzamientos
          </Link>
        </div>
      </section>

      <GenerativeStudio />
    </div>
  );
}
