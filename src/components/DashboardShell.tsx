import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface DashboardShellProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function DashboardShell({ title, description, actions, children, className }: DashboardShellProps) {
  return (
    <section className={cn('space-y-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70', className)}>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-aura-500">Dashboard</p>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</h1>
          {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{description}</p>}
        </div>
        {actions}
      </header>
      <div>{children}</div>
    </section>
  );
}
