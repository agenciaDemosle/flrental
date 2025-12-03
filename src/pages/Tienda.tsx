/**
 * FL Rental - Tienda Page
 * Página de tienda con productos de WooCommerce
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories, type WooProduct, type WooCategory } from '@/services/woocommerce';
import { useQuote } from '@/context/QuoteContext';

// Componente de tarjeta de producto
function ProductCard({ product }: { product: WooProduct }) {
  const mainImage = product.images?.[0]?.src || '/images/placeholder-product.svg';
  const { addItem, state } = useQuote();
  const [isAdded, setIsAdded] = useState(false);

  // Verificar si ya está en el carrito
  const isInCart = state.items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      image: mainImage,
      price: product.regular_price || '0',
      category: product.categories?.[0]?.name || 'Sin categoría',
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder-product.svg';
          }}
        />
        {/* Badge destacado */}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
            Destacado
          </span>
        )}
        {/* Badge en oferta */}
        {product.on_sale && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Oferta
          </span>
        )}
        {/* Badge en carrito */}
        {isInCart && (
          <span className="absolute top-3 right-3 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            En cotización
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Categorías */}
        {product.categories?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.categories.slice(0, 2).map((cat) => (
              <span
                key={cat.id}
                className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Nombre */}
        <h3 className="font-semibold text-text group-hover:text-primary transition-colors line-clamp-2 mb-2">
          {product.name}
        </h3>

        {/* Descripción corta */}
        {product.short_description && (
          <p
            className="text-sm text-muted line-clamp-2 mb-3"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />
        )}

        {/* Precio y CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            {product.regular_price && (
              <span className="text-lg font-bold text-secondary">
                ${parseInt(product.regular_price).toLocaleString('es-CL')}
                <span className="text-xs font-normal text-muted">/día</span>
              </span>
            )}
            {!product.regular_price && (
              <span className="text-sm text-muted">Consultar precio</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              isAdded
                ? 'bg-green-500 text-white'
                : isInCart
                ? 'bg-secondary hover:bg-secondary/90 text-white'
                : 'bg-primary hover:bg-primary-hover text-white'
            }`}
          >
            {isAdded ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Agregado
              </>
            ) : isInCart ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar más
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Cotizar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente de filtro de categorías
function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: {
  categories: WooCategory[];
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === null
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-text hover:bg-gray-200'
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === cat.id
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-text hover:bg-gray-200'
          }`}
        >
          {cat.name}
          {cat.count > 0 && (
            <span className="ml-1 text-xs opacity-70">({cat.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}

// Skeleton loader
function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-5 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="h-9 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export default function Tienda() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [categories, setCategories] = useState<WooCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryParam = searchParams.get('categoria');
  const selectedCategory = categoryParam ? parseInt(categoryParam) : null;
  const searchQuery = searchParams.get('buscar') || '';

  // Cargar categorías al montar
  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await getCategories();
        // Filtrar solo categorías padre (no subcategorías) y excluir "Uncategorized"
        const parentCats = cats.filter(
          (cat) => cat.parent === 0 && cat.slug !== 'uncategorized'
        );
        setCategories(parentCats);
      } catch (err) {
        console.error('Error cargando categorías:', err);
      }
    }
    loadCategories();
  }, []);

  // Cargar productos cuando cambia la categoría o búsqueda
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError(null);
      try {
        const params: Record<string, string | number | boolean> = {};
        if (selectedCategory) {
          params.category = selectedCategory;
        }
        if (searchQuery) {
          params.search = searchQuery;
        }
        const prods = await getProducts(params);
        setProducts(prods);
      } catch (err) {
        console.error('Error cargando productos:', err);
        setError('Error al cargar los productos. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [selectedCategory, searchQuery]);

  // Cambiar categoría
  function handleCategoryChange(categoryId: number | null) {
    if (categoryId) {
      searchParams.set('categoria', categoryId.toString());
    } else {
      searchParams.delete('categoria');
    }
    setSearchParams(searchParams);
  }

  // Buscar
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('buscar') as string;
    if (query) {
      searchParams.set('buscar', query);
    } else {
      searchParams.delete('buscar');
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <div className="bg-secondary text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Catálogo de Maquinaria
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Explora nuestra amplia flota de equipos y maquinaria pesada disponible para arriendo.
            Contamos con las mejores marcas del mercado.
          </p>

          {/* Buscador */}
          <form onSubmit={handleSearch} className="mt-8 max-w-xl">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  name="buscar"
                  defaultValue={searchQuery}
                  placeholder="Buscar maquinaria..."
                  className="w-full px-4 py-3 pl-12 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50"
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
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Filtros */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-text mb-4">Categorías</h2>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>

        {/* Resultados info */}
        {searchQuery && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-muted">
              Resultados para: <strong className="text-text">"{searchQuery}"</strong>
            </span>
            <button
              onClick={() => {
                searchParams.delete('buscar');
                setSearchParams(searchParams);
              }}
              className="text-primary hover:text-primary-hover text-sm"
            >
              Limpiar
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Grid de productos */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-text mb-2">
              No se encontraron productos
            </h3>
            <p className="text-muted mb-4">
              Intenta con otra categoría o término de búsqueda.
            </p>
            <button
              onClick={() => {
                searchParams.delete('categoria');
                searchParams.delete('buscar');
                setSearchParams(searchParams);
              }}
              className="text-primary hover:text-primary-hover font-medium"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <>
            <p className="text-muted mb-6">
              {products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
