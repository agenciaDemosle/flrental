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
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        // Traer los primeros 8 productos
        const prods = await getProducts({ per_page: 8 });
        setProducts(prods);
      } catch (err) {
        console.error('Error cargando productos:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Título */}
        <SectionTitle
          primaryText="Nuestros"
          secondaryText="Equipos"
        />

        <p className="text-center text-muted max-w-2xl mx-auto mt-4 mb-10">
          Explora nuestra flota de equipos de última generación, listos para impulsar tu proyecto.
        </p>

        {/* Grid de productos */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted">No hay productos disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
        )}

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            to="/tienda"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium px-8 py-3 rounded-lg transition-colors"
          >
            Ver todos los equipos
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
