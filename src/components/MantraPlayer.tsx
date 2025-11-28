"use client";

import { useState } from 'react';
import { BreathAnimation } from './BreathAnimation';

interface MantraPlayerProps {
  mantra: {
    short: string;
    medium?: string;
    extended?: {
      affirmation: string;
      practice: { duration: number; steps: string[] };
    };
  };
}

export function MantraPlayer({ mantra }: MantraPlayerProps) {
  const [step, setStep] = useState(0);
  const steps = mantra.extended?.practice.steps ?? [];

  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-aura-400/15 to-aura-500/5 p-5 shadow-sm dark:border-slate-700 sm:p-6">
      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-aura-500 sm:text-xs">Mantra del día</p>
      <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">{mantra.short}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-200">{mantra.medium}</p>

      <div className="mt-6 grid gap-5 sm:gap-6 md:grid-cols-2">
        <BreathAnimation phase={step} />
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-200">Práctica guiada</p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700 dark:text-slate-100">
            {steps.map((instruction, index) => (
              <li key={instruction} className={index === step ? 'font-semibold text-aura-500' : undefined}>
                {index + 1}. {instruction}
              </li>
            ))}
          </ol>
          {steps.length > 0 && (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev + 1) % steps.length)}
              className="mt-4 rounded-full border border-aura-500 px-4 py-2 text-sm font-semibold text-aura-500"
            >
              Siguiente respiración
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
