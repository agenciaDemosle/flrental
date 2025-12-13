/**
 * FL Rental - Header Component
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, MENU_ITEMS, COUNTRIES } from '@/app/constants';
import SearchModal from '@/components/modals/SearchModal';
import LoginModal from '@/components/modals/LoginModal';
import { getCategories, type WooCategory } from '@/services/woocommerce';
import { getCategoryIcon } from '@/components/icons/CategoryIcons';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [categories, setCategories] = useState<WooCategory[]>([]);

  const currentCountry = COUNTRIES[0]; // Chile por defecto

  // Cargar categorías para el mega menu
  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await getCategories();
        // Filtrar categorías padre y excluir "Uncategorized" y variantes
        const excludedSlugs = ['uncategorized', 'sin-categorizar', 'sin-categoria'];
        const parentCats = cats.filter(
          (cat) => cat.parent === 0 && !excludedSlugs.includes(cat.slug.toLowerCase())
        );
        setCategories(parentCats);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    }
    loadCategories();
  }, []);

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
                  onMouseEnter={() => (item.hasDropdown || item.isMegaMenu) && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-text hover:text-primary transition-colors font-medium"
                  >
                    {item.label}
                    {(item.hasDropdown || item.isMegaMenu) && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Mega Menu - Productos */}
                  {item.isMegaMenu && activeDropdown === item.label && categories.length > 0 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white shadow-2xl rounded-lg py-6 px-8 z-[100] border border-gray-100">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-text mb-1">Categorías de Productos</h3>
                        <p className="text-sm text-muted">Explora nuestra flota de equipos especializados</p>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            to={`${ROUTES.PRODUCTOS}?categoria=${category.slug}`}
                            className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-primary/5 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="w-12 h-12 flex items-center justify-center text-primary group-hover:text-primary-hover transition-colors">
                              {getCategoryIcon(category.slug, { className: 'w-10 h-10' })}
                            </div>
                            <span className="text-xs text-center text-text group-hover:text-primary font-medium transition-colors">
                              {category.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <Link
                          to={ROUTES.PRODUCTOS}
                          className="flex items-center justify-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Ver todos los productos
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Dropdown normal */}
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
