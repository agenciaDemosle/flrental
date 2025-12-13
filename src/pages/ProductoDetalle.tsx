/**
 * FL Rental - Página de Detalle de Producto
 */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUTES, API_CONFIG } from '@/app/constants';
import axios from 'axios';

interface ProductImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

interface ProductBrand {
  id: number;
  name: string;
  slug: string;
}

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

interface ProductDownload {
  id: string;
  name: string;
  file: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  sku: string;
  images: ProductImage[];
  brands: ProductBrand[];
  categories: ProductCategory[];
  downloads: ProductDownload[];
  meta_data: Array<{
    id: number;
    key: string;
    value: string;
  }>;
}

export default function ProductoDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_CONFIG.baseURL}/wp-json/wc/v3/products`,
          {
            params: {
              slug,
              consumer_key: API_CONFIG.consumerKey,
              consumer_secret: API_CONFIG.consumerSecret,
            },
          }
        );

        if (response.data && response.data.length > 0) {
          setProduct(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-primary text-lg">Cargando producto...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text mb-4">Producto no encontrado</h1>
          <Link to={ROUTES.PRODUCTOS} className="text-primary hover:underline">
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  // Obtener metadata relevante
  const getMetaValue = (key: string) => {
    const meta = product.meta_data.find((m) => m.key === key);
    return meta?.value || '';
  };

  const specs = {
    tipo_equipo: getMetaValue('tipo_equipo'),
    marca: product.brands?.[0]?.name || getMetaValue('marca'),
    modelo: getMetaValue('modelo'),
    potencia: getMetaValue('potencia'),
    peso_operacional: getMetaValue('peso_operacional'),
    capacidad: getMetaValue('capacidad'),
    capacidad_max: getMetaValue('capacidad_max'),
    profundidad_max: getMetaValue('profundidad_max'),
    cabina: getMetaValue('cabina'),
    traccion: getMetaValue('traccion'),
    transmision: getMetaValue('transmision'),
    ejes: getMetaValue('ejes'),
    largo_util: getMetaValue('largo_util'),
    origen: getMetaValue('origen'),
    notas: getMetaValue('notas'),
  };

  return (
    <div className="min-h-screen bg-bg py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 text-muted">
          <Link to={ROUTES.HOME} className="hover:text-primary">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link to={ROUTES.PRODUCTOS} className="hover:text-primary">
            Productos
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galería de imágenes */}
          <div>
            {/* Imagen principal */}
            <div className="bg-white rounded-lg overflow-hidden mb-4 border border-border">
              <img
                src={
                  product.images[selectedImage]?.src ||
                  '/images/placeholder-product.jpg'
                }
                alt={product.images[selectedImage]?.alt || product.name}
                className="w-full h-auto object-contain max-h-[500px]"
              />
            </div>

            {/* Miniaturas */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div>
            {/* Categoría y marca */}
            <div className="flex flex-wrap gap-2 mb-3">
              {product.categories
                .filter((cat) => cat.slug !== 'sin-categorizar')
                .map((category) => (
                  <span
                    key={category.id}
                    className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {category.name}
                  </span>
                ))}
              {product.brands.map((brand) => (
                <span
                  key={brand.id}
                  className="inline-block bg-secondary/10 text-secondary text-xs font-medium px-3 py-1 rounded-full"
                >
                  {brand.name}
                </span>
              ))}
            </div>

            {/* Título */}
            <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
              {product.name}
            </h1>

            {/* SKU */}
            {product.sku && (
              <p className="text-muted text-sm mb-4">SKU: {product.sku}</p>
            )}

            {/* Descripción corta */}
            {product.short_description && (
              <div
                className="text-muted mb-6"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {/* Ficha Técnica - Solo si hay downloads */}
            {product.downloads && product.downloads.length > 0 && (
              <div className="bg-gradient-to-r from-primary to-primary-hover rounded-lg p-6 mb-6">
                <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Ficha Técnica
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Descarga la ficha técnica completa con todas las especificaciones del equipo
                </p>
                <div className="space-y-2">
                  {product.downloads.map((download) => (
                    <a
                      key={download.id}
                      href={download.file}
                      download
                      className="flex items-center gap-3 bg-white hover:bg-white/90 text-primary font-medium px-4 py-3 rounded-lg transition-all group"
                    >
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="flex-1">{download.name}</span>
                      <svg
                        className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                to={ROUTES.COTIZADOR}
                className="flex-1 bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-lg text-center transition-colors"
              >
                Solicitar Cotización
              </Link>
              <Link
                to={ROUTES.CONTACTO}
                className="flex-1 bg-white hover:bg-gray-50 text-primary border-2 border-primary font-medium py-3 px-6 rounded-lg text-center transition-colors"
              >
                Contactar
              </Link>
            </div>

            {/* Especificaciones técnicas */}
            <div className="bg-white rounded-lg p-6 border border-border">
              <h2 className="text-xl font-semibold text-text mb-4">
                Especificaciones Técnicas
              </h2>
              <div className="space-y-3">
                {Object.entries(specs).map(([key, value]) => {
                  if (!value || value === 'N/A') return null;

                  const labels: Record<string, string> = {
                    tipo_equipo: 'Tipo de Equipo',
                    marca: 'Marca',
                    modelo: 'Modelo',
                    potencia: 'Potencia',
                    peso_operacional: 'Peso Operacional',
                    capacidad: 'Capacidad',
                    capacidad_max: 'Capacidad Máxima',
                    profundidad_max: 'Profundidad Máxima',
                    cabina: 'Cabina',
                    traccion: 'Tracción',
                    transmision: 'Transmisión',
                    ejes: 'Ejes',
                    largo_util: 'Largo Útil',
                    origen: 'Origen',
                    notas: 'Notas',
                  };

                  return (
                    <div
                      key={key}
                      className="flex py-2 border-b border-border last:border-0"
                    >
                      <span className="font-medium text-text w-1/3">
                        {labels[key] || key}:
                      </span>
                      <span className="text-muted w-2/3">{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Descripción completa */}
        {product.description && (
          <div className="mt-12 bg-white rounded-lg p-6 lg:p-8 border border-border">
            <h2 className="text-2xl font-semibold text-text mb-4">
              Descripción
            </h2>
            <div
              className="prose max-w-none text-muted"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
