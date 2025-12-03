/**
 * Flrental - Contacto Page
 */

import { CONTACT } from '@/app/constants';

export default function Contacto() {
  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="text-4xl font-display font-bold mb-8">Contacto</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Información de Contacto</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Teléfono</h3>
                <a href={`tel:${CONTACT.phone.main}`} className="text-primary hover:underline">
                  {CONTACT.phone.main}
                </a>
              </div>

              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <a href={`mailto:${CONTACT.email.contacto}`} className="text-primary hover:underline">
                  {CONTACT.email.contacto}
                </a>
              </div>

              <div>
                <h3 className="font-medium mb-1">Dirección</h3>
                <p className="text-muted">{CONTACT.address}</p>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-2xl border border-border">
            <h2 className="text-2xl font-semibold mb-6">Envíanos un mensaje</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mensaje</label>
                <textarea
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  rows={4}
                  placeholder="Tu mensaje..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-medium transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
