"use client";

import { useMemo, useState } from 'react';

interface AudioMantraLabProps {
  mantra: string;
  affirmation?: string;
}

const TONE_PRESETS = {
  calma: { label: 'Calma lunar', rate: 0.9, pitch: 1, description: 'Ritmo lento y sostenido para relajar el sistema nervioso.' },
  solar: { label: 'Pulsación solar', rate: 1.15, pitch: 1.1, description: 'Un tempo brillante para prácticas matutinas.' },
  onirico: { label: 'Eco onírico', rate: 0.85, pitch: 1.3, description: 'Matiz etéreo ideal para cerrar el día.' },
} as const;

function canUseSpeech(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function AudioMantraLab({ mantra, affirmation }: AudioMantraLabProps) {
  const [tone, setTone] = useState<keyof typeof TONE_PRESETS>('calma');
  const [status, setStatus] = useState<'idle' | 'playing' | 'unsupported'>('idle');
  const supported = useMemo(() => canUseSpeech(), []);

  const fullScript = useMemo(() => {
    const base = affirmation ? `${affirmation}. ${mantra}` : mantra;
    return `${base}. Cierra los ojos y siente la vibración en tu pecho.`;
  }, [affirmation, mantra]);

  const handlePlay = () => {
    if (!canUseSpeech()) {
      setStatus('unsupported');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(fullScript);
    const preset = TONE_PRESETS[tone];
    utterance.rate = preset.rate;
    utterance.pitch = preset.pitch;
    utterance.onend = () => setStatus('idle');
    utterance.onerror = () => setStatus('idle');
    setStatus('playing');
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    if (canUseSpeech()) {
      window.speechSynthesis.cancel();
      setStatus('idle');
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-white/90 to-aura-50/40 p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/80 dark:to-slate-900/40 sm:p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-aura-500">Laboratorio generativo</p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">Mantra meditacional en audio</h3>
        </div>
        <span className="rounded-full bg-aura-500/10 px-3 py-1 text-xs font-semibold text-aura-500">Beta</span>
      </header>

      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        Convierte tu mantra escrito en audio sintético y explora distintos timbres. Ideal para sesiones guiadas o para
        enviar a tu comunidad.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Tono</label>
          <div className="grid gap-3">
            {Object.entries(TONE_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTone(key as keyof typeof TONE_PRESETS)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  tone === key
                    ? 'border-aura-500 bg-aura-500/10 text-aura-600'
                    : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="block font-semibold">{preset.label}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{preset.description}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm dark:border-slate-800 dark:bg-slate-950/40">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Guion</p>
          <p className="leading-relaxed text-slate-700 dark:text-slate-100">{fullScript}</p>
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            <button
              type="button"
              onClick={handlePlay}
              disabled={!supported}
              className="rounded-full bg-gradient-to-r from-aura-400 to-aura-500 px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'playing' ? 'Reproduciendo…' : 'Generar audio'}
            </button>
            <button
              type="button"
              onClick={handleStop}
              className="rounded-full border border-slate-200 px-4 py-2 text-slate-600 dark:border-slate-700 dark:text-slate-200"
            >
              Detener
            </button>
          </div>
          {!supported && (
            <p className="text-xs text-amber-600 dark:text-amber-400">
              Tu navegador no permite síntesis de voz. Prueba en Chrome o Edge para activar el laboratorio.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
