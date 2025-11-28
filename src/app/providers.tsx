"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { useAuth } from '@/hooks/useAuth';

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  const { hydrate, hydrated } = useAuth();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
        {hydrated ? (
          children
        ) : (
          <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
            Cargando práctica...
          </div>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
