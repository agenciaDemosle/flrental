/**
 * FL Rental - Home Page
 */

import HeroBanner from '@/components/sections/HeroBanner';
import ArriendoSection from '@/components/sections/ArriendoSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import FAQSection from '@/components/sections/FAQSection';
import SolutionsSection from '@/components/sections/SolutionsSection';

export default function Home() {
  return (
    <>
      {/* Hero Banner / Carrusel */}
      <HeroBanner />

      {/* Sección Arriendo de Maquinaria Pesada */}
      <ArriendoSection />

      {/* Sección Categorías de Productos */}
      <CategoriesSection />

      {/* Sección Productos Destacados */}
      <ProductsSection />

      {/* Sección Por Qué Elegirnos */}
      <WhyChooseUsSection />

      {/* Sección Preguntas Frecuentes */}
      <FAQSection />

      {/* Sección Soluciones */}
      <SolutionsSection />
    </>
  );
}
