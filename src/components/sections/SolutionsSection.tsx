/**
 * SK Rental - Solutions Section with Carousel
 */

import { useState, useCallback } from 'react';
import { COPYS, EXTERNAL_SOLUTIONS } from '@/app/constants';
import SectionTitle from '@/components/ui/SectionTitle';

export default function SolutionsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 4;
  const maxIndex = Math.max(0, EXTERNAL_SOLUTIONS.length - visibleItems);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Título */}
        <SectionTitle
          primaryText="Soluciones que te"
          secondaryText="podrían interesar"
        />

        {/* Subtítulo */}
        <h2 className="text-center text-lg md:text-xl text-muted mt-4 mb-10">
          {COPYS.SECTION_SOLUTIONS_SUBTITLE}
        </h2>

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

          {/* Items Grid */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleItems + 2)}%)` }}
            >
              {EXTERNAL_SOLUTIONS.map((solution, index) => (
                <a
                  key={index}
                  href={solution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    {/* Image */}
                    <div className="aspect-[360/246] overflow-hidden bg-surface">
                      <img
                        src={solution.image}
                        alt={solution.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                              <span class="text-2xl font-bold text-primary">${solution.name}</span>
                            </div>
                          `;
                        }}
                      />
                    </div>

                    {/* Title */}
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                        {solution.name}
                      </h3>
                      <span className="text-xs text-muted flex items-center justify-center gap-1 mt-1">
                        Visitar sitio
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary w-6'
                    : 'bg-border hover:bg-muted'
                }`}
                aria-label={`Ir al grupo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
