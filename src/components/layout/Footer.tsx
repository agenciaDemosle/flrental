/**
 * FL Rental - Footer Component
 */

import { Link } from 'react-router-dom';
import { ROUTES, CONTACT, BRANCHES, COMPANY } from '@/app/constants';

const FOOTER_LINKS = {
  arriendo: [
    { label: 'Maquinaria Pesada', href: '/arriendo/maquinaria-pesada' },
    { label: 'Equipos de Construcción', href: '/arriendo/equipos-construccion' },
    { label: 'Transporte', href: '/arriendo/transporte' },
    { label: 'Generadores', href: '/arriendo/generadores' },
  ],
  renting: [
    { label: 'Renting Permanente', href: '/renting/permanente' },
    { label: 'Renting Operacional', href: '/renting/operacional' },
    { label: 'Beneficios', href: '/renting/beneficios' },
    { label: 'Cotizar Renting', href: '/cotizador?tipo=renting' },
  ],
  empresa: [
    { label: 'Somos FLR', href: ROUTES.SOMOS_FLR },
    { label: 'Sucursales', href: ROUTES.SUCURSALES },
    { label: 'Trabaja con nosotros', href: '/trabaja-con-nosotros' },
    { label: 'Blog', href: ROUTES.BLOG },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <Link to={ROUTES.HOME} className="inline-block mb-4">
              <img
                src="/images/logo-fl-rental-white.svg"
                alt="FL Rental"
                className="h-10 w-auto"
              />
            </Link>

            {/* Información de la empresa */}
            <div className="mb-4 text-white/90">
              <p className="font-semibold text-base">{COMPANY.legalName}</p>
              <p className="text-sm text-white/70">RUT: {COMPANY.rut}</p>
            </div>

            <p className="text-white/70 text-sm mb-6 max-w-sm">
              Empresa chilena especializada en el arriendo de maquinarias, equipos y soluciones
              de apoyo operacional para la industria minera y energética.
            </p>

            {/* Redes sociales */}
            {CONTACT.social.linkedin && (
              <div className="flex gap-4">
                <a
                  href={CONTACT.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-primary rounded-full transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Enlaces Arriendo */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Arriendo</h4>
            <nav className="flex flex-col gap-2">
              {FOOTER_LINKS.arriendo.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-white/70 hover:text-primary text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Enlaces Renting */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Renting</h4>
            <nav className="flex flex-col gap-2">
              {FOOTER_LINKS.renting.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-white/70 hover:text-primary text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Enlaces Empresa */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Empresa</h4>
            <nav className="flex flex-col gap-2">
              {FOOTER_LINKS.empresa.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-white/70 hover:text-primary text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Contacto */}
            <div className="mt-6">
              <h4 className="font-semibold text-lg mb-3">Contacto</h4>
              <div className="space-y-2">
                <a
                  href={`tel:${CONTACT.phone.main}`}
                  className="text-white/70 hover:text-primary text-sm transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {CONTACT.phone.main}
                </a>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-primary text-sm transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`mailto:${CONTACT.email.contacto}`}
                  className="text-white/70 hover:text-primary text-sm transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {CONTACT.email.contacto}
                </a>
                <p className="text-white/60 text-xs mt-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {CONTACT.horario}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Dirección */}
            <p className="text-white/60 text-sm">
              {CONTACT.address.toLowerCase()}
            </p>

            {/* Sucursales */}
            <p className="text-white/60 text-xs">
              {BRANCHES.map((b) => b.toLowerCase()).join(' - ')}
            </p>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 pt-4 border-t border-white/10">
            <div className="text-white/50 text-xs">
              <p>&copy; {new Date().getFullYear()} {COMPANY.legalName} - {COMPANY.tradeName}</p>
              <p className="mt-1">RUT: {COMPANY.rut} | Todos los derechos reservados.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/politica-privacidad" className="text-white/50 hover:text-white text-xs transition-colors">
                Política de privacidad
              </Link>
              <Link to="/terminos-condiciones" className="text-white/50 hover:text-white text-xs transition-colors">
                Términos y condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
