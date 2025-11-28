"use client";

import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthShellProps {
  title: string;
  subtitle: string;
  footer: {
    label: string;
    link: { href: string; text: string };
  };
  children: ReactNode;
}

export function AuthShell({ title, subtitle, footer, children }: AuthShellProps) {
  return (
    <section className="mx-auto max-w-md space-y-6">
      <div className="rounded-3xl border border-white/60 bg-white/80 p-8 text-center shadow-lg shadow-aura-400/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
        <p className="text-xs uppercase tracking-[0.3em] text-aura-500">Ritual diario</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{subtitle}</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        {children}
      </div>
      <p className="text-center text-sm text-slate-600 dark:text-slate-300">
        {footer.label}{' '}
        <Link href={footer.link.href} className="font-semibold text-aura-500 hover:underline">
          {footer.link.text}
        </Link>
      </p>
    </section>
  );
}
