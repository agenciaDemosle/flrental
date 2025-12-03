/**
 * FL Rental - Header Component
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, MENU_ITEMS, COUNTRIES } from '@/app/constants';
import SearchModal from '@/components/modals/SearchModal';
import LoginModal from '@/components/modals/LoginModal';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const currentCountry = COUNTRIES[0]; // Chile por defecto

  return (
    <>
      <header className="sticky top-0 z-[200] bg-white shadow-header">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Izquierda - Logo */}
            <Link to={ROUTES.HOME} className="flex-shrink-0">
              <img
                src="/images/logo-fl-rental.svg"
                alt="FL Rental"
                className="h-10 lg:h-12 w-auto"
              />
            </Link>

            {/* Centro - Menú Principal (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1">
              {MENU_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-text hover:text-primary transition-colors font-medium"
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.hasDropdown && item.submenu && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-md py-2 z-[100]">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.label}
                          to={subitem.href}
                          className="block px-4 py-2 text-sm text-text hover:bg-surface hover:text-primary transition-colors"
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Derecha - Acciones */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Botón hamburguesa (mobile) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-text hover:text-primary transition-colors"
                aria-label="Menú"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Botón búsqueda */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-text hover:text-primary transition-colors"
                aria-label="Buscar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Botón login */}
              <button
                onClick={() => setLoginModalOpen(true)}
                className="p-2 text-text hover:text-primary transition-colors"
                aria-label="Iniciar sesión"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* CTA Cotizador */}
              <Link
                to={ROUTES.COTIZADOR}
                className="hidden sm:flex bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-full font-medium transition-colors"
              >
                Cotizador
              </Link>

              {/* Selector de país */}
              <div className="relative">
                <button
                  onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-text hover:text-primary transition-colors"
                >
                  <span className="text-lg">{currentCountry.flag}</span>
                  <span className="hidden sm:inline">Portal {currentCountry.code}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {countryDropdownOpen && (
                  <div className="absolute top-full right-0 w-48 bg-white shadow-lg rounded-md py-2 z-[100]">
                    {COUNTRIES.map((country) => (
                      <a
                        key={country.code}
                        href={country.url}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-text hover:bg-surface hover:text-primary transition-colors"
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span>{country.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-border">
            <nav className="container mx-auto px-4 py-4">
              {MENU_ITEMS.map((item) => (
                <div key={item.label} className="border-b border-border last:border-0">
                  <Link
                    to={item.href}
                    className="block py-3 text-text hover:text-primary transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && item.submenu && (
                    <div className="pl-4 pb-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.label}
                          to={subitem.href}
                          className="block py-2 text-sm text-muted hover:text-primary transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to={ROUTES.COTIZADOR}
                className="block mt-4 bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-full font-medium text-center transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cotizador
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Modales */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}
