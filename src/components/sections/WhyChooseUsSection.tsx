/**
 * FL Rental - Why Choose Us Section
 * Por qué elegirnos
 */

import SectionTitle from '@/components/ui/SectionTitle';

const REASONS = [
  {
    id: 1,
    title: 'Flota revisada y lista para faena',
    description: 'Todos nuestros equipos están en excelente estado, con mantención preventiva al día.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Respuesta rápida en cotizaciones',
    description: 'La minería no espera. Respondemos de inmediato para mantener tu operación en marcha.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Experiencia en proyectos mineros',
    description: 'Años de trabajo en terreno minero nos permiten entender tus necesidades reales.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Opciones con operador y traslado',
    description: 'Entregamos soluciones completas: equipo, operador calificado y logística incluida.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Transparencia total',
    description: 'Precios claros, sin cobros sorpresa. Sabemos que la confianza se construye con hechos.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Compromiso operacional',
    description: 'Acompañamos cada etapa del servicio para asegurar continuidad y soporte real.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-surface">
      <div className="container mx-auto px-4">
        {/* Título */}
        <SectionTitle
          primaryText="Por qué"
          secondaryText="Elegirnos"
        />

        <p className="text-center text-muted max-w-2xl mx-auto mt-4 mb-10">
          Somos más que un proveedor: somos tu aliado estratégico en cada proyecto.
        </p>

        {/* Grid de razones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {REASONS.map((reason) => (
            <div
              key={reason.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              {/* Icono */}
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                {reason.icon}
              </div>

              {/* Título */}
              <h3 className="font-bold text-lg text-text mb-2 group-hover:text-primary transition-colors">
                {reason.title}
              </h3>

              {/* Descripción */}
              <p className="text-sm text-muted leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
