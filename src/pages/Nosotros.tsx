/**
 * Flrental - Nosotros Page
 */

export default function Nosotros() {
  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="text-4xl font-display font-bold mb-8">Nosotros</h1>

        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-muted mb-6">
            En Flrental nos dedicamos a ofrecer soluciones de arriendo de alta calidad.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
          <p className="text-muted mb-8">
            Proporcionar servicios de arriendo confiables y accesibles para satisfacer las necesidades de nuestros clientes.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Nuestra Visión</h2>
          <p className="text-muted mb-8">
            Ser líderes en el mercado de arriendo, reconocidos por nuestra calidad y servicio al cliente.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Nuestros Valores</h2>
          <ul className="list-disc list-inside text-muted space-y-2">
            <li>Compromiso con la calidad</li>
            <li>Transparencia en nuestros servicios</li>
            <li>Atención personalizada</li>
            <li>Innovación constante</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
