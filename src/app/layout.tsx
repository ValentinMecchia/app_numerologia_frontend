import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from './providers';
import { AppHeader } from '@/components/AppHeader';
import { cn } from '@/lib/cn';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Perfil Espiritual',
  description: 'Rituales diarios de numerología, astrología y respiración consciente.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          'bg-sand-50 text-slate-800 antialiased selection:bg-aura-400/40 selection:text-white dark:bg-slate-950 dark:text-slate-100',
        )}
      >
        <Providers>
          <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.8),_transparent_50%)] dark:bg-[radial-gradient(circle_at_top,_rgba(24,24,27,0.8),_transparent_55%)]">
            <AppHeader />
            <main className="mx-auto max-w-5xl px-4 py-8 sm:py-10">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
