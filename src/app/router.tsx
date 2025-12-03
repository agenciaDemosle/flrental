/**
 * FL Rental - React Router v7 Configuration
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTES } from './constants';

// Layout
import Layout from '@/components/layout/Layout';

// Lazy pages
const Home = lazy(() => import('@/pages/Home'));
const Productos = lazy(() => import('@/pages/Productos'));
const Tienda = lazy(() => import('@/pages/Tienda'));
const Cotizador = lazy(() => import('@/pages/Cotizador'));
const Nosotros = lazy(() => import('@/pages/Nosotros'));
const Contacto = lazy(() => import('@/pages/Contacto'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Fallback de carga
function PageLoader() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-primary text-lg">Cargando...</div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PRODUCTOS,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Productos />
          </Suspense>
        ),
      },
      {
        path: ROUTES.TIENDA,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Tienda />
          </Suspense>
        ),
      },
      {
        path: ROUTES.COTIZADOR,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Cotizador />
          </Suspense>
        ),
      },
      {
        path: ROUTES.NOSOTROS,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Nosotros />
          </Suspense>
        ),
      },
      {
        path: ROUTES.CONTACTO,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Contacto />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
