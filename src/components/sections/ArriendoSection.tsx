/**
 * FL Rental - Arriendo de Maquinaria Pesada Section
 */

import { Link } from 'react-router-dom';
import { BRANCHES } from '@/app/constants';
import SectionTitle from '@/components/ui/SectionTitle';

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  color: string;
}

const SERVICES: ServiceCard[] = [
  {
    id: 1,
    title: 'Arriendo',
    description: 'Maquinaria pesada para tus proyectos de construcción y minería',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    link: '/tienda',
    color: 'bg-primary',
  },
  {
    id: 2,
    title: 'Renting',
    description: 'Equipos nuevos sin pagar pie, con mantención incluida',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    link: '/renting',
    color: 'bg-secondary',
  },
  {
    id: 3,
    title: 'Venta',
    description: 'Maquinaria seminueva y usada con garantía',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    link: '/venta',
    color: 'bg-amber-500',
  },
  {
    id: 4,
    title: 'Servicios',
    description: 'Mantención, repuestos y servicio técnico especializado',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    link: '/servicios',
    color: 'bg-slate-600',
  },
];

export default function ArriendoSection() {
  return (
    <section id="fl-home-arriendo" className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Título H1 con ribete */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 text-primary rounded-xl border border-primary/20">
            Arriendo de Maquinaria Pesada en Chile
          </span>
        </h1>

        {/* Subtítulo */}
        <div className="text-center mb-10">
          <SectionTitle
            primaryText="Te presentamos"
            secondaryText="Soluciones"
            primaryText2="Para"
            secondaryText2="Tus proyectos"
          />
        </div>

        {/* Grid de servicios con iconos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              to={service.link}
              className="group bg-surface rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/30"
            >
              {/* Icono con fondo de color */}
              <div className={`w-20 h-20 ${service.color} rounded-2xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              {/* Descripción */}
              <p className="text-muted text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Link con flecha */}
              <div className="flex items-center gap-2 text-primary font-medium text-sm">
                <span>Ver más</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
