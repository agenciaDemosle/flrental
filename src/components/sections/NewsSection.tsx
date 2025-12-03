/**
 * SK Rental - News/Featured Posts Section
 */

import { Link } from 'react-router-dom';
import SectionTitle from '@/components/ui/SectionTitle';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  link: string;
  category: string;
  date: string;
  featured?: boolean;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    title: 'FL Rental inaugura nueva sucursal en Antofagasta',
    excerpt: 'Con una inversión de US$ 5 millones, la nueva sucursal permitirá atender de mejor manera a los clientes del norte del país.',
    image: '/images/news/news-1.jpg',
    link: '/noticias/nueva-sucursal-antofagasta',
    category: 'Empresa',
    date: '20 Nov 2024',
    featured: true,
  },
  {
    id: 2,
    title: 'Nuevos equipos CAT llegan a nuestra flota',
    excerpt: 'Incorporamos 50 nuevas excavadoras y retroexcavadoras Caterpillar a nuestra flota de arriendo.',
    image: '/images/news/news-2.jpg',
    link: '/noticias/nuevos-equipos-cat',
    category: 'Flota',
    date: '18 Nov 2024',
  },
  {
    id: 3,
    title: 'Programa de capacitación para operadores',
    excerpt: 'Lanzamos nuestro nuevo programa de certificación para operadores de maquinaria pesada.',
    image: '/images/news/news-3.jpg',
    link: '/noticias/programa-capacitacion',
    category: 'Capacitación',
    date: '15 Nov 2024',
  },
];

export default function NewsSection() {
  const featuredNews = NEWS_ITEMS.find((item) => item.featured);
  const regularNews = NEWS_ITEMS.filter((item) => !item.featured);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-surface">
      <div className="container mx-auto px-4">
        {/* Título */}
        <SectionTitle
          primaryText="Posts"
          secondaryText="Destacados"
        />

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          {/* Featured News */}
          {featuredNews && (
            <Link
              to={featuredNews.link}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all col-span-1 lg:row-span-2"
            >
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
                <img
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="inline-block px-3 py-1 bg-primary text-xs font-medium rounded-full mb-3">
                  {featuredNews.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {featuredNews.title}
                </h3>
                <p className="text-white/80 line-clamp-2 mb-3">
                  {featuredNews.excerpt}
                </p>
                <span className="text-sm text-white/60">{featuredNews.date}</span>
              </div>
            </Link>
          )}

          {/* Regular News */}
          <div className="flex flex-col gap-6">
            {regularNews.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="group flex gap-4 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className="flex-shrink-0 w-32 sm:w-40 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 py-3 pr-4">
                  <span className="inline-block px-2 py-0.5 bg-surface text-xs font-medium text-primary rounded mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-base font-semibold text-text line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-2 mt-1 hidden sm:block">
                    {item.excerpt}
                  </p>
                  <span className="text-xs text-muted mt-2 block">{item.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            to="/noticias"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
          >
            Ver todas las noticias
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
