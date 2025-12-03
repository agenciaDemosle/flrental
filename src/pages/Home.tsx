/**
 * FL Rental - Home Page
 */

import HeroBanner from '@/components/sections/HeroBanner';
import ArriendoSection from '@/components/sections/ArriendoSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import BlogSection from '@/components/sections/BlogSection';
import SolutionsSection from '@/components/sections/SolutionsSection';
import NewsSection from '@/components/sections/NewsSection';

export default function Home() {
  return (
    <>
      {/* Hero Banner / Carrusel */}
      <HeroBanner />

      {/* Sección Arriendo de Maquinaria Pesada */}
      <ArriendoSection />

      {/* Sección Categorías de Productos */}
      <CategoriesSection />

      {/* Sección Nuestro Blog */}
      <BlogSection />

      {/* Sección Soluciones */}
      <SolutionsSection />

      {/* Sección Noticias / Posts Destacados */}
      <NewsSection />
    </>
  );
}
