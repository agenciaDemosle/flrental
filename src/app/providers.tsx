/**
 * FL Rental - App Providers
 */

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { QuoteProvider } from '@/context/QuoteContext';
import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <QuoteProvider>
        {children}
      </QuoteProvider>
    </QueryClientProvider>
  );
}
