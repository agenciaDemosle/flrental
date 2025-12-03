/**
 * FL Rental - Cotizador Page
 * Página completa del cotizador con carrito y generación de PDF
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuote } from '@/context/QuoteContext';
import { createQuote } from '@/services/pdfGenerator';

// Regiones de Chile
const REGIONES = [
  'Arica y Parinacota',
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  'Metropolitana',
  'O\'Higgins',
  'Maule',
  'Ñuble',
  'Biobío',
  'La Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén',
  'Magallanes',
];

export default function Cotizador() {
  const { state, removeItem, updateQuantity, updateDays, setCustomerInfo, clearCart, subtotal } = useQuote();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validar formulario
  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!state.customerInfo.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    if (!state.customerInfo.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.customerInfo.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!state.customerInfo.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }
    if (state.items.length === 0) {
      newErrors.items = 'Agrega al menos un equipo a tu cotización';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Manejar envío del formulario
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Generar PDF
      createQuote(state.items, state.customerInfo, subtotal);

      // Aquí podrías enviar la cotización al backend también
      // await sendQuoteToBackend(state.items, state.customerInfo);

      setSubmitSuccess(true);

      // Limpiar carrito después de 3 segundos
      setTimeout(() => {
        clearCart();
      }, 3000);
    } catch (error) {
      console.error('Error generando cotización:', error);
      setErrors({ submit: 'Error al generar la cotización. Intenta nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Descargar solo PDF sin enviar
  function handleDownloadPDF() {
    if (!validateForm()) return;
    createQuote(state.items, state.customerInfo, subtotal);
  }

  if (submitSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text mb-4">¡Cotización Generada!</h1>
          <p className="text-muted mb-6">
            Tu cotización se ha descargado automáticamente. Nuestro equipo comercial se pondrá en contacto contigo pronto.
          </p>
          <div className="space-y-3">
            <Link
              to="/tienda"
              className="block w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-lg transition-colors"
            >
              Seguir explorando equipos
            </Link>
            <Link
              to="/"
              className="block w-full border border-gray-200 hover:bg-gray-50 text-text font-medium py-3 rounded-lg transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">
            Solicitar Cotización
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            Completa tus datos y genera tu cotización en PDF al instante.
            Nuestro equipo comercial te contactará para confirmar disponibilidad y precios.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda: Equipos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Equipos en tu cotización
                {state.items.length > 0 && (
                  <span className="bg-primary text-white text-sm font-bold px-2 py-0.5 rounded-full ml-auto">
                    {state.items.length}
                  </span>
                )}
              </h2>

              {errors.items && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {errors.items}
                </div>
              )}

              {state.items.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <h3 className="text-lg font-medium text-text mb-2">Tu cotización está vacía</h3>
                  <p className="text-muted text-sm mb-4">
                    Agrega equipos desde nuestro catálogo para comenzar.
                  </p>
                  <Link
                    to="/tienda"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium px-6 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Agregar equipos
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-surface rounded-xl border border-gray-100"
                    >
                      {/* Image */}
                      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={item.image || '/images/placeholder-product.svg'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/placeholder-product.svg';
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-text mb-1">{item.name}</h4>
                        <p className="text-sm text-muted mb-3">{item.category}</p>

                        <div className="flex flex-wrap items-center gap-4">
                          {/* Quantity */}
                          <div className="flex items-center gap-2">
                            <label className="text-sm text-muted">Cantidad:</label>
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                className="w-12 text-center border-x border-gray-200 py-1 text-sm"
                              />
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Days */}
                          <div className="flex items-center gap-2">
                            <label className="text-sm text-muted">Días:</label>
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                type="button"
                                onClick={() => updateDays(item.id, item.days - 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.days}
                                onChange={(e) => updateDays(item.id, parseInt(e.target.value) || 1)}
                                className="w-12 text-center border-x border-gray-200 py-1 text-sm"
                              />
                              <button
                                type="button"
                                onClick={() => updateDays(item.id, item.days + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        {item.price && parseFloat(item.price) > 0 && (
                          <p className="text-primary font-semibold mt-3">
                            ${(parseFloat(item.price) * item.quantity * item.days).toLocaleString('es-CL')}
                            <span className="text-xs text-muted font-normal ml-1">
                              (${parseInt(item.price).toLocaleString('es-CL')}/día × {item.quantity} × {item.days} días)
                            </span>
                          </p>
                        )}
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Eliminar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}

                  {/* Agregar más */}
                  <Link
                    to="/tienda"
                    className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-xl text-muted hover:text-primary hover:border-primary transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Agregar más equipos
                  </Link>

                  {/* Subtotal */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-lg text-muted">Subtotal estimado:</span>
                    <span className="text-2xl font-bold text-secondary">
                      {subtotal > 0 ? `$${subtotal.toLocaleString('es-CL')}` : 'A convenir'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha: Formulario */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Tus datos
              </h2>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                  {errors.submit}
                </div>
              )}

              <div className="space-y-4">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={state.customerInfo.nombre}
                    onChange={(e) => setCustomerInfo({ nombre: e.target.value })}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                      errors.nombre ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Juan Pérez"
                  />
                  {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={state.customerInfo.email}
                    onChange={(e) => setCustomerInfo({ email: e.target.value })}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                      errors.email ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="juan@empresa.cl"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={state.customerInfo.telefono}
                    onChange={(e) => setCustomerInfo({ telefono: e.target.value })}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                      errors.telefono ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="+56 9 1234 5678"
                  />
                  {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
                </div>

                {/* Empresa */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={state.customerInfo.empresa}
                    onChange={(e) => setCustomerInfo({ empresa: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Mi Empresa SpA"
                  />
                </div>

                {/* RUT */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    RUT Empresa
                  </label>
                  <input
                    type="text"
                    value={state.customerInfo.rut}
                    onChange={(e) => setCustomerInfo({ rut: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="12.345.678-9"
                  />
                </div>

                {/* Región */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Región
                  </label>
                  <select
                    value={state.customerInfo.region}
                    onChange={(e) => setCustomerInfo({ region: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  >
                    <option value="">Selecciona una región</option>
                    {REGIONES.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Mensaje / Observaciones
                  </label>
                  <textarea
                    value={state.customerInfo.mensaje}
                    onChange={(e) => setCustomerInfo({ mensaje: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                    placeholder="¿Necesitas algo especial? Cuéntanos..."
                  />
                </div>

                {/* Botones */}
                <div className="space-y-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || state.items.length === 0}
                    className="w-full bg-primary hover:bg-primary-hover disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Generando...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Generar Cotización PDF
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    disabled={state.items.length === 0}
                    className="w-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-text font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Solo descargar PDF
                  </button>
                </div>

                <p className="text-xs text-muted text-center">
                  Al enviar aceptas nuestros{' '}
                  <a href="#" className="text-primary hover:underline">términos y condiciones</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
