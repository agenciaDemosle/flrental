/**
 * Flrental - 404 Page
 */

import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/constants';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-muted mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          to={ROUTES.HOME}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
