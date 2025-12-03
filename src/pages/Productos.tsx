/**
 * Flrental - Productos Page
 */

export default function Productos() {
  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="text-4xl font-display font-bold mb-8">Productos</h1>
        <p className="text-muted mb-8">
          Explora nuestro catálogo de productos disponibles para arriendo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder cards */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-card p-6 rounded-2xl border border-border">
              <div className="bg-slate-200 h-48 rounded-lg mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Producto {i}</h3>
              <p className="text-muted text-sm mb-4">Descripción del producto.</p>
              <button className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded-lg transition-colors">
                Ver más
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
