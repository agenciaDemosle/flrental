/**
 * FL Rental - WooCommerce API Service
 */

import { API_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET } from '@/app/constants';

const WC_API_BASE = `${API_URL}/wp-json/wc/v3`;

interface WooCommerceRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  params?: Record<string, string | number | boolean>;
}

/**
 * Hacer petición a la API de WooCommerce
 */
async function wooRequest<T>(endpoint: string, options: WooCommerceRequestOptions = {}): Promise<T> {
  const { method = 'GET', body, params = {} } = options;

  // Construir URL con parámetros
  const url = new URL(`${WC_API_BASE}${endpoint}`);

  // Agregar credenciales de autenticación
  url.searchParams.append('consumer_key', WC_CONSUMER_KEY);
  url.searchParams.append('consumer_secret', WC_CONSUMER_SECRET);

  // Agregar parámetros adicionales
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), fetchOptions);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(error.message || `Error ${response.status}`);
  }

  return response.json();
}

// Tipos
export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  featured: boolean;
  images: { id: number; src: string; alt: string }[];
  categories: { id: number; name: string; slug: string }[];
  attributes: { id: number; name: string; options: string[] }[];
  meta_data: { key: string; value: string }[];
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  image: { id: number; src: string; alt: string } | null;
  parent: number;
}

export interface CreateProductData {
  name: string;
  type?: 'simple' | 'variable' | 'grouped' | 'external';
  status?: 'draft' | 'pending' | 'private' | 'publish';
  featured?: boolean;
  description?: string;
  short_description?: string;
  sku?: string;
  regular_price?: string;
  sale_price?: string;
  categories?: { id: number }[];
  images?: { src: string; alt?: string }[];
  attributes?: { name: string; options: string[]; visible?: boolean }[];
  meta_data?: { key: string; value: string }[];
}

export interface CreateCategoryData {
  name: string;
  slug?: string;
  parent?: number;
  description?: string;
  image?: { src: string; alt?: string };
}

// API Functions

/**
 * Obtener todos los productos
 */
export async function getProducts(params: Record<string, string | number | boolean> = {}): Promise<WooProduct[]> {
  return wooRequest<WooProduct[]>('/products', { params: { per_page: 100, ...params } });
}

/**
 * Obtener un producto por ID
 */
export async function getProduct(id: number): Promise<WooProduct> {
  return wooRequest<WooProduct>(`/products/${id}`);
}

/**
 * Obtener productos por categoría
 */
export async function getProductsByCategory(categoryId: number): Promise<WooProduct[]> {
  return wooRequest<WooProduct[]>('/products', { params: { category: categoryId, per_page: 100 } });
}

/**
 * Obtener productos destacados
 */
export async function getFeaturedProducts(): Promise<WooProduct[]> {
  return wooRequest<WooProduct[]>('/products', { params: { featured: true, per_page: 20 } });
}

/**
 * Buscar productos
 */
export async function searchProducts(query: string): Promise<WooProduct[]> {
  return wooRequest<WooProduct[]>('/products', { params: { search: query, per_page: 20 } });
}

/**
 * Crear un producto
 */
export async function createProduct(data: CreateProductData): Promise<WooProduct> {
  return wooRequest<WooProduct>('/products', { method: 'POST', body: data });
}

/**
 * Actualizar un producto
 */
export async function updateProduct(id: number, data: Partial<CreateProductData>): Promise<WooProduct> {
  return wooRequest<WooProduct>(`/products/${id}`, { method: 'PUT', body: data });
}

/**
 * Eliminar un producto
 */
export async function deleteProduct(id: number): Promise<WooProduct> {
  return wooRequest<WooProduct>(`/products/${id}`, { method: 'DELETE', params: { force: true } });
}

/**
 * Obtener todas las categorías
 */
export async function getCategories(): Promise<WooCategory[]> {
  return wooRequest<WooCategory[]>('/products/categories', { params: { per_page: 100 } });
}

/**
 * Obtener una categoría por ID
 */
export async function getCategory(id: number): Promise<WooCategory> {
  return wooRequest<WooCategory>(`/products/categories/${id}`);
}

/**
 * Crear una categoría
 */
export async function createCategory(data: CreateCategoryData): Promise<WooCategory> {
  return wooRequest<WooCategory>('/products/categories', { method: 'POST', body: data });
}

/**
 * Crear múltiples productos en batch
 */
export async function batchCreateProducts(products: CreateProductData[]): Promise<{ create: WooProduct[] }> {
  return wooRequest<{ create: WooProduct[] }>('/products/batch', {
    method: 'POST',
    body: { create: products },
  });
}

/**
 * Crear múltiples categorías en batch
 */
export async function batchCreateCategories(categories: CreateCategoryData[]): Promise<{ create: WooCategory[] }> {
  return wooRequest<{ create: WooCategory[] }>('/products/categories/batch', {
    method: 'POST',
    body: { create: categories },
  });
}

export default {
  getProducts,
  getProduct,
  getProductsByCategory,
  getFeaturedProducts,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getCategory,
  createCategory,
  batchCreateProducts,
  batchCreateCategories,
};
