/**
 * FL Rental - Quote Button Component
 * Botón flotante para abrir el carrito de cotización
 */

import { useQuote } from '@/context/QuoteContext';

export default function QuoteButton() {
  const { toggleCart, totalItems } = useQuote();

  return (
    <button
      onClick={() => toggleCart()}
      className="fixed bottom-24 right-6 z-30 bg-secondary hover:bg-secondary/90 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Ver cotización"
    >
      {/* Icon */}
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>

      {/* Badge */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce-in">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}

      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-text text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {totalItems > 0 ? `${totalItems} equipo${totalItems > 1 ? 's' : ''} en cotización` : 'Mi cotización'}
      </span>

      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.3s ease-out;
        }
      `}</style>
    </button>
  );
}
