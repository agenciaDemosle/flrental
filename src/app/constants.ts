/**
 * FL Rental - Application Constants
 */

export const COLORS = {
  bg: '#FFFFFF',
  surface: '#F8FAFC',
  text: '#1A1A1A',
  muted: '#666666',
  primary: '#00A651',
  primaryHover: '#008C45',
  secondary: '#003366',
  card: '#FFFFFF',
  border: '#E5E5E5',
} as const;

// Base URLs
export const API_URL = import.meta.env.VITE_API_URL || '';
export const WC_CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY || '';
export const WC_CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET || '';
export const GA4_ID = import.meta.env.VITE_GA4_ID || '';

// Rutas
export const ROUTES = {
  HOME: '/',
  ARRIENDO: '/arriendo',
  RENTING: '/renting',
  SOMOS_FLR: '/somos-flr',
  SUCURSALES: '/sucursales',
  PRODUCTOS: '/productos',
  TIENDA: '/tienda',
  COTIZADOR: '/cotizador',
  NOSOTROS: '/nosotros',
  CONTACTO: '/contacto',
  BLOG: '/blog',
} as const;

// Menú principal
export const MENU_ITEMS = [
  {
    label: 'Arriendo',
    href: ROUTES.ARRIENDO,
    hasDropdown: true,
    submenu: [
      { label: 'Maquinaria Pesada', href: '/arriendo/maquinaria-pesada' },
      { label: 'Equipos de Construcción', href: '/arriendo/equipos-construccion' },
      { label: 'Transporte', href: '/arriendo/transporte' },
    ],
  },
  {
    label: 'Renting',
    href: ROUTES.RENTING,
    hasDropdown: true,
    submenu: [
      { label: 'Renting Permanente', href: '/renting/permanente' },
      { label: 'Renting Operacional', href: '/renting/operacional' },
    ],
  },
  {
    label: 'Somos FLR',
    href: ROUTES.SOMOS_FLR,
    hasDropdown: false,
  },
  {
    label: 'Sucursales',
    href: ROUTES.SUCURSALES,
    hasDropdown: false,
  },
] as const;

// Países/Portales
export const COUNTRIES = [
  { code: 'CL', name: 'Chile', flag: '🇨🇱', url: 'https://flrental.cl' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', url: 'https://flrental.co' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', url: 'https://flrental.bo' },
  { code: 'PE', name: 'Perú', flag: '🇵🇪', url: 'https://flrental.pe' },
] as const;

// Copys principales
export const COPYS = {
  HERO_TITLE: 'Arriendo de Maquinaria Pesada en Chile',
  HERO_SUBTITLE: 'Te presentamos soluciones para tus proyectos',
  CTA_PRIMARY: 'Cotizar ahora',
  CTA_SECONDARY: 'Contactar',
  SECTION_BLOG_TITLE: 'Nuestro Blog',
  SECTION_BLOG_SUBTITLE: 'Exploramos las innovaciones que están revolucionando a la industria.',
  SECTION_SOLUTIONS_TITLE: 'Soluciones que te podrían interesar',
  SECTION_SOLUTIONS_SUBTITLE: 'Soluciones en Arriendo y Venta de maquinaria pesada',
} as const;

// Sucursales / Cobertura
export const BRANCHES = [
  'Iquique',
  'Calama',
  'Antofagasta',
  'Copiapó',
  'La Serena',
  'Santiago',
  'Rancagua',
  'Talca',
  'Concepción',
  'Temuco',
  'Puerto Montt',
] as const;

// Contacto
export const CONTACT = {
  phone: {
    main: '+56 2 2585 9000',
  },
  email: {
    contacto: 'contacto@flrental.cl',
  },
  whatsapp: '+56922222222',
  address: 'Panamericana Norte 15800, Lampa. Santiago, Chile',
  social: {
    facebook: 'https://facebook.com/flrental',
    youtube: 'https://youtube.com/flrental',
    instagram: 'https://instagram.com/flrental',
    linkedin: 'https://linkedin.com/company/flrental',
  },
} as const;

// Soluciones externas
export const EXTERNAL_SOLUTIONS = [
  { name: 'BeMarket', image: '/images/solutions/bemarket.jpg', url: 'https://bemarket.cl' },
  { name: 'FL Capacitación', image: '/images/solutions/fl-capacitacion.jpg', url: 'https://flcapacitacion.cl' },
  { name: 'MOC', image: '/images/solutions/moc.jpg', url: 'https://moc.cl' },
  { name: 'Beparts', image: '/images/solutions/beparts.jpg', url: 'https://beparts.cl' },
  { name: 'Servicio Técnico FLC', image: '/images/solutions/flc.jpg', url: 'https://flc.cl' },
] as const;
