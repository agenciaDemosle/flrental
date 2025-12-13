/**
 * FL Rental - Products Section
 * Muestra productos destacados desde WooCommerce
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, type WooProduct } from '@/services/woocommerce';
import SectionTitle from '@/components/ui/SectionTitle';

// Skeleton loader para producto
function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-5">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="h-3 bg-gray-200 rounded w-full mb-2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const [allProducts, setAllProducts] = useState<WooProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<WooProduct[]>([]);
  const [categories, setCategories] = useState<Array<{ id: number; name: string; slug: string }>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(12);
  const [loading, setLoading] = useState(true);

  // Cargar productos y categorías
  useEffect(() => {
    async function loadData() {
      try {
        // Traer todos los productos
        const prods = await getProducts({ per_page: 100 });
        setAllProducts(prods);
        setFilteredProducts(prods);

        // Extraer categorías únicas (excluyendo "sin categorizar")
        const uniqueCategories = new Map<number, { id: number; name: string; slug: string }>();
        prods.forEach(product => {
          product.categories?.forEach(cat => {
            if (cat.slug !== 'sin-categorizar' && cat.slug !== 'uncategorized') {
              uniqueCategories.set(cat.id, cat);
            }
          });
        });

        setCategories([...uniqueCategories.values()].sort((a, b) => a.name.localeCompare(b.name)));
      } catch (err) {
        console.error('Error cargando productos:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtrar productos cuando cambian los filtros
  useEffect(() => {
    let filtered = [...allProducts];

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.categories?.some(cat => cat.slug === selectedCategory)
      );
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.categories?.some(cat => cat.name.toLowerCase().includes(query))
      );
    }

    setFilteredProducts(filtered);
    setDisplayCount(12); // Reset al cambiar filtros
  }, [selectedCategory, searchQuery, allProducts]);

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Título */}
        <SectionTitle
          primaryText="Nuestros"
          secondaryText="Equipos"
        />

        <p className="text-center text-muted max-w-2xl mx-auto mt-4 mb-8">
          Explora nuestra flota de equipos de última generación, listos para impulsar tu proyecto.
        </p>

        {/* Buscador */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar equipos por nombre o categoría..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todos ({allProducts.length})
          </button>
          {categories.map((category) => {
            const count = allProducts.filter(p =>
              p.categories?.some(c => c.id === category.id)
            ).length;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Resultados */}
        {filteredProducts.length > 0 && (
          <p className="text-center text-sm text-muted mb-6">
            Mostrando {displayedProducts.length} de {filteredProducts.length} equipos
          </p>
        )}

        {/* Grid de productos */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-text font-medium mb-2">No se encontraron equipos</p>
              <p className="text-muted text-sm mb-4">
                Intenta con otros términos de búsqueda o selecciona otra categoría
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-primary hover:underline text-sm font-medium"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/producto/${product.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Imagen del producto */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].src}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                  )}

                  {/* Badge de stock */}
                  {product.stock_status === 'instock' && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Disponible
                    </div>
                  )}
                  {product.stock_status === 'outofstock' && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      No disponible
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-5">
                  {/* Categoría */}
                  {product.categories && product.categories.length > 0 && (
                    <p className="text-xs text-primary font-semibold mb-2 uppercase">
                      {product.categories[0].name}
                    </p>
                  )}

                  {/* Nombre */}
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* SKU */}
                  {product.sku && (
                    <p className="text-xs text-muted mb-3">
                      SKU: {product.sku}
                    </p>
                  )}

                  {/* Descripción corta */}
                  {product.short_description && (
                    <div
                      className="text-sm text-muted line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: product.short_description }}
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Botón Ver Más */}
          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setDisplayCount(prev => prev + 12)}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-text font-medium px-8 py-3 rounded-lg transition-colors"
              >
                Ver más equipos
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </>
        )}
      </div>
    </section>
  );
}
