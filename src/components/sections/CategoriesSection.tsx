/**
 * FL Rental - Categories Section
 * Muestra las categorías principales de productos desde WooCommerce
 */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, type WooCategory } from '@/services/woocommerce';
import SectionTitle from '@/components/ui/SectionTitle';
import { getCategoryIcon } from '@/components/icons/CategoryIcons';

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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Verificar scroll
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [categories]);

  // Funciones de navegación
  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

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

        {/* Carrusel de categorías */}
        <div className="relative">
          {/* Botón Anterior */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Contenedor del carrusel */}
          {loading ? (
            <div className="flex gap-4 md:gap-6 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-40 sm:w-48">
                  <CategorySkeleton />
                </div>
              ))}
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/tienda?categoria=${category.id}`}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center flex-shrink-0 w-40 sm:w-48"
                >
                  {/* Icono */}
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    {getCategoryIcon(category.slug)}
                  </div>

                  {/* Nombre */}
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors text-sm">
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

          {/* Botón Siguiente */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Siguiente"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

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
