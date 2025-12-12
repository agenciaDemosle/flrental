/**
 * FL Rental - Nosotros Page
 */

import { COMPANY } from '@/app/constants';

export default function Nosotros() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary via-secondary to-primary/20 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Sobre FL Rental
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              {COMPANY.legalName} - {COMPANY.tradeName}
            </p>
            <p className="text-white/80 mt-2">
              RUT: {COMPANY.rut}
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8 text-center">
              Nuestra Historia
            </h2>
            <div className="prose prose-lg max-w-none text-muted space-y-4">
              <p>
                En la industria minera, cada minuto es crítico. Las operaciones no se detienen, y cuando un equipo falla o la respuesta no llega a tiempo, los costos y riesgos aumentan. Fue justamente esa realidad —vivida directamente en terreno por los creadores de FL Rental— la que impulsó el nacimiento de nuestra empresa.
              </p>
              <p>
                Con años de experiencia trabajando dentro de compañías mineras y junto a empresas contratistas, identificaron un problema recurrente: falta de proveedores con rapidez de respuesta, equipos confiables y, sobre todo, transparencia total, sin cobros sorpresa ni desviaciones que afectaran la planificación.
              </p>
              <p className="font-semibold text-primary text-xl">
                FL Rental surge para elevar ese estándar.
              </p>
              <p>
                Nacimos con la misión de entregar un servicio de arriendo de maquinaria que combine agilidad, calidad operativa y comunicación clara, entendiendo exactamente lo que una faena necesita para mantener su continuidad.
              </p>
              <p>
                Hoy somos un aliado estratégico para la industria minera y para las empresas contratistas que requieren compromiso real, cumplimiento y un servicio que funciona al ritmo de la operación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Descripción / Especialidad */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8 text-center">
              ¿Quiénes Somos?
            </h2>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
              <p className="text-lg text-muted mb-6 leading-relaxed">
                FL Rental es una empresa chilena especializada en el arriendo de maquinarias, equipos y soluciones de apoyo operacional para la industria minera y energética.
              </p>
              <p className="text-muted mb-6 leading-relaxed">
                Nos enfocamos en entregar equipos de alta disponibilidad, servicio ágil y un acompañamiento cercano que asegure continuidad operacional, eficiencia y cumplimiento en cada proyecto.
              </p>

              <h3 className="text-2xl font-bold text-secondary mb-4 mt-8">Nuestra Especialidad</h3>
              <p className="text-muted mb-4">
                Comprender las necesidades reales de terreno y responder con soluciones concretas y confiables:
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-muted"><strong>Arriendo de maquinaria pesada:</strong> excavadoras, cargadores frontales, bulldozer, retroexcavadoras, camiones tolva, grúas y más.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-muted"><strong>Transporte y logística:</strong> camiones rampla, tractos, minibuses, buses y vehículos de apoyo.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-muted"><strong>Equipos complementarios</strong> para obras, operaciones mineras y construcción industrial.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-muted"><strong>Gestión integral del servicio,</strong> asegurando estándares de seguridad, mantención, documentación y disponibilidad exigidos por el rubro.</span>
                </li>
              </ul>

              <p className="text-lg text-secondary font-semibold">
                En FL Rental combinamos experiencia interna en minería, visión estratégica y un fuerte compromiso con la seguridad y el cumplimiento, convirtiéndonos en un aliado confiable para proyectos que requieren respuesta rápida, transparencia y equipos que realmente trabajan por ti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión, Visión, Valores */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Misión y Visión */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Misión */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">Misión</h3>
                <p className="text-muted leading-relaxed">
                  Impulsar la continuidad operacional de la industria minera y de construcción a través de soluciones de arriendo de maquinaria confiables, ágiles y totalmente transparentes, apoyando a nuestros clientes en cada etapa del proyecto.
                </p>
              </div>

              {/* Visión */}
              <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-8 border border-secondary/20">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">Visión</h3>
                <p className="text-muted leading-relaxed">
                  Ser la empresa de arriendo de maquinaria más confiable y valorada por la industria minera y sus contratistas, reconocida por su excelencia operativa, velocidad de respuesta, transparencia comercial y relaciones de largo plazo basadas en confianza y cumplimiento.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-secondary mb-8 text-center">Nuestros Valores</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Transparencia */}
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg text-text mb-2">Transparencia</h4>
                  <p className="text-sm text-muted">
                    Operamos con información clara, precios sin sorpresas y procesos totalmente trazables.
                  </p>
                </div>

                {/* Rapidez */}
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg text-text mb-2">Rapidez de respuesta</h4>
                  <p className="text-sm text-muted">
                    La minería no espera. Nuestro servicio tampoco.
                  </p>
                </div>

                {/* Confiabilidad */}
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg text-text mb-2">Confiabilidad</h4>
                  <p className="text-sm text-muted">
                    Equipos en excelente estado, mantenidos para entregar el máximo rendimiento desde el primer turno.
                  </p>
                </div>

                {/* Compromiso */}
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg text-text mb-2">Compromiso operacional</h4>
                  <p className="text-sm text-muted">
                    Acompañamos cada etapa del servicio, asegurando continuidad y soporte real.
                  </p>
                </div>

                {/* Cercanía */}
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg text-text mb-2">Cercanía y comunicación</h4>
                  <p className="text-sm text-muted">
                    Escuchamos, entendemos y respondemos. Sin burocracia y sin complicaciones.
                  </p>
                </div>

                {/* Seguridad */}
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg text-text mb-2">Seguridad</h4>
                  <p className="text-sm text-muted">
                    Cada equipo y cada proceso se ejecutan bajo los más altos estándares de seguridad para proteger a las personas y a la operación.
                  </p>
                </div>
              </div>
            </div>

            {/* Compromiso */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-10 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Nuestro Compromiso</h3>
              <p className="text-lg text-white/90 mb-4 max-w-3xl mx-auto">
                Entregar un servicio seguro, eficiente y transparente, donde la confianza y la satisfacción del cliente son prioridad, cumpliendo siempre con los estándares operativos y éticos más altos.
              </p>
              <p className="text-xl font-semibold">
                En FL Rental no solo arrendamos maquinaria: impulsamos proyectos, optimizamos procesos y respaldamos cada operación con seguridad, eficiencia y confianza.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
