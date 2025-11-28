"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/perfil', label: 'Mi perfil' },
  { href: '/diario', label: 'Rituales diarios' },
  { href: '/insights', label: 'Insights' },
];

export function AppHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-white/40 bg-sand-50/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:py-4">
        <Link href="/" className="text-base font-semibold tracking-tight text-slate-900 dark:text-white sm:text-lg">
          Perfil Espiritual
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-medium text-slate-500 md:flex dark:text-slate-300">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-full px-4 py-2 transition',
                pathname === link.href
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white'
                  : 'hover:text-aura-500',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-aura-500 dark:border-slate-700 dark:text-slate-200"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-gradient-to-r from-aura-400 to-aura-500 px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
