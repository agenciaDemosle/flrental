/**
 * Flrental - Zustand Store (Quote + Toast)
 */

import { create } from 'zustand';
import { QuoteState, QuoteLine, ServiceItem, QuoteClient, QuoteTotals } from './types';

/**
 * Toast Store
 */
interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  show: false,
  message: '',
  type: 'info',
  showToast: (message, type = 'info') => {
    set({ show: true, message, type });
    setTimeout(() => set({ show: false }), 3000);
  },
  hideToast: () => set({ show: false }),
}));

/**
 * Calcula el subtotal estimado de una línea
 */
function calculateLineSubtotal(line: Omit<QuoteLine, 'estSubtotal'>): number {
  const basePrice = line.item.basePrice || 0;
  return basePrice;
}

export const useQuoteStore = create<QuoteState>((set, get) => ({
  lines: [],
  client: undefined,

  addItem: (item: ServiceItem, qty = 1) => {
    const existing = get().lines.find((l) => l.item.id === item.id);
    if (existing) {
      set((state) => ({
        lines: state.lines.map((l) =>
          l.item.id === item.id
            ? { ...l, qty: l.qty + qty, estSubtotal: calculateLineSubtotal(l) * (l.qty + qty) }
            : l
        ),
      }));
    } else {
      const newLine: QuoteLine = {
        item,
        qty,
        estSubtotal: 0,
      };
      newLine.estSubtotal = calculateLineSubtotal(newLine) * qty;
      set((state) => ({ lines: [...state.lines, newLine] }));
    }
  },

  updateLine: (id: number, patch) => {
    set((state) => ({
      lines: state.lines.map((l) => {
        if (l.item.id === id) {
          const updated = { ...l, ...patch };
          updated.estSubtotal = calculateLineSubtotal(updated) * updated.qty;
          return updated;
        }
        return l;
      }),
    }));
  },

  removeLine: (id: number) => {
    set((state) => ({
      lines: state.lines.filter((l) => l.item.id !== id),
    }));
  },

  clear: () => {
    set({ lines: [], client: undefined });
  },

  setClient: (client: QuoteClient) => {
    set({ client });
  },

  totals: (): QuoteTotals => {
    const lines = get().lines;
    const items = lines.reduce((sum, l) => sum + l.qty, 0);
    const subtotal = lines.reduce((sum, l) => sum + l.estSubtotal, 0);
    const total = subtotal;

    return { items, subtotal, total };
  },
}));
