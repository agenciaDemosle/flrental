/**
 * Flrental - TypeScript Types
 */

// Tipos de WooCommerce (simplificados)
export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_modified: string;
  type: 'simple' | 'variable' | 'grouped';
  status: 'draft' | 'pending' | 'private' | 'publish';
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  images: WooImage[];
  categories: WooCategory[];
  tags: WooTag[];
  attributes: WooAttribute[];
  meta_data?: WooMetaData[];
  [key: string]: any;
}

export interface WooImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WooTag {
  id: number;
  name: string;
  slug: string;
}

export interface WooAttribute {
  id: number;
  name: string;
  options: string[];
}

export interface WooMetaData {
  id: number;
  key: string;
  value: any;
}

// Tipos internos de producto/servicio
export interface ServiceItem {
  id: number;
  name: string;
  slug: string;
  images: string[];
  shortDesc: string;
  basePrice?: number;
  categoryPath: string[];
  featured?: boolean;
  tags?: string[];
  options?: ServiceOptions;
}

export interface ServiceOptions {
  qty?: { min: number; max: number };
  variants?: ProductVariants;
}

export interface ProductVariants {
  sizes?: string[];
  colors?: string[];
  materials?: string[];
  customFields?: CustomField[];
}

export interface CustomField {
  id: string;
  label: string;
  type: 'select' | 'text' | 'number';
  options?: string[];
  required?: boolean;
}

// Cotizador (store Zustand)
export interface QuoteLine {
  item: ServiceItem;
  qty: number;
  selectedVariants?: SelectedVariants;
  estSubtotal: number;
}

export interface SelectedVariants {
  size?: string;
  color?: string;
  material?: string;
  customFields?: Record<string, string>;
}

export interface QuoteClient {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  city?: string;
  message?: string;
}

export interface QuoteTotals {
  items: number;
  subtotal: number;
  total: number;
}

export interface QuoteState {
  lines: QuoteLine[];
  client?: QuoteClient;
  addItem: (item: ServiceItem, qty?: number) => void;
  updateLine: (id: number, patch: Partial<Omit<QuoteLine, 'item' | 'estSubtotal'>>) => void;
  removeLine: (id: number) => void;
  clear: () => void;
  setClient: (c: QuoteClient) => void;
  totals: () => QuoteTotals;
}

// Payload para enviar cotización
export interface QuotePayload {
  lines: Array<{
    itemId: number;
    itemName: string;
    qty: number;
    estSubtotal: number;
  }>;
  client: QuoteClient;
  totals: QuoteTotals;
  source: 'web';
  timestamp: string;
}

// SEO
export interface SEOData {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string[];
}

// Analytics
export interface AnalyticsEvent {
  event: string;
  params?: Record<string, any>;
}
