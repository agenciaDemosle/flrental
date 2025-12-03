/**
 * Flrental - Google Analytics 4 Integration
 */

import { GA4_ID } from './constants';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Inicializa GA4 si hay ID configurado
 */
export function initAnalytics() {
  if (!GA4_ID) {
    console.info('[Analytics] GA4_ID no configurado. Analytics deshabilitado.');
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA4_ID);

  console.info('[Analytics] GA4 inicializado:', GA4_ID);
}

/**
 * Dispara evento personalizado
 */
export function trackEvent(event: string, params?: Record<string, any>) {
  if (!GA4_ID || !window.gtag) return;

  window.gtag('event', event, params);
  console.debug('[Analytics] Event:', event, params);
}

export function trackViewItem(itemId: number, itemName: string) {
  trackEvent('view_item', {
    item_id: itemId,
    item_name: itemName,
  });
}

export function trackAddToQuote(itemId: number, itemName: string) {
  trackEvent('add_to_quote', {
    item_id: itemId,
    item_name: itemName,
  });
}

export function trackBeginQuote(value?: number) {
  trackEvent('begin_quote', {
    value,
  });
}

export function trackGenerateLead(params: {
  itemId?: number;
  itemName?: string;
  quoteValueEst?: number;
}) {
  trackEvent('generate_lead', {
    item_id: params.itemId,
    item_name: params.itemName,
    quote_value_est: params.quoteValueEst,
  });
}
