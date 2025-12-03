/**
 * FL Rental - PDF Generator Service
 * Genera cotizaciones en formato PDF
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { QuoteItem, CustomerInfo } from '@/context/QuoteContext';

interface QuoteData {
  items: QuoteItem[];
  customerInfo: CustomerInfo;
  quoteNumber: string;
  date: string;
  validUntil: string;
  subtotal: number;
}

// Generar número de cotización único
export function generateQuoteNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `COT-${year}${month}${day}-${random}`;
}

// Formatear fecha
function formatDate(date: Date): string {
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// Generar PDF de cotización
export async function generateQuotePDF(data: QuoteData): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Colores de la marca
  const primaryColor: [number, number, number] = [0, 166, 81]; // #00A651
  const secondaryColor: [number, number, number] = [0, 51, 102]; // #003366
  const grayColor: [number, number, number] = [100, 100, 100];

  // === HEADER ===
  // Logo y nombre de empresa
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('FL', 15, 22);

  doc.setFontSize(24);
  doc.setFont('helvetica', 'normal');
  doc.text('Rental', 35, 22);

  // Título cotización
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('COTIZACIÓN', pageWidth - 15, 15, { align: 'right' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`N° ${data.quoteNumber}`, pageWidth - 15, 22, { align: 'right' });
  doc.text(`Fecha: ${data.date}`, pageWidth - 15, 28, { align: 'right' });

  // === INFORMACIÓN DE LA EMPRESA ===
  let yPos = 45;
  doc.setTextColor(...grayColor);
  doc.setFontSize(9);
  doc.text('FL Rental Chile', 15, yPos);
  doc.text('Panamericana Norte 15800, Lampa', 15, yPos + 5);
  doc.text('Santiago, Chile', 15, yPos + 10);
  doc.text('Tel: +56 2 2585 9000', 15, yPos + 15);
  doc.text('Email: contacto@flrental.cl', 15, yPos + 20);

  // === INFORMACIÓN DEL CLIENTE ===
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(pageWidth / 2 + 5, yPos - 5, pageWidth / 2 - 20, 35, 2, 2, 'F');

  doc.setTextColor(...secondaryColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('DATOS DEL CLIENTE', pageWidth / 2 + 10, yPos + 2);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayColor);
  doc.setFontSize(9);
  doc.text(`${data.customerInfo.nombre}`, pageWidth / 2 + 10, yPos + 10);
  if (data.customerInfo.empresa) {
    doc.text(`Empresa: ${data.customerInfo.empresa}`, pageWidth / 2 + 10, yPos + 15);
  }
  if (data.customerInfo.rut) {
    doc.text(`RUT: ${data.customerInfo.rut}`, pageWidth / 2 + 10, yPos + 20);
  }
  doc.text(`Email: ${data.customerInfo.email}`, pageWidth / 2 + 10, yPos + 25);

  // === TABLA DE PRODUCTOS ===
  yPos = 90;

  const tableData = data.items.map((item, index) => {
    const unitPrice = parseFloat(item.price) || 0;
    const totalPrice = unitPrice * item.quantity * item.days;
    return [
      index + 1,
      item.name,
      item.category,
      item.quantity,
      item.days,
      unitPrice > 0 ? `$${unitPrice.toLocaleString('es-CL')}` : 'A convenir',
      totalPrice > 0 ? `$${totalPrice.toLocaleString('es-CL')}` : 'A convenir',
    ];
  });

  autoTable(doc, {
    startY: yPos,
    head: [['#', 'Equipo', 'Categoría', 'Cant.', 'Días', 'Precio/día', 'Subtotal']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: secondaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [60, 60, 60],
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 50 },
      2: { cellWidth: 35 },
      3: { cellWidth: 15, halign: 'center' },
      4: { cellWidth: 15, halign: 'center' },
      5: { cellWidth: 25, halign: 'right' },
      6: { cellWidth: 30, halign: 'right' },
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250],
    },
    margin: { left: 15, right: 15 },
  });

  // Obtener posición Y después de la tabla
  const finalY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;

  // === TOTALES ===
  const totalsStartY = finalY + 10;

  // Caja de totales
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(pageWidth - 85, totalsStartY, 70, 25, 2, 2, 'F');

  doc.setFontSize(9);
  doc.setTextColor(...grayColor);
  doc.text('Subtotal estimado:', pageWidth - 80, totalsStartY + 8);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text(
    data.subtotal > 0 ? `$${data.subtotal.toLocaleString('es-CL')}` : 'A convenir',
    pageWidth - 20,
    totalsStartY + 18,
    { align: 'right' }
  );

  // === NOTAS Y CONDICIONES ===
  const notesY = totalsStartY + 35;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...secondaryColor);
  doc.text('CONDICIONES DE LA COTIZACIÓN', 15, notesY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...grayColor);

  const conditions = [
    `• Esta cotización es válida hasta el ${data.validUntil}`,
    '• Los precios son referenciales y están sujetos a disponibilidad',
    '• El precio final será confirmado por nuestro equipo comercial',
    '• No incluye IVA ni transporte',
    '• El arriendo mínimo es de 1 día',
    '• Se requiere contrato de arriendo firmado',
    '• Disponibilidad sujeta a confirmación',
  ];

  conditions.forEach((condition, index) => {
    doc.text(condition, 15, notesY + 8 + (index * 5));
  });

  // === MENSAJE DEL CLIENTE ===
  if (data.customerInfo.mensaje) {
    const messageY = notesY + 45;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...secondaryColor);
    doc.text('OBSERVACIONES DEL CLIENTE', 15, messageY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...grayColor);

    // Dividir mensaje en líneas si es muy largo
    const splitMessage = doc.splitTextToSize(data.customerInfo.mensaje, pageWidth - 30);
    doc.text(splitMessage, 15, messageY + 6);
  }

  // === FOOTER ===
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFillColor(...secondaryColor);
  doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('www.flrental.cl | contacto@flrental.cl | +56 2 2585 9000', pageWidth / 2, pageHeight - 12, { align: 'center' });
  doc.text('Arriendo de Maquinaria Pesada en Chile', pageWidth / 2, pageHeight - 6, { align: 'center' });

  // Guardar PDF
  doc.save(`Cotizacion_FLRental_${data.quoteNumber}.pdf`);
}

// Función principal para generar cotización
export function createQuote(items: QuoteItem[], customerInfo: CustomerInfo, subtotal: number): void {
  const quoteNumber = generateQuoteNumber();
  const today = new Date();
  const validUntil = new Date(today);
  validUntil.setDate(validUntil.getDate() + 15); // Válido por 15 días

  const quoteData: QuoteData = {
    items,
    customerInfo,
    quoteNumber,
    date: formatDate(today),
    validUntil: formatDate(validUntil),
    subtotal,
  };

  generateQuotePDF(quoteData);
}
