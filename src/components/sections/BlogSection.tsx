/**
 * SK Rental - Blog Section with Carousel
 */

import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { COPYS, ROUTES } from '@/app/constants';
import SectionTitle from '@/components/ui/SectionTitle';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  link: string;
  date: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'El despertar silencioso de la maquinaria pesada eléctrica',
    excerpt: 'Descubre cómo la tecnología eléctrica está transformando la industria de la construcción...',
    image: '/images/blog/post-1.jpg',
    link: '/blog/maquinaria-electrica',
    date: '15 Nov 2024',
  },
  {
    id: 2,
    title: 'Detenga la pérdida de dinero: el costo oculto del ralentí',
    excerpt: 'Aprenda cómo el tiempo de inactividad de las máquinas impacta sus finanzas...',
    image: '/images/blog/post-2.jpg',
    link: '/blog/costo-ralenti',
    date: '10 Nov 2024',
  },
  {
    id: 3,
    title: 'Innovaciones en seguridad para operadores de maquinaria',
    excerpt: 'Las últimas tecnologías que están haciendo más seguro el trabajo en terreno...',
    image: '/images/blog/post-3.jpg',
    link: '/blog/seguridad-operadores',
    date: '05 Nov 2024',
  },
  {
    id: 4,
    title: 'Tendencias de sostenibilidad en la construcción 2024',
    excerpt: 'Cómo la industria de la construcción está adoptando prácticas más verdes...',
    image: '/images/blog/post-4.jpg',
    link: '/blog/sostenibilidad-construccion',
    date: '01 Nov 2024',
  },
];

export default function BlogSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visiblePosts = 3;
  const maxIndex = Math.max(0, BLOG_POSTS.length - visiblePosts);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-surface">
      <div className="container mx-auto px-4">
        {/* Título */}
        <SectionTitle
          primaryText="Nuestro"
          secondaryText="Blog"
        />

        {/* Subtítulo */}
        <p className="text-center text-muted mt-4 mb-10 max-w-2xl mx-auto">
          {COPYS.SECTION_BLOG_SUBTITLE}
        </p>

        {/* Carousel */}
        <div className="relative">
          {/* Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white hover:bg-primary hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-text rounded-full shadow-md transition-all"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white hover:bg-primary hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-text rounded-full shadow-md transition-all"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Posts Grid */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * (100 / visiblePosts + 2)}%)` }}
            >
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.id}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <Link
                    to={post.link}
                    className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
                  >
                    {/* Image */}
                    <div className="aspect-[360/286] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <span className="text-xs text-muted">{post.date}</span>
                      <h3 className="text-lg font-semibold text-text mt-1 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            to={ROUTES.BLOG}
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
          >
            Ver más sobre NUESTRO BLOG
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
