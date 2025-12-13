/**
 * FL Rental - FAQ Section
 * Preguntas Frecuentes
 */

import { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 1,
    question: '¿Cómo se confirma una reserva?',
    answer: 'La reserva se confirma con la aceptación de la cotización y envío de la Orden de Compra mediante formalidad de correo electrónico a contacto@flrental.cl.'
  },
  {
    id: 2,
    question: '¿Los precios incluyen combustible?',
    answer: 'No, el consumo de combustible, lubricantes y conductor son responsabilidad del arrendatario, salvo acuerdo expreso diferente establecido en el contrato.'
  },
  {
    id: 3,
    question: '¿Qué pasa si la máquina se descompone?',
    answer: 'Nuestro contrato define tiempos de respuesta y reemplazo. Contamos con servicio de mantención preventiva cada 400 horas y reparaciones correctivas incluidas para mantener el equipo en óptimas condiciones.'
  },
  {
    id: 4,
    question: '¿Incluyen operador?',
    answer: 'La provisión de operador puede ser solicitada por el cliente y debe ser estipulada por contrato. Contamos con personal calificado y con experiencia en faenas mineras disponible.'
  },
  {
    id: 5,
    question: '¿Cuál es la duración mínima del arriendo?',
    answer: 'Ofrecemos tarifas flexibles por día, semana o mes según tus necesidades. El período mínimo y condiciones específicas se definen en la cotización según el tipo de equipo.'
  },
  {
    id: 6,
    question: '¿Entregan los equipos en terreno?',
    answer: 'Sí, ofrecemos servicio de transporte y logística para entrega puntual en terreno. Este servicio puede ser incluido en la cotización según la ubicación y tipo de equipo.'
  },
  {
    id: 7,
    question: '¿Qué incluye el servicio de mantención?',
    answer: 'El arriendo incluye mantención preventiva cada 400 horas o 10,000 km, reparaciones correctivas del equipo y un reporte detallado de las mantenciones efectuadas durante el período de arriendo.'
  },
  {
    id: 8,
    question: '¿Qué sucede en caso de accidente o daño al equipo?',
    answer: 'Los equipos cuentan con seguro para daños propios y a terceros. En caso de siniestro, el arrendatario asume el deducible y el arriendo continúa durante el período de reparación. Es importante cumplir con las especificaciones técnicas del Manual de Operación.'
  }
];

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
      >
        <span className="font-semibold text-text pr-4">{faq.question}</span>
        <svg
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-muted leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Título */}
        <SectionTitle
          primaryText="Preguntas"
          secondaryText="Frecuentes"
        />

        <p className="text-center text-muted max-w-2xl mx-auto mt-4 mb-10">
          Resolvemos tus dudas sobre nuestros servicios de arriendo de maquinaria y equipos.
        </p>

        {/* Lista de preguntas */}
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-muted mb-4">¿No encontraste tu respuesta?</p>
          <a
            href="mailto:contacto@flrental.cl"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium px-8 py-3 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
}
