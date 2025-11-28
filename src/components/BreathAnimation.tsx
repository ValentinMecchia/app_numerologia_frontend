"use client";

interface BreathAnimationProps {
  phase: number;
}

const PHASES = ['Inhala', 'Sostén', 'Exhala', 'Descansa'];

export function BreathAnimation({ phase }: BreathAnimationProps) {
  const label = PHASES[phase] ?? PHASES[0];

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white/80 p-6 text-center dark:bg-slate-900/40">
      <div className="grid h-32 w-32 place-items-center rounded-full border-2 border-aura-400 sm:h-40 sm:w-40">
        <span className="text-base font-semibold text-aura-600 sm:text-lg">{label}</span>
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-500">Respira</p>
    </div>
  );
}
