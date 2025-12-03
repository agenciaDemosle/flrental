/**
 * SK Rental - Hero Banner Component with Carousel
 */

import { useState, useEffect, useCallback } from 'react';

interface Slide {
  id: number;
  title: string;
  imageDesktop: string;
  imageMobile: string;
  link: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Máquinas al instante - Destacados del mes',
    imageDesktop: '/images/banners/banner-1-desktop.webp',
    imageMobile: '/images/banners/banner-1-mobile.webp',
    link: '/arriendo/destacados',
  },
  {
    id: 2,
    title: 'Renting Permanente - Opera con equipos nuevos',
    imageDesktop: '/images/banners/banner-2-desktop.webp',
    imageMobile: '/images/banners/banner-2-mobile.webp',
    link: '/renting',
  },
  {
    id: 3,
    title: 'Cobertura Nacional - En todas las regiones',
    imageDesktop: '/images/banners/banner-3-desktop.webp',
    imageMobile: '/images/banners/banner-3-mobile.webp',
    link: '/sucursales',
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="relative w-full overflow-hidden bg-surface">
      {/* Carousel Container */}
      <div className="relative h-[200px] sm:h-[280px] md:h-[330px] lg:h-[400px]">
        {SLIDES.map((slide, index) => (
          <a
            key={slide.id}
            href={slide.link}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <picture>
              <source media="(min-width: 768px)" srcSet={slide.imageDesktop} />
              <img
                src={slide.imageMobile}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </picture>
          </a>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md transition-all"
        aria-label="Slide anterior"
      >
        <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md transition-all"
        aria-label="Siguiente slide"
      >
        <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-primary w-8'
                : 'bg-white/80 hover:bg-white'
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
