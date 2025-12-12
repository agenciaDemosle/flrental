/**
 * FL Rental - Categories Section
 * Muestra las categorías principales de productos desde WooCommerce
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, type WooCategory } from '@/services/woocommerce';
import SectionTitle from '@/components/ui/SectionTitle';

// Iconos para las categorías
const CATEGORY_ICONS: Record<string, JSX.Element> = {
  'camion-tolva': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  ),
  'camion-aljibe': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  'camion-lubricador': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  'camion-pluma': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
    </svg>
  ),
  'tracto-pluma': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ),
  'camion-plano': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  'camion-tracto': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  'minibus': (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

// Icono por defecto
const DefaultIcon = (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

// Skeleton loader
function CategorySkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md animate-pulse">
      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
      <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
    </div>
  );
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState<WooCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await getCategories();
        // Filtrar categorías padre y excluir "Uncategorized" y variantes
        const excludedSlugs = ['uncategorized', 'sin-categorizar', 'sin-categoria'];
        const parentCats = cats.filter(
          (cat) => cat.parent === 0 && !excludedSlugs.includes(cat.slug.toLowerCase())
        );
        setCategories(parentCats);
      } catch (err) {
        console.error('Error cargando categorías:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-surface">
      <div className="container mx-auto px-4">
        {/* Título */}
        <SectionTitle
          primaryText="Nuestras"
          secondaryText="Categorías"
        />

        <p className="text-center text-muted max-w-2xl mx-auto mt-4 mb-10">
          Contamos con una amplia variedad de maquinaria y equipos para satisfacer
          las necesidades de tus proyectos de construcción, minería e industria.
        </p>

        {/* Grid de categorías */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {[...Array(12)].map((_, i) => (
              <CategorySkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/tienda?categoria=${category.id}`}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center"
              >
                {/* Icono */}
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {CATEGORY_ICONS[category.slug] || DefaultIcon}
                </div>

                {/* Nombre */}
                <h3 className="font-semibold text-text group-hover:text-primary transition-colors text-sm md:text-base">
                  {category.name}
                </h3>

                {/* Cantidad */}
                {category.count > 0 && (
                  <p className="text-xs text-muted mt-1">
                    {category.count} equipo{category.count !== 1 ? 's' : ''}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            to="/tienda"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium px-8 py-3 rounded-lg transition-colors"
          >
            Ver todo el catálogo
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
